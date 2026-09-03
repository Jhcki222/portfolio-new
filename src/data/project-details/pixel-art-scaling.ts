import type { Project } from "./types";

export const pixelArtScaling: Project = {
  slug: "pixel-art-scaling",
  name: "Structure-Aware Pixel Art Scaling",
  category: "공동연구 · 국제 학술지 게재",
  headline: "블록 구조를 보존하는 픽셀 아트 확대·축소 연구",
  summary: "고유 블록 크기를 탐지해 픽셀 아트를 확대·축소하는 연구입니다. 공약수·Minchunk 기반 알고리즘 구현과 검증에 참여했고 Applied Sciences에 공동 저자로 게재했습니다.",
  focus: "알고리즘 구현 · 검증 기준 수립 · 논문 공동 작성",
  tags: ["Python", "OpenCV", "Computer Vision", "Paper"],
  links: [{ label: "게재 논문 읽기", url: "https://www.mdpi.com/2076-3417/16/5/2314" }],
  overview: [
    "픽셀 아트는 정사각형 블록과 제한된 색상으로 형태를 표현합니다. 확대·축소할 때 경계와 간격이 흐트러지지 않도록, 고유 블록 크기를 탐지해 그 단위로 재구성했습니다.",
    "컴퓨터 비전 팀 과제에서 시작해 교수님의 추천으로 공동연구를 진행했습니다. 논문은 'Structure-Aware Pixel Art Scaling via Block Size Detection'이라는 제목으로 Applied Sciences에 게재됐습니다.",
  ],
  contributions: [
    "Python·OpenCV로 공약수와 Minchunk 기반 블록 탐지·스케일링 알고리즘 구현에 참여",
    "투명도·노이즈·해상도 등 변인별 테스트 케이스와 기대값을 작성해 모듈 간 검증 기준 정리",
    "페어 프로그래밍으로 전처리 로직을 점검하고 실험 결과를 논문으로 정리",
  ],
  architecture: {
    title: "최소 격자 탐지와 이미지 재구성",
    paragraphs: [
      "블록 크기와 최소 격자 이미지를 구한 뒤 요청 배율에 맞춰 새 블록 크기를 정합니다. 최소 격자에 최근접 이웃 보간을 적용해 격자와 색상을 유지합니다.",
    ],
    steps: [
      { title: "블록 탐지", description: "공약수 후보를 검사해 고유 블록 크기와 최소 격자 계산" },
      { title: "배율 조정", description: "블록 크기 × 요청 배율을 반올림해 새 블록 크기 결정" },
      { title: "이미지 재구성", description: "최소 격자를 정수 블록 크기로 최근접 이웃 확대" },
    ],
  },
  chapters: [
    {
      id: "block-detection", nav: "블록 탐지와 배율 선택",
      title: "블록 탐지 후보와 확대·축소 배율 조정",
      blocks: [
        {
          heading: "Brute-Force의 탐지 비용",
          paragraphs: [
            "Brute-Force 탐지 비용을 줄이려고 원본의 반복 구조에서 블록 후보를 좁힐 단서를 찾았습니다.",
          ],
        },
        {
          heading: "공약수와 Minchunk로 후보 축소",
          paragraphs: [
            "이미지 가로·세로 크기의 공약수로 블록 후보를 좁혔습니다. 블록의 최소 구성 단위인 Minchunk로 고유 블록 크기와 최소 격자 이미지를 찾고, 이 격자를 정수 배율로 재구성했습니다.",
            "새 블록 크기는 기존 크기와 요청 배율을 곱해 반올림합니다. 2픽셀 블록에 1.4배 확대를 요청하면 2 × 1.4를 반올림한 3픽셀 블록을 사용하므로 실제 확대율은 1.5배입니다. 가장 가까운 정수 격자로 구조를 보존하며, 축소 계산값이 0이면 최소 1픽셀을 사용합니다.",
          ],
        },
        {
          heading: "블록 탐지 시간 90% 이상 감소",
          paragraphs: [
            "프로젝트 비교 실험의 블록 탐지 단계에서 공약수·Minchunk 방식은 Brute-Force 대비 탐지 시간을 90% 이상 줄였습니다.",
          ],
        },
      ],
      figure: {
        src: "/projects/pixel-art-scaling/algorithm.png", width: 902, height: 1195, portrait: true,
        alt: "논문 Algorithm 2: 블록 크기에 요청 배율을 곱해 반올림하고 최소 격자를 재구성하는 알고리즘과 예시",
        caption: "논문의 스케일링 알고리즘과 실행 예시. 2픽셀 블록에 1.4배를 요청하면 3픽셀 블록으로 재구성됩니다.",
      },
    },
    {
      id: "shared-tests", nav: "모듈 간 검증 기준",
      title: "모듈 간 검증 기준 통일",
      blocks: [
        {
          heading: "모듈 통합 중 결과 불일치",
          paragraphs: [
            "각자 개발한 모듈을 연결하자 결과가 달라졌습니다. 투명도·노이즈·해상도 등 입력 조건별로 공통 검증 기준이 필요했습니다.",
          ],
        },
        {
          heading: "변인별 50개 테스트와 기대값",
          paragraphs: [
            "테스트로 인터페이스를 정하자고 제안하고, 투명도·노이즈·해상도 등 변인별로 각각 50개 테스트와 기대값을 작성했습니다. 담당자가 다른 모듈도 같은 입력과 기대값으로 검증했습니다.",
            "페어 프로그래밍으로 전처리를 개선하고 공통 검증 기준을 적용한 뒤, 추가적인 결과 불일치 없이 구현과 논문 작성을 마쳤습니다.",
          ],
        },
      ],
      figure: {
        src: "/projects/pixel-art-scaling/publication.png", width: 911, height: 1079, portrait: true,
        alt: "Applied Sciences에 게재된 Structure-Aware Pixel Art Scaling via Block Size Detection 논문의 첫 페이지",
        caption: "Applied Sciences, 2026, 16, 2314에 게재된 논문",
      },
    },
  ],
};
