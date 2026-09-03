import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-main section-light">
      <section className="section-inner">
        <div className="section-heading">
          <p className="eyebrow">404 / PAGE NOT FOUND</p>
          <h2>페이지를 찾을 수 없습니다.</h2>
        </div>
        <Link className="button button-dark" href="/">홈으로 이동</Link>
      </section>
    </main>
  );
}
