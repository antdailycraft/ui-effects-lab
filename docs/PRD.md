# UI Effects Lab PRD

## 1. 문서 개요

- **프로젝트명:** UI Effects Lab
- **Repository 제안명:** `ui-effects-lab`
- **문서 유형:** Product Requirements Document (PRD)
- **플랫폼:** Web
- **기술 스택:** Vite + React + TypeScript
- **핵심 목적:** SVG/CSS 기반 UI 효과를 탐색하고, 실시간으로 파라미터를 조절하며, Before/After 비교 후 실제 코드로 복사할 수 있는 인터랙티브 Showcase / Playground 제공

---

## 2. 제품 개요

UI Effects Lab은 웹 개발자와 디자이너가 다양한 SVG Filter 및 CSS 기반 시각 효과를 한 곳에서 실험할 수 있는 인터랙티브 도구다.

단순한 효과 갤러리가 아니라 다음 흐름을 핵심 제품 경험으로 한다.

> **Explore → Tweak → Compare → Copy**

사용자는 효과를 발견하고, 각 효과의 파라미터를 조절하고, 실제 UI 컴포넌트에 적용된 모습을 확인하며, Before/After 비교 후 SVG 또는 CSS 코드를 바로 복사할 수 있다.

초기 버전에서는 특히 다음 SVG Filter Primitive를 주요 대상으로 한다.

- `feTurbulence`
- `feDisplacementMap`
- `feBlend`
- `feColorMatrix`
- `feGaussianBlur`
- `feComposite`

이후 CSS 효과까지 확장한다.

- `filter`
- `backdrop-filter`
- `mix-blend-mode`
- CSS Gradient
- Mask
- Clip Path
- CSS Animation
- CSS Transform

---

## 3. 배경 및 문제 정의

SVG Filter는 강력하지만 실제 프로젝트에서 사용하기 어렵다.

주요 문제는 다음과 같다.

1. 각 Filter Primitive가 어떤 결과를 만드는지 직관적으로 이해하기 어렵다.
2. `baseFrequency`, `numOctaves`, `seed`, `scale` 등의 파라미터를 코드만 보면서 조절하기 어렵다.
3. 여러 필터를 조합했을 때 결과를 예측하기 어렵다.
4. 예제 대부분이 단순 도형이나 텍스트 중심이라 실제 UI에서 어떻게 보이는지 확인하기 어렵다.
5. 마음에 드는 효과를 찾더라도 재사용 가능한 코드로 옮기는 과정이 번거롭다.
6. CSS 효과와 SVG Filter 효과를 한 곳에서 비교할 수 있는 도구가 부족하다.
7. 같은 효과도 텍스트, 카드, 이미지, 버튼 등에 적용하면 결과가 달라지므로 다양한 Preview가 필요하다.

UI Effects Lab은 이 문제를 실시간 Playground 형태로 해결한다.

---

## 4. 제품 목표

### 4.1 핵심 목표

- SVG/CSS 효과를 빠르게 탐색할 수 있다.
- 모든 주요 파라미터를 실시간으로 조절할 수 있다.
- 실제 UI 컴포넌트에서 결과를 확인할 수 있다.
- 원본과 효과 적용 결과를 즉시 비교할 수 있다.
- 생성된 SVG/CSS 코드를 바로 복사할 수 있다.
- Randomize를 통해 예상하지 못한 새로운 시각 효과를 발견할 수 있다.
- 좋은 조합을 Preset으로 저장할 수 있다.

### 4.2 장기 목표

UI Effects Lab을 단순 Showcase에서 웹 UI Visual Effect 제작 도구로 발전시킨다.

장기적으로 다음 기능을 고려한다.

- Effect Chain 편집
- 여러 효과 조합
- Preset 공유
- URL 기반 설정 공유
- Effect Marketplace / Community Gallery
- CodePen / StackBlitz export
- React Component export
- Tailwind utility export
- 이미지/SVG 업로드 후 사용자 요소에 효과 적용

