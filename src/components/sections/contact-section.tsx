export default function ContactSection() {
  return (
    <section id="contact" className="portfolio-section section-dark" aria-labelledby="contact-heading" tabIndex={-1}>
      <div className="section-inner contact-inner">
        <p className="eyebrow">05 / CONTACT</p>
        <h2 id="contact-heading">Contact</h2>
        <p>궁금한 점이나 함께 이야기하고 싶은 내용이 있다면 편하게 연락 주세요.</p>
        <div className="contact-icon-grid">
          <a className="contact-icon-card" href="mailto:jhcki222@gmail.com" aria-label="이메일 보내기">
            <img src="/assets/gmail_img.webp" alt="" />
            <span>jhcki222@gmail.com</span>
          </a>
          <a
            className="contact-icon-card contact-icon-card-github"
            href="https://github.com/Jhcki222"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub 열기"
          >
            <img src="/assets/github_img.webp" alt="" />
            <span>github.com/Jhcki222</span>
          </a>
        </div>
      </div>
    </section>
  );
}
