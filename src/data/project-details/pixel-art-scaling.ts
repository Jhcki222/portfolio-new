import type { Project } from "./types";

export const pixelArtScaling: Project = {
  "slug": "pixel-art-scaling",
  "name": "Structure-Aware Pixel Art Scaling",
  "category": "공동연구, 국제 학술지 게재",
  "headline": "블록 구조를 유지하는 픽셀 아트 리사이징 연구",
  "summary": "픽셀 아트의 블록 구조를 유지하면서 이미지 크기를 조절하는 연구",
  "focus": "블록 탐지 구현과 테스트, 논문 공동 작성",
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
    "공동연구, Python과 OpenCV 구현 및 테스트 참여",
    "Applied Sciences 논문 공동저자"
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
      "title": "블록 구조를 유지하는 탐지와 이미지 재구성",
      "blocks": [
        {
          "heading": "탐색 범위 축소와 정수 블록 선택",
          "items": [
            "공약수로 제한한 후보에서 고유 블록과 최소 격자를 탐지하고 최근접 이웃 방식으로 재구성했습니다.",
            "Brute-Force와의 비교 기록에서 블록 탐지시간을 90% 이상 줄였습니다.",
            "예를 들어 2px 블록에 1.4배를 요청하면 3px로 반올림돼 실제 배율은 1.5배가 됩니다. 블록은 최소 1px로 제한했습니다."
          ]
        }
      ],
      "figure": {
        "src": "/projects/pixel-art-scaling/algorithm.png",
        "width": 902,
        "height": 1195,
        "portrait": true,
        "alt": "논문 Algorithm 2: 블록 크기에 요청 배율을 곱해 반올림하고 최소 격자를 재구성하는 알고리즘과 예시",
        "caption": "스케일링 알고리즘, 2px 블록 × 1.4배 → 3px 블록(실제 1.5배)"
      },
      "description": "픽셀 아트의 블록 크기를 완전탐색하는 비용을 줄이기 위해 이미지 가로와 세로 크기의 공약수로 후보를 제한했습니다. Minchunk로 최소 격자를 찾고 정수 블록으로 재구성했습니다. 블록 크기를 정수로 선택하므로 요청 배율과 실제 배율에는 차이가 생길 수 있습니다."
    },
    {
      "id": "shared-tests",
      "nav": "모듈 간 검증 기준",
      "title": "모듈별 출력 차이를 공통 테스트로 검증",
      "blocks": [
        {
          "heading": "변인별 입력과 기대값",
          "items": [
            "투명도, 노이즈, 해상도 등 변인별로 각각 50개 테스트와 기대값을 작성했습니다.",
            "공통 기준으로 모듈을 검증한 뒤 추가 결과 불일치 없이 통합했습니다.",
            "연구 결과를 Applied Sciences에 공동저자로 게재했습니다."
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
      "description": "모듈 통합 과정에서 투명도, 노이즈와 해상도 처리에 따른 출력 차이가 발생했습니다. 각 모듈에 같은 입력과 기대값을 적용하고 페어 프로그래밍으로 전처리를 점검했습니다."
    }
  ],
  "description": "픽셀 아트의 블록 크기를 탐지하고 격자를 재구성하는 연구입니다. Python, OpenCV 구현, 테스트와 논문 공동 작성에 참여했습니다.",
  "highlights": [
    "공약수 기반 탐색 후보 축소",
    "공통 입력과 기대값으로 모듈 검증"
  ],
  "contributions": [
    "가로와 세로의 공약수로 탐색 후보를 제한하는 블록 탐지 알고리즘을 구현했습니다.",
    "투명도, 노이즈와 해상도별 입력 및 기대값을 작성해 모듈 검증 기준을 맞췄습니다.",
    "모듈 통합과 결과 검증, 논문 공동 작성에 참여했습니다."
  ]
};