---

## 5. 비목표

초기 MVP에서는 다음 기능을 목표로 하지 않는다.

- Photoshop 수준의 이미지 편집
- 전문 영상/VFX 편집
- 복잡한 Node-based Shader Editor
- WebGL Shader 개발 환경
- After Effects 대체
- 완전한 SVG 편집기
- AI 기반 이미지 생성
- 사용자 계정 및 클라우드 동기화

---

## 6. 타깃 사용자

### 6.1 Frontend Developer

필요한 시각 효과를 빠르게 찾아 실제 프로젝트에 적용하려는 사용자.

주요 요구사항:

- 결과를 바로 확인
- SVG/CSS 코드 복사
- 파라미터 조정
- 브라우저 호환성 확인

### 6.2 UI / UX Designer

코드를 깊이 알지 못해도 시각 효과를 탐색하고 개발자에게 전달하려는 사용자.

주요 요구사항:

- Slider 기반 조절
- 다양한 Preview
- Before / After 비교
- Preset 저장

### 6.3 Creative Developer

SVG, CSS Animation, Filter를 이용해 실험적인 웹 UI를 제작하는 사용자.

주요 요구사항:

- 세밀한 파라미터
- Randomize
- Animation
- Effect 조합
- Code export

---

## 7. 핵심 사용자 흐름

```text
Effect 탐색
    ↓
Live Preview 확인
    ↓
Parameter 조절
    ↓
Randomize / Fine Tune
    ↓
Before / After 비교
    ↓
Preset 저장
    ↓
SVG / CSS 코드 확인
    ↓
Copy
```

제품의 핵심 UX는 다음 네 단어로 정의한다.

> **Explore → Tweak → Compare → Copy**

---

## 8. Information Architecture

기본 화면은 3 Column Layout을 사용한다.

```text
┌──────────────────────────────────────────────────────────────────────┐
│ UI EFFECTS LAB                                      Theme   GitHub   │
├──────────────┬───────────────────────────────────┬───────────────────┤
│ EFFECTS      │                                   │ CONTROLS          │
│              │                                   │                   │
│ Search...    │         LIVE PREVIEW              │ baseFrequency     │
│              │                                   │ [----●---------] │
│ SVG FILTERS  │    ┌─────────────────────────┐    │                   │
│              │    │                         │    │ numOctaves        │
│ ● Paper      │    │      SAMPLE CARD        │    │ [3]               │
│   Grain      │    │                         │    │                   │
│ ● Rough      │    │   Local Advertisement   │    │ seed              │
│   Edge       │    │                         │    │ [12]              │
│              │    └─────────────────────────┘    │                   │
│ ● Water      │                                   │ displacement      │
│              │                                   │ [----●---------] │
│ ● Heat Haze  │                                   │                   │
│              │                                   │ ☑ Animate         │
│ CSS EFFECTS  │                                   │                   │
│ ● Glass      │                                   │ [Reset]           │
│ ● Hologram   │                                   │                   │
│ ● CRT        │                                   │ SVG CODE          │
│              │                                   │ <feTurbulence...  │
├──────────────┴───────────────────────────────────┴───────────────────┤
│ Compare  |  Fullscreen  |  Randomize  |  Save Preset  |  Copy Code │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 9. 주요 화면 구성

## 9.1 Top Bar

포함 요소:

- Logo / Product Name
- Theme toggle
- GitHub link
- Reset Workspace
- 향후 Share 버튼

---

## 9.2 Left Panel — Effect Catalog

효과를 탐색하는 영역이다.

기능:

- 검색
- 카테고리
- 효과 목록
- 즐겨찾기
- 최근 사용 효과

초기 카테고리:

```text
SVG Filters
CSS Effects
Retro
Experimental
```

향후 추가 가능:

```text
Typography
Image Effects
Motion
Background
Mask
Blend
```

---

## 9.3 Center — Live Preview

선택한 Effect를 실제 UI에 적용해서 보여주는 핵심 영역이다.

단순한 Rectangle뿐 아니라 다양한 Preview Target을 제공한다.

### Preview Type

- Card
- Text
- Image
- Button
- Newspaper
- Custom HTML

향후:

- Modal
- Hero
- Navigation
- Badge
- Product Card
- Advertisement
- SVG Shape

---

## 9.4 Right Panel — Controls

선택한 효과의 Parameter를 조절한다.

Control Type:

- Range
- Number
- Select
- Toggle
- Color
- Seed
- XY Range
- Animation Speed

예:

```text
Type
[turbulence ▼]

