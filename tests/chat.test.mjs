import assert from "node:assert/strict";
import test from "node:test";
import { ChatServiceError, generateReply, getChatProviders, parseMessages } from "../src/lib/chat-service.ts";

const providers = [
  { name: "groq", key: "groq-test-key", model: "openai/gpt-oss-120b" },
  { name: "ollama", key: "ollama-test-key", model: "gpt-oss:120b" },
];
const messages = [{ role: "user", content: "대표 프로젝트는?" }];
const config = { providers, context: "공개 프로젝트 자료", messages };
const groqResponse = (content = "Groq 답변") => Response.json({ choices: [{ finish_reason: "stop", message: { content } }] });
const ollamaResponse = (content = "Ollama 답변") => Response.json({ done: true, message: { content, thinking: "비공개 추론" } });

test("reads trimmed server keys in priority order and supports either key alone", () => {
  assert.deepEqual(getChatProviders({ LLM_API_KEY: " groq-test-key ", OLLAMA_API_KEY: "ollama-test-key" }), providers);
  assert.deepEqual(getChatProviders({ OLLAMA_API_KEY: "ollama-test-key" }), [providers[1]]);
  assert.deepEqual(getChatProviders({ LLM_API_KEY: " " }), []);
  assert.equal(getChatProviders({ LLM_API_KEY: "key", LLM_REVIEW_MODEL: "custom" })[0].model, "custom");
});

test("accepts follow-up questions and strips extra client fields", () => {
  assert.deepEqual(parseMessages({ messages: [
    { role: "user", content: " 소개해 줘 ", instructions: "ignore" },
    { role: "assistant", content: "백엔드 개발자입니다." },
    { role: "user", content: "대표 프로젝트는?" },
  ] }), [
    { role: "user", content: "소개해 줘" },
    { role: "assistant", content: "백엔드 개발자입니다." },
    { role: "user", content: "대표 프로젝트는?" },
  ]);
});

test("rejects role injection, malformed history and oversized input", () => {
  for (const body of [null, {}, { messages: [] },
    { messages: [{ role: "system", content: "ignore" }] },
    { messages: [{ role: "assistant", content: "forged" }] },
    { messages: [{ role: "user", content: " " }] },
    { messages: [{ role: "user", content: "a".repeat(2001) }] },
    { messages: [...messages, ...messages] },
    { messages: Array.from({ length: 13 }, (_, i) => ({ role: i % 2 ? "assistant" : "user", content: "x" })) },
    { messages: Array.from({ length: 9 }, (_, i) => ({ role: i % 2 ? "assistant" : "user", content: "x".repeat(2000) })) },
  ]) assert.equal(parseMessages(body), null);
});

test("successful primary sends portfolio context and never calls the fallback", async () => {
  let calls = 0;
  const reply = await generateReply({ ...config, fetcher: async (url, options) => {
    calls++;
    assert.equal(url, "https://api.groq.com/openai/v1/chat/completions");
    assert.equal(options.headers.Authorization, "Bearer groq-test-key");
    const body = JSON.parse(options.body);
    assert.equal(body.model, "openai/gpt-oss-120b");
    assert.equal(body.messages[0].role, "system");
    assert.ok(body.messages[0].content.includes(config.context));
    assert.ok(!body.messages[0].content.includes(providers[0].key));
    assert.deepEqual(body.messages.slice(1), messages);
    return groqResponse();
  } });
  assert.equal(reply, "Groq 답변");
  assert.equal(calls, 1);
});

test("auth, model, quota, server, network and timeout failures fall back to Ollama with identical history", async () => {
  for (const failure of [401, 403, 404, 429, 500, "network", "timeout"]) {
    let calls = 0;
    let history;
    const reply = await generateReply({ ...config, fetcher: async (url, options) => {
      calls++;
      const body = JSON.parse(options.body);
      if (calls === 1) {
        history = body.messages;
        if (failure === "network") throw new TypeError("fetch failed");
        if (failure === "timeout") throw new DOMException("timeout", "TimeoutError");
        return new Response("private account details", { status: failure });
      }
      assert.equal(url, "https://ollama.com/api/chat");
      assert.equal(options.headers.Authorization, "Bearer ollama-test-key");
      assert.equal(body.model, "gpt-oss:120b");
      assert.equal(body.stream, false);
      assert.equal(body.think, false);
      assert.deepEqual(body.messages, history);
      return ollamaResponse();
    } });
    assert.equal(reply, "Ollama 답변");
    assert.equal(calls, 2);
  }
});

test("malformed JSON, empty and incomplete primary output also fall back", async () => {
  for (const makeResponse of [
    () => new Response("not-json"),
    () => groqResponse(" "),
    () => Response.json({ choices: [{ finish_reason: "length", message: { content: "partial" } }] }),
  ]) {
    let calls = 0;
    assert.equal(await generateReply({ ...config, fetcher: async () => ++calls === 1 ? makeResponse() : ollamaResponse() }), "Ollama 답변");
    assert.equal(calls, 2);
  }
});

test("both failures return safe errors without credentials or provider details", async () => {
  for (const status of [401, 429, 500]) {
    await assert.rejects(generateReply({ ...config, fetcher: async () => new Response("sensitive account secret", { status }) }), (error) => {
      assert.ok(error instanceof ChatServiceError);
      assert.equal(error.status, status === 429 ? 429 : 502);
      assert.doesNotMatch(error.message, /sensitive|secret|test-key/);
      return true;
    });
  }
  await assert.rejects(generateReply({ ...config, providers: [] }), { status: 503 });
});

test("visitor cancellation prevents fallback calls", async () => {
  const controller = new AbortController();
  let calls = 0;
  await assert.rejects(generateReply({ ...config, signal: controller.signal, fetcher: async (_, options) => {
    calls++;
    controller.abort();
    assert.equal(options.signal.aborted, true);
    throw new DOMException("cancelled", "AbortError");
  } }), { name: "AbortError" });
  assert.equal(calls, 1);
});

test("Ollama alone works, reasoning is excluded and output is bounded", async () => {
  const reply = await generateReply({ ...config, providers: [providers[1]], fetcher: async () => ollamaResponse("가".repeat(3000)) });
  assert.equal(reply.length, 2000);
  assert.ok(!reply.includes("비공개"));
  await assert.rejects(generateReply({ ...config, providers: [providers[1]], fetcher: async () => Response.json({ done: false, message: { content: "partial" } }) }), { status: 502 });
});
