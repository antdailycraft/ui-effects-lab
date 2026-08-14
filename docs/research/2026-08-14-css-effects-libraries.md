# CSS·이펙트 라이브러리 & 웹기술 발굴 리포트

> 목적: UI Effects Lab에 추가할 만한 CSS/SVG/WebGL 이펙트 라이브러리와 브라우저 네이티브 웹기술 발굴.
> 검증일: 2026-08-14. 라이선스는 GitHub `LICENSE`/`package.json`/공식 약관에서 **직접 확인**(기억이 아님). 미확인 항목은 `확인 필요`로 표기.

## ⚠️ 라이선스 지뢰밭 (도입 전 필독)

| 프로젝트 | 라이선스 | 주의 |
|---|---|---|
| Trianglify | **GPL-3.0** | 라이브러리 코드가 카피레프트 → 배포 제품에 포함 시 전염. 단 **생성 이미지**는 자유 |
| Animate.css | **Hippocratic-2.1** | OSI 오픈소스 아님(윤리 조항부). npm 미러가 "MIT"로 오표기됨 — 원본 저장소가 정답 |
| GSAP | **Standard "no-charge"** | 2024 Webflow 인수 후 전 플러그인 무료. 그러나 OSI/SPDX 아님, "노코드 애니 빌더 경쟁 도구" 금지 조항 |
| Hover.css | MIT(개인/OSS) + 상업 판매 **유료** | 제품 판매 시 별도 상업 라이선스 |
| p5.js | **LGPL-2.1** | 약한 카피레프트 |
| Theatre.js | core Apache-2.0 / **studio AGPL-3.0** | 에디터 번들 시 네트워크 카피레프트 |
| Hero Patterns | **CC BY 4.0** | 사용 시 저작자 표시 필수 |
| MagicPattern / Haikei / SVG Backgrounds | 확인 필요 / 조건부 | 출력물 재사용 약관 불명확·조건부 (아래 B 참고) |

**퍼미시브(안전) ✅**: MIT · Apache-2.0 · BSD · Zlib · Unlicense
**호스티드 생성기**: 대개 "생성 결과물은 자유, 도구 자체는 비공개/프리미엄". 결과물만 복사하면 안전(단 약관 확인).

---

## A. CSS 애니메이션·이펙트 라이브러리

| 이름 | 용도 | 라이선스(검증) | 상태 | 적합성 |
|---|---|---|---|---|
| Open Props | 디자인 토큰: 이징·프리셋 keyframes | **MIT** ✅ | 활발 5.5k | ★ 이징을 슬라이더 파라미터로 |
| anime.js v4 | JS 애니 엔진(CSS/SVG/DOM) | **MIT** ✅ | 활발 72k | 파라미터 구동 코어 |
| Motion (motion.dev) | React/JS 모션 | **MIT** ✅ | 매우 활발 33k | React 선언형 통합 |
| GSAP | 고급 타임라인·ScrollTrigger·SplitText·MorphSVG | 🟡 무료(non-OSI) | 활발 28k | "파워 모드" 옵션 |
| AutoAnimate | 리스트/레이아웃 자동 전환 | **MIT** ✅ | 활발 14k | 한 줄 통합 |
| Animate.css | 클래스형 keyframes 카탈로그 | ⚠️ Hippocratic-2.1 | 안정 83k | 번들 X, 참고 O |
| Hover.css | 호버 이펙트 | MIT + 상업 유료 💰 | 저활동 29k | 참고/개인용 |
| Animista | CSS 애니 생성기(도구) | 도구 비공개 / 출력 **BSD-2** ✅ | 호스티드 | UX 벤치마크(tune→copy) |
| CSSFX / Magic / Whirl | 이펙트·로더 스니펫 | **MIT** ✅ | 아카이브/저활동 | 복붙·학습 |
| Theatre.js | 비주얼 모션 에디터 | core Apache-2.0 / studio AGPL ⚠️ | 12.6k | 고급 시퀀싱 |
| tailwindcss-animate → tw-animate-css(v4) | Tailwind 애니 유틸 | **MIT** ✅ | 정체→후속 | Tailwind 한정 |