Base Frequency
[0.030 ─────●────────]

Num Octaves
[3]

Seed
[12] [Random]

Scale
[8 ─────●──────────]

Animate
[✓]

Speed
[2.0s]
```

---

## 10. MVP 효과 목록

### 10.1 Paper Grain

기술:

```text
feTurbulence
+
feBlend / feComposite
```

목적:

- 종이
- 필름
- 미세 노이즈
- 빈티지 카드

주요 파라미터:

- baseFrequency
- numOctaves
- seed
- opacity
- blend mode

---

## 10.2 Rough Edge

기술:

```text
feTurbulence
+
feDisplacementMap
```

목적:

- 손으로 그린 가장자리
- 찢어진 종이
- 스티커
- 포스트잇

주요 파라미터:

- baseFrequency
- numOctaves
- seed
- displacement scale

---

## 10.3 Water Distortion

기술:

```text
Directional feTurbulence
+
feDisplacementMap
```

목적:

- 물결
- 액체
- 수면 반사

주요 파라미터:

- frequency X
- frequency Y
- numOctaves
- scale
- animation speed

---

## 10.4 Heat Haze

기술:

```text
Low-frequency feTurbulence
+
Animated feDisplacementMap
```

목적:

- 열기
- 뜨거운 공기
- 공간 왜곡

---

## 10.5 Old Newspaper

기술:

```text
feTurbulence
+
feColorMatrix
+
contrast
+
blur
```

목적:

- 오래된 신문
- 빈티지 인쇄물
- 광고 지면

---

## 10.6 Ink Bleed

기술:

```text
blur
+
turbulence
+
composite
```

목적:

- 번진 잉크
- 낡은 인쇄
- 타이포그래피 효과

---

## 10.7 Glitch

기술:

```text
RGB Channel displacement
+
clip/mask
```

목적:

- 디지털 글리치
- RGB split
- 오류 화면

---

## 10.8 Frosted Glass

기술:

```css
backdrop-filter
background alpha
border
noise
```

목적:

- Glassmorphism
- 반투명 카드
- Overlay

---

## 10.9 Holographic Card

기술:

```text
Gradient
+
Blend Mode
+
Animated Noise
```

목적:

- 카드 홀로그램
- 프리미엄 UI
- 게임 아이템

---

## 10.10 CRT / Analog Noise

기술:

```text
scanline
+
noise
+
distortion
+
chromatic offset
```

목적:

- CRT
- VHS
- Retro display

---

## 10.11 Sticker

기술:

```text
rough edge
+
shadow
+
outline
```

목적:

- Sticker UI
- Label
- Hand-drawn UI

---

## 10.12 Liquid UI

기술:

```text
strong displacement
+
blur
+
animation
```

목적:

- Liquid
- Gooey UI
- Experimental interface

---

## 11. Before / After Compare

효과 적용 전후를 비교할 수 있어야 한다.

### Mode 1 — Side by Side

```text
Before                      After

┌────────────────┐          ╭────────────────╮
│ Advertisement  │    →     │ Advertisement   │
└────────────────┘           ╰────────────────╯
```

### Mode 2 — Comparison Slider

```text
Original     ███████████│▒▒▒▒▒▒▒▒▒▒     Effect
                        ↑
                     Drag
