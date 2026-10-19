import { ChatServiceError, generateReply, getChatProviders, MAX_BODY_BYTES, parseMessages } from "@/lib/chat-service";
import { portfolioContext } from "@/lib/portfolio-context";

export const runtime = "nodejs";
export const maxDuration = 45;

// Best-effort per-instance protection; use a shared limiter at larger scale.
const requests = new Map<string, { count: number; reset: number }>();
function allowRequest(ip: string) {
  const now = Date.now();
  for (const [key, value] of requests) if (value.reset <= now) requests.delete(key);
  const entry = requests.get(ip) ?? { count: 0, reset: now + 60_000 };
  if (entry.count >= 10 || (!requests.has(ip) && requests.size >= 5000)) return false;
  entry.count++;
  requests.set(ip, entry);
  return true;
}

function json(body: object, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  // Next may normalize request.url to localhost even when the browser uses 127.0.0.1.
  const publicUrl = new URL(request.url);
  publicUrl.host = request.headers.get("host") ?? publicUrl.host;
  if (origin && origin !== publicUrl.origin) return json({ error: "허용되지 않은 요청입니다." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return json({ error: "JSON 요청이 필요합니다." }, 415);
  const providers = getChatProviders(process.env);
  if (!providers.length) return json({ error: "현재 AI 채팅을 준비 중입니다. 연락처로 문의해 주세요." }, 503);
  // Vercel overwrites this header. Do not trust arbitrary forwarded IPs.
  const ip = process.env.VERCEL ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() ?? "unknown" : "local";
  if (!allowRequest(ip)) return json({ error: "요청이 많습니다. 1분 후 다시 시도해 주세요." }, 429);

  try {
    const reader = request.body?.getReader();
    if (!reader) return json({ error: "질문을 입력해 주세요." }, 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return json({ error: "대화가 너무 깁니다. 새 대화를 시작해 주세요." }, 413);
      }
      chunks.push(value);
    }
    let body: unknown;
    try { body = JSON.parse(Buffer.concat(chunks).toString("utf8")); }
    catch { return json({ error: "올바른 JSON 요청이 필요합니다." }, 400); }
    const messages = parseMessages(body);
    if (!messages) return json({ error: "질문은 2,000자 이내로 입력해 주세요. 대화가 길면 새로 시작해 주세요." }, 400);
    const reply = await generateReply({
      providers,
      context: portfolioContext,
      messages,
      signal: request.signal,
    });
    return json({ reply });
  } catch (error) {
    if (error instanceof ChatServiceError) return json({ error: error.message }, error.status);
    const timeout = error instanceof Error && ["TimeoutError", "AbortError"].includes(error.name);
    return json({ error: timeout ? "응답이 지연되고 있습니다. 잠시 후 다시 시도해 주세요." : "AI 연결 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요." }, timeout ? 504 : 502);
  }
}