## B. SVG·벡터·패턴/배경

### (a) 설치형 라이브러리
| 이름 | 용도 | 라이선스 | 상태 | 적합성 |
|---|---|---|---|---|
| css-doodle | `<css-doodle>` 패턴 생성 웹컴포넌트+DSL | **MIT** ✅ | 활발 6k | ★ 패턴 카테고리 |
| Rough.js | 손그림 벡터(SVG/Canvas) | **MIT** ✅ | 21k | ★ 손그림 프리셋 |
| @paper-design/shaders | 캔버스 셰이더 애니 비주얼 | **Apache-2.0** ✅ | 활발 3.3k | ★ 동일 도메인 |
| figma-squircle / @squircle-js/react | 스무스 코너(스퀴클) | **MIT** ✅ | — | 카드 모서리 |
| blobs (g-harel) / blobs.app | 유기적 블롭 생성 | **MIT** ✅ | 소형 | 블롭 마스크 |
| SVGO / SVGOMG | SVG 최적화/정리 | **MIT** ✅ | 활발 23k | ★ 코드뷰어 출력 minify |
| pattern.css | 순수 CSS 배경 패턴 | MIT(LICENSE 파일 없음, 경미) | stale 4k | 학습 |
| Trianglify | 로우폴리 삼각형 배경 | ⚠️ **GPL-3.0** | 10k | 코드 도입 주의 |

### (b) 호스티드 생성기 (결과물 복사)
| 이름 | 결과물 라이선스 | 비고 |
|---|---|---|
| ⭐ fffuel.co | 개인·상업 자유, 표시 불필요(검증) / 이미지 재판매 금지 | grain·noise·gradient·blob·glitch·holographic 등 50+ 툴, feTurbulence 기반. **최우선 copy-from** |
| Hero Patterns | ⚠️ CC BY 4.0(표시 필요) | SVG 타일 패턴 |
| MagicPattern | 확인 필요(ToS 재사용 불명확 + 출력물 AI 학습 금지) | 개별 툴은 "free" 표기 상충. 이미 상단바 링크됨 |
| Haikei | 확인 필요(1차 출처 미확인) | SVG 배경/블롭/웨이브 |
| SVG Backgrounds | 무료 티어 표시 필요 / Pro 표시 제거 | 배경/패턴/텍스처 |
| blobmaker.app / cssgradient.io | 확인 필요 | 블롭 / 그라디언트 |

## C. WebGL·Shader·Canvas 엔진 (고급 GPU 이펙트)

| 이름 | 용도 | 라이선스 | 규모 | 적합성 |
|---|---|---|---|---|
| Kampos | 이미지/비디오 WebGL 이펙트 컴포지터 | **MIT** ✅ | 소형 | ★ SVG필터와 개념 유사 |
| curtains.js | HTML 이미지→WebGL 평면 왜곡/셰이더 | **MIT** ✅ | 1.8k | ★ 이미지 왜곡 |
| @react-three/fiber (+drei) | React용 Three.js | **MIT** ✅ | 32k | 3D 필요 시 |
| postprocessing | 블룸/글리치/색수차 후처리 | **Zlib** ✅ | 2.8k | r3f 조합 |
| PixiJS | 2D WebGL(필터 시스템 내장) | **MIT** ✅ | 48k | 2D 이펙트 |
| OGL | 미니멀 WebGL | **Unlicense**(퍼블릭도메인) ✅ | 4.6k | 커스텀 셰이더 |
| regl / Paper.js / glfx.js | 함수형 WebGL / 벡터 / 이미지필터 | **MIT** ✅ | — | 보조 |
| Babylon.js | 풀 3D 엔진 | Apache-2.0 ✅ | 26k | 현시점 오버킬 |
| p5.js | 크리에이티브 코딩 | ⚠️ LGPL-2.1 | 24k | 카피레프트 주의 |

## D. 브라우저 네이티브 웹기술 (의존성·라이선스 0 — 최우선)