```

### 요구사항

- Toggle 가능
- Slider 가능
- Preview 대상 변경 시 동일하게 유지
- Animation 중에도 비교 가능

---

## 12. Randomize

각 Effect에서 Randomize 기능을 제공한다.

예:

```text
baseFrequency  0.027
numOctaves     4
seed           73
scale          17
```

### Randomize 대상

Effect Recipe에서 각 Control별 Randomize 가능 여부를 정의한다.

예:

```ts
randomizable: true
```

### 범위

극단적인 값으로 UI가 깨지지 않도록 Random Range를 별도로 정의한다.

---

## 13. Preset

사용자가 마음에 드는 Parameter 조합을 저장할 수 있다.

MVP에서는 LocalStorage를 사용한다.

Preset 데이터 예:

```ts
interface EffectPreset {
  id: string;
  name: string;
  effectId: string;
  parameters: Record<string, unknown>;
  createdAt: string;
}
```

지원 기능:

- Save
- Load
- Rename
- Delete

---

## 14. Code Viewer / Copy

현재 Effect 상태에 맞는 코드를 자동 생성한다.

Tab:

```text
[ SVG ] [ CSS ] [ React ]
```

MVP 우선순위:

1. SVG
2. CSS
3. React JSX

지원 기능:

- Syntax highlight
- Copy
- Reset
- Formatting

예:

```svg
<filter id="rough-edge">
  <feTurbulence
    type="fractalNoise"
    baseFrequency="0.03"
    numOctaves="3"
    seed="2"
    result="noise"
  />

  <feDisplacementMap
    in="SourceGraphic"
    in2="noise"
    scale="8"
    xChannelSelector="R"
    yChannelSelector="G"
  />
</filter>
```

---

## 15. Effect Recipe 시스템

효과를 코드에 하드코딩하지 않고 Recipe 데이터 기반으로 관리한다.

예:

```ts
interface EffectDefinition {
  id: string;
  name: string;
  description: string;

  category:
    | "svg-filter"
    | "css"
    | "retro"
    | "experimental";

  tags: string[];

  controls: Record<string, EffectControlDefinition>;

  defaultParameters: Record<string, unknown>;

  previewTypes: PreviewType[];

  renderer: EffectRenderer;

  codeGenerators: {
    svg?: CodeGenerator;
    css?: CodeGenerator;
    react?: CodeGenerator;
  };
}
```

### Control 정의 예

```ts
const roughEdgeEffect = {
  id: "rough-edge",
  name: "Rough Edge",
  category: "svg-filter",

  description:
    "feTurbulence와 feDisplacementMap을 사용해 손으로 그린 듯한 가장자리를 만듭니다.",

  controls: {
    baseFrequency: {
      type: "range",
      min: 0.001,
      max: 0.1,
      step: 0.001,
      default: 0.03,
      randomizable: true,
    },

    numOctaves: {
      type: "range",
      min: 1,
      max: 5,
      step: 1,
      default: 3,
      randomizable: true,
    },

    seed: {
      type: "range",
      min: 0,
      max: 100,
      step: 1,
      default: 2,
      randomizable: true,
    },

    scale: {
      type: "range",
      min: 0,
      max: 50,
      step: 1,
      default: 8,
      randomizable: true,
    },
  },
};
```

---

## 16. SVG Filter Component 구조

예:

```tsx
interface RoughEdgeFilterProps {
  id: string;
  baseFrequency: number;
  numOctaves: number;
  seed: number;
  scale: number;
}

