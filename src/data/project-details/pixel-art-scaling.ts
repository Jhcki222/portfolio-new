import type { Project } from "./types";

export const pixelArtScaling: Project = {
  "slug": "pixel-art-scaling",
  "name": "Structure-Aware Pixel Art Scaling",
  "category": "공동연구 · 국제 학술지 게재",
  "headline": "블록 크기 탐지 기반 픽셀 아트 리사이징 연구",
  "summary": "공약수·Minchunk 기반 블록 탐지 · Brute-Force 대비 탐지시간 90% 이상 단축 · Applied Sciences 공동 게재",
  "focus": "알고리즘 구현 · 검증 기준 수립 · 논문 공동 작성",
  "tags": [
    "Python",
    "OpenCV",
    "Computer Vision",
    "Paper"
  ],
  "links": [
    {
      "label": "게재 논문 읽기",
      "url": "https://www.mdpi.com/2076-3417/16/5/2314"
    }
  ],
  "overview": [
    "공동연구 · Applied Sciences 공동 저자 게재"
  ],
  "architecture": {
    "title": "최소 격자 탐지와 이미지 재구성",
    "items": [
      "블록 크기 탐지 → 요청 배율에 맞춘 정수 블록 결정 → 최소 격자 재구성"
    ]
  },
  "chapters": [
    {
      "id": "block-detection",
      "nav": "블록 탐지와 배율 선택",
      "title": "블록 탐지시간 90% 이상 단축",
      "blocks": [
        {
          "heading": "공약수·Minchunk 탐지",
          "items": [
            "가로·세로 공약수로 블록 후보 제한",
            "Minchunk로 고유 블록·최소 격자 탐지 · 최근접 이웃 재구성",
            "Brute-Force 대비 블록 탐지시간 90% 이상 단축",
            "정수 블록 크기 반올림: 2px × 1.4 → 3px(실제 1.5배) · 최소 1px"
          ]
        }
      ],
      "figure": {
        "src": "/projects/pixel-art-scaling/algorithm.png",
        "width": 902,
        "height": 1195,
        "portrait": true,
        "alt": "논문 Algorithm 2: 블록 크기에 요청 배율을 곱해 반올림하고 최소 격자를 재구성하는 알고리즘과 예시",
        "caption": "스케일링 알고리즘 · 2px 블록 × 1.4배 → 3px 블록(실제 1.5배)"
      },
      "description": "블록 크기를 완전탐색하는 비용을 줄이기 위해 이미지 가로·세로 크기의 공약수로 후보를 제한했습니다. 최소 격자를 찾은 뒤 정수 블록 크기로 이미지를 재구성했습니다."
    },
    {
      "id": "shared-tests",
      "nav": "모듈 간 검증 기준",
      "title": "변인별 50개 테스트와 모듈 통합",
      "blocks": [
        {
          "heading": "공통 테스트·모듈 통합",
          "items": [
            "투명도·노이즈·해상도 등 변인별 각각 50개 테스트·기대값 작성",
            "공통 입력·기대값으로 모듈 검증 · 페어 프로그래밍 전처리 점검",
            "추가 결과 불일치 없이 통합 · Applied Sciences 공동 저자 게재"
          ]
        }
      ],
      "figure": {
        "src": "/projects/pixel-art-scaling/publication.png",
        "width": 911,
        "height": 1079,
        "portrait": true,
        "alt": "Applied Sciences에 게재된 Structure-Aware Pixel Art Scaling via Block Size Detection 논문의 첫 페이지",
        "caption": "Applied Sciences, 2026, 16, 2314에 게재된 논문"
      },
      "description": "모듈 통합 시 투명도·노이즈·해상도 처리에서 출력 차이가 발생했습니다. 변인별 입력과 기대값을 함께 작성하고 같은 기준으로 전처리와 모듈을 검증했습니다."
    }
  ],
  "description": "픽셀 아트의 블록 크기를 탐지하고 격자를 재구성하는 연구입니다. Python·OpenCV 구현, 테스트와 논문 공동 작성에 참여했습니다."
};