| 기술 | 새 이펙트 | 지원(Chrome/Safari/FF) |
|---|---|---|
| `@property` + `conic-gradient` | 애니메이션 그라디언트·회전 보더·색상 스윕 | Baseline Newly (전 엔진, 2024~) |
| Scroll-driven animations | 스크롤 진행바·리빌·패럴랙스 | 전 엔진(FF 132+), `@supports` 폴백 |
| View Transitions(동일문서) | 모프/크로스페이드/공유요소 전환 | Baseline Newly(2025) |
| backdrop-filter / mask / clip-path | 글래스·마스크·클립 | Baseline Widely |
| mix-blend-mode / color-mix() / filter | 듀오톤·글로우·색보정 | Baseline Widely (Safari 비분리 블렌드 확인) |
| 미사용 SVG 필터 프리미티브 | feMorphology(스티커)·feColorMatrix goo·feDropShadow·feComponentTransfer(포스터라이즈)·feConvolveMatrix(샤픈/엠보스)·조명 | 대체로 Widely(엔진별 렌더 차 有) |
| Houdini Paint API / CSS `filter()` 함수 | 생성형 배경 / 이미지값 필터 | ⚠️ Chromium·Safari 한정 → 실험 전용 |

**참고·학습 소스**: Codrops(tympanus.net/codrops) · MDN SVG 필터 · CSS-Tricks Almanac · web.dev · scroll-driven-animations.style · caniuse/Baseline · CodePen(⚠️ 펜별 라이선스 확인) · Awwwards(영감용).
CSS-Tricks "Grainy Gradients"(저자 Jimmy Chion) = feTurbulence 그레인 레시피의 정본.

---

## 이 프로젝트에 대한 추천

**지금 추가 (무료·저비용, data-driven registry에 신규 카테고리로 바로 붙음)**
1. **애니메이션 그라디언트** — `@property` + `conic-gradient` (의존성 0, 최고 레버리지) → `kind:"css"` 모델에 적합 *(→ 본 리포트 이후 구현: Conic Spin)*
2. **미사용 SVG 필터 프리미티브 확장** — feMorphology·feColorMatrix goo·feDropShadow·feComponentTransfer → `kind:"svg"` 파이프라인에 정의만 추가 *(→ 구현: Sticker/Gooey/Drop Shadow/Posterize)*
3. **css-doodle(MIT)** 패턴 카테고리, **Rough.js(MIT)** 손그림 프리셋

**고급(선택) — GPU 셰이더/이미지 왜곡**
- **Paper Shaders(Apache-2.0)** 또는 **Kampos(MIT)/curtains.js(MIT)**. Three/Babylon은 현시점 과함.

**참고·학습만**: Animate.css(번들 X), Animista(UX 모델), fffuel.co(copy-from), Codrops/MDN.

**회피·주의**: Trianglify(GPL, 코드 도입 시), Hover.css(상업 유료), Hero Patterns(CC-BY 표시), p5.js·Theatre studio(카피레프트), GSAP(무료지만 non-OSI·경쟁도구 제한), MagicPattern/Haikei/SVG Backgrounds(약관 조건부/미확인).

---

## 검증 출처 (주요)
각 GitHub 저장소의 LICENSE/package.json — three.js · pixijs · oframe/ogl · processing/p5.js · BabylonJS · pmndrs/postprocessing·react-three-fiber · regl · curtainsjs · paperjs · wix-incubator/kampos · paper-design/shaders · qrohlf/trianglify · animate-css · juliangarnier/anime · theatre-js · motiondivision/motion · formkit/auto-animate · css-doodle · rough-stuff/rough · g-harel/blobs · phamfoo/figma-squircle · svg/svgo — 및 GSAP·Haikei·Hero Patterns·fffuel.co·SVG Backgrounds 공식 약관.

**잔여 미확인**: blobs.app 최신성, SVG Backgrounds/Haikei/MagicPattern 출력 약관 정확 문구, two.js/Zdog SPDX(널리 MIT로 알려짐이나 미검증). 도입 전 재확인 권장.