export function RoughEdgeFilter({
  id,
  baseFrequency,
  numOctaves,
  seed,
  scale,
}: RoughEdgeFilterProps) {
  return (
    <svg width="0" height="0" aria-hidden="true">
      <defs>
        <filter id={id}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency={baseFrequency}
            numOctaves={numOctaves}
            seed={seed}
            result="noise"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
```

Preview:

```tsx
<div
  className="preview-card"
  style={{
    filter: `url(#${filterId})`,
  }}
>
  Advertisement
</div>
```

---

## 17. Preview System

Preview는 Effect와 분리된 Component 구조를 사용한다.

```ts
type PreviewType =
  | "card"
  | "text"
  | "image"
  | "button"
  | "newspaper"
  | "custom";
```

구조:

```text
PreviewCanvas
 ├── CardPreview
 ├── TextPreview
 ├── ImagePreview
 ├── ButtonPreview
 ├── NewspaperPreview
 └── CustomPreview
```

각 EffectDefinition은 지원 가능한 Preview Type을 정의할 수 있다.

---

## 18. Animation

Animation 가능한 Effect에서는 별도의 설정을 제공한다.

공통 인터페이스:

```ts
interface AnimationSettings {
  enabled: boolean;
  speed: number;
  paused: boolean;
}
```

지원:

- Play
- Pause
- Speed
- Reduced Motion 대응

가능하면 SVG `animate`보다 CSS 또는 React state 변경을 최소화하고 브라우저-native animation을 우선 검토한다.

---

## 19. Fullscreen Preview

사용자는 Control Panel과 Catalog를 숨기고 효과만 확인할 수 있어야 한다.

Fullscreen 상태에서도 다음 기능은 유지한다.

- Before / After
- Animation Play/Pause
- Exit Fullscreen

---

## 20. Search

Effect Catalog 검색 대상:

- Name
- Description
- Tag
- 기술명

예:

```text
noise
paper
turbulence
water
retro
glass
displacement
```

---

## 21. Effect 상세 정보

각 효과에는 간단한 설명을 제공한다.

예:

```text
Rough Edge

feTurbulence로 생성한 noise map을
feDisplacementMap의 displacement source로 사용해
요소의 가장자리를 불규칙하게 왜곡합니다.

Uses:
• feTurbulence
• feDisplacementMap
```

향후 MDN 링크 등의 외부 문서 연결을 고려한다.

---

## 22. UX 원칙

### 실시간성

Slider를 움직이면 즉시 Preview가 갱신되어야 한다.

### 코드와 결과의 연결

Parameter 변경 시 Code Viewer가 동시에 업데이트되어야 한다.

### Progressive Complexity

처음에는 중요한 Parameter만 표시한다.

Advanced Mode에서 세부 옵션을 노출한다.

### Reset 가능

언제든 기본 Recipe 상태로 복원할 수 있어야 한다.

---

## 23. 성능 고려사항

SVG Filter는 렌더링 비용이 높을 수 있다.

특히 다음 조합을 주의한다.

```text
Large Render Area
+
High numOctaves
+
Animation
+
Large displacement
```

### 성능 정책

- 기본 `numOctaves`는 1~3 우선
- Fullscreen Animation 시 FPS 저하 주의
- Offscreen Preview는 가능하면 렌더링 정지
- 리스트 Thumbnail에서는 정적 이미지 또는 저비용 Parameter 사용 검토
- React re-render 최소화
- `requestAnimationFrame` 남용 금지
- CSS/SVG native animation 우선
- 필요 시 `will-change` 제한적으로 사용

---

## 24. 접근성

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  /* animation 비활성화 또는 최소화 */
}
```

Animation Effect는 `prefers-reduced-motion`을 존중한다.

### Keyboard

Slider와 Toggle 모두 Keyboard 접근이 가능해야 한다.

### Label

모든 Control은 명확한 Label을 가진다.

### Contrast

Editor UI는 WCAG AA 수준의 대비를 목표로 한다.

---

## 25. 브라우저 호환성

지원 우선순위:

1. Chrome 최신
2. Edge 최신
3. Firefox 최신
4. Safari 최신

SVG Filter와 CSS Filter의 브라우저 구현 차이를 고려한다.

효과마다 향후 다음 정보를 표시할 수 있다.

```text
Browser Support
Chrome     ✓
Edge       ✓
Firefox    ✓
Safari     △
```

MVP에서는 브라우저별 완전한 Pixel 동일성을 목표로 하지 않는다.

---

## 26. 상태 관리

초기에는 복잡한 글로벌 State Library 없이 구현 가능하다.

추천:

```text
React State
+
Context
```

필요 시 향후:

```text
Zustand
```

도입을 고려한다.

주요 상태:

```ts
interface PlaygroundState {
  selectedEffectId: string;
  previewType: PreviewType;
  parameters: Record<string, unknown>;
  compareMode: "off" | "side-by-side" | "slider";
  animationEnabled: boolean;
  fullscreen: boolean;
}
```

---

## 27. LocalStorage

다음 데이터는 LocalStorage에 저장한다.

- 사용자 Preset
- 최근 Effect
- Theme
- 마지막 Preview Type

MVP에서는 서버 DB를 사용하지 않는다.

---

## 28. 추천 디렉터리 구조

```text
src/
├── app/
│   ├── App.tsx
│   └── routes.tsx
│
├── components/
│   ├── catalog/
│   ├── controls/
│   ├── code-viewer/
│   ├── compare/
│   ├── layout/
│   └── preview/
│
├── effects/
│   ├── svg/
│   │   ├── paper-grain/
│   │   ├── rough-edge/
│   │   ├── water-distortion/
│   │   ├── heat-haze/
│   │   ├── old-newspaper/
│   │   └── ink-bleed/
│   │
│   ├── css/
│   │   └── frosted-glass/
│   │
│   ├── retro/
│   │   ├── glitch/
│   │   └── crt/
│   │
│   └── experimental/
│       ├── holographic-card/
│       └── liquid-ui/
│
├── registry/
│   └── effects.ts
│
├── stores/
├── hooks/
├── types/
├── utils/
└── styles/
```

각 효과:

```text
rough-edge/
├── definition.ts
├── RoughEdgeFilter.tsx
├── generateSvg.ts
├── generateCss.ts
└── presets.ts
```

---

## 29. MVP 범위

### P0

반드시 포함:

- Effect Catalog
- Effect 선택
- Live Preview
- Card / Text / Image Preview
- Parameter Control
- Reset
- Randomize
- SVG Code Viewer
- CSS Code Viewer
- Copy
- Before / After Side-by-Side
- Local Preset
- Light / Dark Theme

### P1

가능하면 포함:

- Comparison Slider
- Newspaper Preview
- Button Preview
- Fullscreen
- Animation controls
- Search
- React JSX export

### P2

후속:

- Custom HTML
- URL Share
- Favorite
- Effect Combination
- Community Preset
- Export to CodePen / StackBlitz

---

## 30. MVP 우선 효과

초기 구현 순서는 다음을 권장한다.

```text
1. Rough Edge
2. Paper Grain
3. Water Distortion
4. Heat Haze
5. Frosted Glass
6. Old Newspaper
7. Glitch
8. CRT
```

첫 네 개를 통해 `feTurbulence`와 `feDisplacementMap` 기반 Architecture를 안정화한 후 나머지 효과를 추가한다.

---

## 31. 개발 단계 제안

### Phase 1 — Playground Core

- Layout
- Effect Registry
- Preview Canvas
- Controls
- Code Viewer

### Phase 2 — SVG Effects

- Rough Edge
- Paper Grain
- Water
- Heat Haze
- Newspaper

### Phase 3 — Experiment UX

- Randomize
- Compare
- Preset
- Fullscreen

### Phase 4 — CSS / Retro Effects

- Glass
- Glitch
- CRT
- Hologram

### Phase 5 — Sharing

- URL serialization
- Share
- Export

---

## 32. 완료 조건 / Acceptance Criteria

### Effect Catalog

- 사용자가 효과를 선택할 수 있다.
- 현재 선택된 효과가 명확히 표시된다.
- 카테고리별 탐색이 가능하다.

### Preview

- Effect 변경 시 Preview가 즉시 변경된다.
- 최소 Card/Text/Image Preview를 지원한다.
- Effect를 끌 수 있다.

### Parameter Control

- 모든 Effect Parameter가 UI Control과 연결된다.
- Slider 변경 시 육안으로 느껴질 정도의 지연 없이 Preview가 갱신된다.
- Reset 시 Default Parameter로 복원된다.

### Randomize

- 클릭할 때마다 유효한 Parameter 조합을 만든다.
- 깨진 SVG나 NaN 값을 만들지 않는다.

### Compare

- Original과 Effect 상태를 동시에 확인할 수 있다.
- 효과 Parameter 변경 시 After에 즉시 반영된다.

### Code

- 현재 Parameter 상태와 생성 코드가 일치한다.
- 사용자가 SVG/CSS 코드를 Clipboard에 복사할 수 있다.

### Preset

- 현재 Parameter를 저장할 수 있다.
- 페이지를 새로고침해도 LocalStorage에서 복구된다.
- Preset을 다시 불러올 수 있다.

### Animation

- 지원 Effect에서 Animation을 켜고 끌 수 있다.
- `prefers-reduced-motion` 환경에서 자동 재생을 최소화한다.

### Browser

- 최신 Chrome/Edge에서 주요 기능이 정상 동작한다.
- Firefox/Safari에서도 치명적인 UI 손상 없이 사용할 수 있다.

---

## 33. 성공 지표

초기에는 Analytics보다 사용성 검증을 우선한다.

관찰할 핵심 행동:

- Effect 선택 수
- Parameter 조절 횟수
- Randomize 사용률
- Compare 사용률
- Code Copy 횟수
- Preset 저장 수

향후 Product Analytics를 붙일 경우 다음 Funnel을 본다.

```text
Effect Open
    ↓
Parameter Change
    ↓
Compare
    ↓
Copy Code
```

가장 중요한 성공 이벤트는:

> **사용자가 효과를 발견하고 실제 코드로 가져가는 것**

이다.

---

## 34. 향후 확장 아이디어

### Effect Chain

```text
Turbulence
    ↓
Color Matrix
    ↓
Displacement
    ↓
Blur
```

처럼 사용자가 Filter Chain을 직접 구성한다.

### Node Editor

장기적으로 Filter Primitive를 Node 형태로 연결할 수 있다.

```text
[SourceGraphic] ───────────────┐
                              ↓
[Turbulence] → [ColorMatrix] → [Displacement] → Output
```

단, MVP에는 포함하지 않는다.

### Shareable URL

Parameter를 Query String 또는 compressed state로 저장한다.

예:

```text
/effects/rough-edge?freq=0.03&octaves=3&seed=12&scale=8
```

### Preset Gallery

유용한 Recipe를 기본 제공한다.

예:

```text
Soft Paper
Vintage Newspaper
Strong Water
Hand Drawn
Heavy Ink
VHS Damage
Cyber Glitch
```

---

## 35. 제품 방향 요약

UI Effects Lab은 단순한 SVG Filter 예제 모음이 아니다.

핵심 가치는 다음 경험을 하나의 도구에서 연결하는 것이다.

```text
DISCOVER
   ↓
EXPERIMENT
   ↓
COMPARE
   ↓
REUSE
```

또는 제품 UX 관점에서는:

> **Explore → Tweak → Compare → Copy**

초기에는 SVG `feTurbulence`와 `feDisplacementMap`을 중심으로 완성도 높은 Playground를 만들고, 이후 CSS / Retro / Experimental Effect까지 확장한다.

최종적으로는 개발자와 디자이너가 웹 UI 시각 효과를 발견하고 실험하며 실제 코드로 가져갈 수 있는 **Visual Effects Workbench for the Web**을 목표로 한다.
