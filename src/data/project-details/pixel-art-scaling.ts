import type { Project } from "./types";

export const pixelArtScaling: Project = {
  "slug": "pixel-art-scaling",
  "name": "Structure-Aware Pixel Art Scaling · SCIE 논문",
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
      "title": "이미지 크기의 공약수로 블록 후보 줄이기",
      "blocks": [
        {
          "heading": "공약수로 블록 크기를 찾고 정수 격자로 확대",
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
      "description": "픽셀 아트의 색 경계를 살려 확대하려면 원본에서 같은 색이 반복되는 블록의 크기부터 알아야 했습니다. 가능한 크기를 하나씩 대입하는 방식은 탐색에 시간이 오래 걸렸습니다.",
      "outcome": "완전탐색과 비교해 블록 탐지 시간을 90% 이상 줄였습니다."
    },
    {
      "id": "shared-tests",
      "nav": "모듈 간 검증 기준",
      "title": "모듈별 출력 차이를 공통 테스트로 검증",
      "blocks": [
        {
          "heading": "같은 이미지로 모듈별 출력 비교",
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
      "description": "각자 만든 모듈을 합쳐 보니 같은 이미지도 투명도나 노이즈, 해상도를 처리하는 방식에 따라 출력이 달랐습니다. 어느 단계에서 달라지는지 찾으려고 같은 입력 이미지와 기대값을 정했습니다.",
      "outcome": "공통 테스트로 모듈마다 다르던 출력을 확인했고, 연구 결과를 Applied Sciences에 공동 게재했습니다."
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
