import PortfolioSection from "@/components/portfolio-section";

export default function AboutSection() {
  return (
    <PortfolioSection
      id="about"
      theme="dark"
      eyebrow="01 / ABOUT ME"
      title="About me"
      innerClassName="about-grid"
      headingClassName="section-title-block"
    >
      <aside className="profile-card" aria-label="프로필 요약">
        <img src="/assets/이종혁_증명.jpg" alt="이종혁 증명사진" />
        <strong>이종혁 / Lee Jong Hyuck</strong>
        <span>1999.03.24</span>
        <a href="mailto:jhcki222@gmail.com">jhcki222@gmail.com</a>
        <a href="https://github.com/Jhcki222" target="_blank" rel="noopener noreferrer">
          github.com/Jhcki222
          <span className="sr-only"> (새 탭에서 열림)</span>
        </a>
      </aside>
      <div className="about-panel character-panel">
        <h3>Character</h3>
        <p>
          사용자를 생각하는 개발을 지향하며, 지속 가능한 서비스를 추구합니다. Java SpringBoot 기반
          백엔드 개발을 중심으로 RAG, LLM, AI Agent와 시스템 아키텍처에 관심을 가지고 있습니다.
        </p>
      </div>
      <div className="about-panel education-panel">
        <h3>Education</h3>
        <dl className="timeline-list">
          <div>
            <dt>2019.03 - 2025.08</dt>
            <dd>동국대학교 컴퓨터공학과 학사</dd>
          </div>
        </dl>
      </div>
      <div className="about-panel experiences-panel">
        <h3>Experiences</h3>
        <dl className="timeline-list compact-list">
          <div>
            <dt>2026.07 -</dt>
            <dd>SSAFY 16th</dd>
          </div>
          <div>
            <dt>2024.03 - 2025.01</dt>
            <dd>동국대학교 UMC 6, 7기</dd>
          </div>
          <div>
            <dt>2023.03 - 2023.12</dt>
            <dd>코테이토 7기 WEB</dd>
          </div>
        </dl>
      </div>
      <div className="about-panel focus-panel">
        <h3>Focus</h3>
        <ul className="pill-list">
          <li>Backend Engineering</li>
          <li>AI Service</li>
          <li>Cloud</li>
          <li>System Architecture</li>
        </ul>
      </div>
      <div className="about-panel certificate-panel">
        <h3>Certificate</h3>
        <ul className="pill-list">
          <li>SQLD</li>
          <li>정보처리기사</li>
        </ul>
      </div>
      <div className="about-panel publication-panel">
        <h3>Publication</h3>
        <a
          className="publication-title"
          href="https://www.mdpi.com/2076-3417/16/5/2314"
          target="_blank"
          rel="noopener noreferrer"
        >
          Structure-Aware Pixel Art Scaling via Block Size Detection{" "}
          <span aria-hidden="true">↗</span>
          <span className="sr-only"> (논문 새 탭에서 열기)</span>
        </a>
        <p className="publication-meta">Applied Sciences · 2026 · 공동저자</p>
      </div>
    </PortfolioSection>
  );
}
