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
  ["study-review", "알고리즘 스터디 운영 AI 대시보드"],
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
    if (!["delishare", "study-review", "collabo"].includes(slug)) {
      assert.match(main, /<a\b[^>]*href="https:\/\//, "Original project resources remain accessible");
    }
    const contents = main.match(/<nav\b[^>]*aria-label="페이지 목차"[\s\S]*?<\/nav>/)?.[0];
    assert.ok(contents, "Long project stories need a table of contents");
    const anchors = Array.from(contents.matchAll(/href="#([^"]+)"/g), ([, id]) => id);
    assert.ok(anchors.length >= 2);
    const headingOrder = Array.from(main.matchAll(/<h2\b[^>]*id="([^"]+)"/g), ([, id]) => id);
    assert.deepEqual(anchors, headingOrder, "Contents and body must follow the same reading order");
    assert.doesNotMatch(main, /project-case-study|문제 · 대처 · 성과/);
    assert.match(main, /<ul class="project-points">/, "Project details use compact lists");
    assert.match(main, /<p class="project-intro">/, "Each project includes context alongside implementation bullets");
    assert.doesNotMatch(main, /물리 서버|클라우드 이관|후속 인프라 과제/);
    assert.doesNotMatch(main, /<h3[^>]*>(?:문제|대처|성과|성과와 보강):/);
    if (slug === "knowwhohow") {
      assert.match(main, /42%/);
      assert.doesNotMatch(main, /약 50%/);
      for (const phrase of ["Debezium", "98개", "5개 시나리오", "49/53", "92.5%", "만료 상품", "임베딩 누락"]) assert.ok(main.includes(phrase));
      assert.doesNotMatch(main, /2026|후속 고도화/);
      assert.doesNotMatch(main, /서로 다른 실험입니다|작은 fixture|확대하지 않았습니다/);
      assert.ok(anchors.indexOf("mydata") < anchors.indexOf("recommendation-search"));
      assert.ok(anchors.indexOf("project-role") < anchors.indexOf("project-architecture"));
      assert.ok(anchors.indexOf("project-architecture") < anchors.indexOf("mydata"));
      for (const image of ["on-premise-architecture", "aws-cloud-architecture", "service-recommendation"]) {
        assert.ok(main.includes(`href="/projects/knowwhohow/${image}.png"`), `${image} must appear in the project story`);
      }
    }
    if (slug === "collabo") {
      for (const value of ["Recall@5", "0.59", "0.88", "ROUGE-1 F1", "0.46", "0.72", "nDCG@5", "0.61", "0.74"]) assert.ok(main.includes(value));
      assert.doesNotMatch(main, /30% 이상 개선/);
    }
    if (slug === "easyreader") assert.ok(main.includes('href="/projects/easyreader/store-listing.png"'), "EasyReader shows the supplied store screenshot");
    if (slug === "study-review") for (const phrase of ["6명", "SHA-256", "JSON", "Promise", "Notion", "GitHub"]) assert.ok(main.includes(phrase));
    for (const id of anchors) {
      assert.equal(main.split(`id="${id}"`).length - 1, 1, `Contents target ${id} must exist exactly once`);
    }
    for (const [, source] of main.matchAll(/<a\b[^>]*href="(\/projects\/[^"#]+\.(?:png|gif))"/g)) {
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
