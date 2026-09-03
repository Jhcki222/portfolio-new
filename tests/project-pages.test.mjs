import assert from "node:assert/strict";
import test from "node:test";

// Run against `npm run dev` or a production server with PORTFOLIO_URL set.
const baseUrl = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:3000";
const projectPages = [
  ["knowwhohow", "노후하우"],
  ["collabo", "COLLABO"],
  ["easyreader", "EasyReader"],
  ["pixel-art-scaling", "Structure-Aware Pixel Art Scaling"],
  ["card-recommendation", "신용카드 추천 챗봇"],
  ["delishare", "Delishare"],
];

test("the project list keeps the requested order and links to every introduction", async () => {
  const response = await fetch(baseUrl);
  assert.equal(response.status, 200);
  const html = await response.text();
  const section = html.match(/<section\b[^>]*id="projects"[\s\S]*?<\/section>/)?.[0];
  assert.ok(section, "Projects section must remain on the main page");
  const links = Array.from(section.matchAll(/<a\b[^>]*href="([^"]+)"/g), ([, href]) => href);
  assert.deepEqual(links, projectPages.map(([slug]) => `/projects/${slug}`));
});

for (const [slug, name] of projectPages) {
  test(`${name} can be opened directly with a title and a way back`, async () => {
    const response = await fetch(`${baseUrl}/projects/${slug}`);
    assert.equal(response.status, 200, "A registered project must not return 404");
    const html = await response.text();
    assert.ok(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1].includes(name));
    assert.ok(html.match(/<title>(.*?)<\/title>/)?.[1].includes(name));
    assert.match(html, /<a\b[^>]*href="\/#projects"[^>]*>[^<]*프로젝트 목록/);
    const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0];
    assert.ok(main);
    assert.doesNotMatch(main, /project-reflection|돌아보며/);
    if (slug === "knowwhohow") assert.doesNotMatch(main, /우리FISA/);
    if (slug !== "delishare") {
      assert.match(main, /<a\b[^>]*href="https:\/\//, "Original project resources remain accessible");
    }
    const contents = main.match(/<nav\b[^>]*aria-label="페이지 목차"[\s\S]*?<\/nav>/)?.[0];
    assert.ok(contents, "Long project stories need a table of contents");
    const anchors = Array.from(contents.matchAll(/href="#([^"]+)"/g), ([, id]) => id);
    assert.ok(anchors.length >= 2);
    const headingOrder = Array.from(main.matchAll(/<h2\b[^>]*id="([^"]+)"/g), ([, id]) => id);
    assert.deepEqual(anchors, headingOrder, "Contents and body must follow the same reading order");
    if (slug === "knowwhohow") {
      assert.ok(anchors.indexOf("mydata") < anchors.indexOf("recommendation-search"));
      assert.equal(anchors.at(-1), "project-architecture");
      for (const image of ["on-premise-architecture", "aws-cloud-architecture", "service-recommendation"]) {
        assert.ok(main.includes(`href="/projects/knowwhohow/${image}.png"`), `${image} must appear in the project story`);
      }
    }
    for (const id of anchors) {
      assert.equal(main.split(`id="${id}"`).length - 1, 1, `Contents target ${id} must exist exactly once`);
    }
    for (const [, source] of main.matchAll(/<a\b[^>]*href="(\/projects\/[^"#]+\.png)"/g)) {
      const asset = await fetch(`${baseUrl}${source}`);
      assert.equal(asset.status, 200, `Source figure ${source} must open`);
      assert.match(asset.headers.get("content-type"), /^image\//);
    }
  });
}

for (const slug of ["travelbox", "localmark"]) {
  test(`the removed ${slug} page returns 404`, async () => {
    const response = await fetch(`${baseUrl}/projects/${slug}`);
    assert.equal(response.status, 404);
  });
}

test("an unknown project returns 404 instead of another project's content", async () => {
  const response = await fetch(`${baseUrl}/projects/does-not-exist`);
  assert.equal(response.status, 404);
});

test("the old Projects URL still leads to the main-page section", async () => {
  const response = await fetch(`${baseUrl}/projects`, { redirect: "manual" });
  assert.equal(response.status, 308);
  assert.equal(new URL(response.headers.get("location"), baseUrl).hash, "#projects");
});
