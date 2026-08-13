# SVG `feTurbulence` 정리

## 1. 개요

`<feTurbulence>`는 SVG Filter Primitive 중 하나로, **Perlin Noise 기반의 절차적 노이즈(Procedural Noise)** 를 생성한다.

쉽게 말하면 이미지 파일을 사용하지 않고 SVG 내부에서 다음과 같은 불규칙한 패턴을 만들어낼 수 있다.

- 구름
- 연기
- 종이 질감
- 물결
- 대리석
- 불꽃
- 먼지
- 노이즈 텍스처
- 화면 왜곡
- 글리치 효과

기본적으로 `feTurbulence` 자체는 화면의 요소를 변형하는 것이 아니라 **노이즈 이미지 하나를 생성하는 역할**을 한다.

따라서 실제 UI나 그래픽 효과에서는 보통 다음 필터와 함께 사용한다.

- `feDisplacementMap`
- `feColorMatrix`
- `feBlend`
- `feComposite`
- `feGaussianBlur`

---

# 2. 기본 사용법

가장 단순한 형태는 다음과 같다.

```svg
<svg width="400" height="300"
     xmlns="http://www.w3.org/2000/svg">

  <filter id="noise">
    <feTurbulence
      type="turbulence"
      baseFrequency="0.02"
      numOctaves="3"
      seed="1" />
  </filter>

  <rect
    width="400"
    height="300"
    filter="url(#noise)" />

</svg>
```

`rect` 자체가 표시되는 대신 `feTurbulence`가 만들어낸 노이즈가 필터 결과로 나타난다.

---

# 3. 주요 속성

`feTurbulence`에서 가장 중요한 속성은 다음과 같다.

| 속성 | 역할 |
|---|---|
| `type` | 노이즈 생성 방식 |
| `baseFrequency` | 노이즈 크기와 밀도 |
| `numOctaves` | 노이즈의 세부 단계 |
| `seed` | 랜덤 패턴의 초기값 |
| `stitchTiles` | 반복 타일의 경계 연결 여부 |

---

# 4. `type`

두 가지 값을 사용할 수 있다.

```svg
type="turbulence"
```

또는

```svg
type="fractalNoise"
```

## turbulence

```svg
<feTurbulence
  type="turbulence"
  baseFrequency="0.02" />
```

좀 더 강하고 뚜렷한 노이즈가 생성된다.

물결, 불꽃, 대리석 등의 효과에 적합하다.

## fractalNoise

```svg
<feTurbulence
  type="fractalNoise"
  baseFrequency="0.02" />
```

보다 부드럽고 자연스러운 노이즈를 생성한다.

다음과 같은 효과에 적합하다.

- 구름
- 안개
- 종이 질감
- 필름 그레인
- 자연스러운 표면 질감

---

# 5. `baseFrequency`

노이즈의 기본 주파수를 결정한다.

```svg
baseFrequency="0.01"
```

값이 작으면 패턴이 크고 부드럽다.

```text
0.005
0.01
0.02
```

값이 커질수록 패턴이 작고 촘촘해진다.

```text
0.05
0.1
0.2
```

예를 들어:

```svg
<feTurbulence baseFrequency="0.005" />
```

큰 구름 형태의 패턴이 만들어진다.

반대로:

```svg
<feTurbulence baseFrequency="0.2" />
```

매우 작은 입자의 노이즈가 만들어진다.

---

# 6. X/Y 주파수 분리

`baseFrequency`에는 두 개의 값을 지정할 수도 있다.

```svg
baseFrequency="0.01 0.1"
```

순서는 다음과 같다.

```text
X축 Y축
```

예:

```svg
<feTurbulence
  baseFrequency="0.01 0.1"
  numOctaves="2" />
```

이렇게 하면 한 방향으로 늘어난 패턴을 만들 수 있다.

다음과 같은 효과에서 유용하다.

- 바람
- 물결
- 나무결
- 흐르는 연기

---

# 7. `numOctaves`

노이즈를 몇 단계로 중첩할지를 지정한다.

```svg
numOctaves="1"
```

단순한 노이즈가 만들어진다.

```svg
numOctaves="5"
```

더 많은 세부 무늬가 추가된다.

일반적으로 다음 범위가 많이 사용된다.

```text
1 ~ 5
```

예:

```svg
<feTurbulence
  baseFrequency="0.02"
  numOctaves="1" />
```

단순한 패턴.

```svg
<feTurbulence
  baseFrequency="0.02"
  numOctaves="5" />
```

세밀한 패턴.

단, `numOctaves`가 커질수록 계산량이 증가한다.

---

# 8. `seed`

랜덤 노이즈 패턴의 초기값을 지정한다.

```svg
seed="1"
```

```svg
seed="2"
```

같은 설정이라도 `seed` 값을 바꾸면 전혀 다른 패턴이 생성된다.

예:

```svg
<feTurbulence
  baseFrequency="0.03"
  numOctaves="3"
  seed="42" />
```

절차적 생성 콘텐츠에서 매우 유용하다.

예를 들어 카드마다 서로 다른 질감을 만들고 싶다면:

```text
seed = itemId
```

같은 방식으로 사용할 수 있다.

---

# 9. `stitchTiles`

패턴을 반복할 때 경계가 자연스럽게 연결되도록 할지 지정한다.

```svg
stitchTiles="stitch"
```

또는

```svg
stitchTiles="noStitch"
```

반복 배경이나 seamless texture를 만들 경우:

```svg
<feTurbulence
  baseFrequency="0.05"
  numOctaves="3"
  stitchTiles="stitch" />
```

형태를 사용할 수 있다.

---

# 10. 가장 중요한 활용법: `feDisplacementMap`

`feTurbulence`의 대표적인 용도는 화면 왜곡이다.

구조는 다음과 같다.

```text
원본 이미지
      │
      ├───────────────┐
      │               │
      │        feTurbulence
      │               │
      └── feDisplacementMap
                │
                ▼
          왜곡된 이미지
```

예:

```svg
<svg width="500" height="200"
     xmlns="http://www.w3.org/2000/svg">

  <defs>
    <filter id="distortion">

      <feTurbulence
        type="turbulence"
        baseFrequency="0.02"
        numOctaves="3"
        seed="2"
        result="noise" />

      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale="30"
        xChannelSelector="R"
        yChannelSelector="G" />

    </filter>
  </defs>

  <text
    x="30"
    y="120"
    font-size="80"
    filter="url(#distortion)">
    TURBULENCE
  </text>

</svg>
```

`feTurbulence`가 만든 RGB 값을 좌표 이동 값으로 사용하는 방식이다.

---

# 11. `scale`

`feDisplacementMap`에서 효과의 강도는 주로 `scale`이 결정한다.

```svg
scale="5"
```

약한 왜곡.

```svg
scale="20"
```

중간 왜곡.

```svg
scale="100"
```

매우 강한 왜곡.

따라서 다음 조합을 자주 사용한다.

```svg
<feTurbulence
  baseFrequency="0.02"
  numOctaves="3"
  result="noise" />

<feDisplacementMap
  in="SourceGraphic"
  in2="noise"
  scale="20" />
```

---

# 12. 물결 효과

```svg
<filter id="water">

  <feTurbulence
    type="turbulence"
    baseFrequency="0.01 0.05"
    numOctaves="2"
    seed="3"
    result="noise" />

  <feDisplacementMap
    in="SourceGraphic"
    in2="noise"
    scale="20"
    xChannelSelector="R"
    yChannelSelector="G" />

</filter>
```

X와 Y의 frequency를 다르게 지정하면 물결처럼 한 방향성이 있는 왜곡을 만들기 쉽다.

---

# 13. 연기 / 구름 효과

```svg
<filter id="cloud">

  <feTurbulence
    type="fractalNoise"
    baseFrequency="0.01"
    numOctaves="4"
    seed="5"
    result="noise" />

  <feGaussianBlur
    in="noise"
    stdDeviation="3" />

</filter>
```

`fractalNoise`에 blur를 조합하면 구름이나 안개 같은 효과를 만들 수 있다.

---

# 14. 종이 질감

```svg
<filter id="paper">

  <feTurbulence
    type="fractalNoise"
    baseFrequency="0.8"
    numOctaves="3"
    seed="10"
    result="noise" />

  <feBlend
    in="SourceGraphic"
    in2="noise"
    mode="multiply" />

</filter>
```

`baseFrequency`를 높이면 작은 입자가 만들어져 종이 질감이나 필름 노이즈 표현에 적합하다.

---

# 15. Rough Edge 효과

SVG 도형의 가장자리를 손으로 그린 것처럼 만들 수도 있다.

```svg
<filter id="rough">

  <feTurbulence
    type="fractalNoise"
    baseFrequency="0.03"
    numOctaves="3"
    result="noise" />

  <feDisplacementMap
    in="SourceGraphic"
    in2="noise"
    scale="8" />

</filter>
```

예:

```svg
<rect
  x="50"
  y="50"
  width="300"
  height="120"
  rx="20"
  filter="url(#rough)" />
```

웹 디자인에서 다음과 같은 스타일에 사용할 수 있다.

- 스티커
- 포스트잇
- 손으로 그린 카드
- 빈티지 UI
- 종이 광고

---

# 16. 애니메이션

`baseFrequency`를 움직이면 노이즈를 애니메이션할 수 있다.

```svg
<feTurbulence
  type="turbulence"
  baseFrequency="0.01"
  numOctaves="3">

  <animate
    attributeName="baseFrequency"
    values="0.01;0.03;0.01"
    dur="4s"
    repeatCount="indefinite" />

</feTurbulence>
```

다음과 같은 효과를 만들 수 있다.

- 움직이는 물
- 연기
- 열기
- 에너지
- 액체
- 홀로그램

---

# 17. CSS와 함께 사용하기

SVG filter는 HTML 요소에도 적용할 수 있다.

```html
<svg width="0" height="0">
  <filter id="noise">
    <feTurbulence
      baseFrequency="0.02"
      numOctaves="3"
      result="noise" />

    <feDisplacementMap
      in="SourceGraphic"
      in2="noise"
      scale="15" />
  </filter>
</svg>
```

CSS:

```css
.card {
  filter: url(#noise);
}
```

따라서 일반 HTML UI에도 사용할 수 있다.

```html
<div class="card">
  Advertisement
</div>
```

---

# 18. 추천 파라미터

## 미세한 노이즈

```svg
<feTurbulence
  type="fractalNoise"
  baseFrequency="0.6"
  numOctaves="2"
  seed="3" />
```

용도:

- 종이
- 필름 그레인
- UI texture

---

## 구름

```svg
<feTurbulence
  type="fractalNoise"
  baseFrequency="0.01"
  numOctaves="4"
  seed="5" />
```

---

## 물결

```svg
<feTurbulence
  type="turbulence"
  baseFrequency="0.01 0.05"
  numOctaves="2"
  seed="3" />
```

---

## 거친 가장자리

```svg
<feTurbulence
  type="fractalNoise"
  baseFrequency="0.03"
  numOctaves="3"
  seed="2" />
```

그리고:

```svg
<feDisplacementMap
  scale="5" />
```

---

## 강한 액체 왜곡

```svg
<feTurbulence
  type="turbulence"
  baseFrequency="0.015"
  numOctaves="4" />
```

```svg
<feDisplacementMap
  scale="50" />
```

---

# 19. 파라미터 관계

효과를 튜닝할 때는 다음처럼 생각하면 쉽다.

```text
baseFrequency
     ↓
패턴 크기

numOctaves
     ↓
패턴 디테일

seed
     ↓
패턴 형태

feDisplacementMap.scale
     ↓
왜곡 강도
```

특히 화면 왜곡 효과에서는:

```text
feTurbulence
    │
    │ noise 생성
    ▼
feDisplacementMap
    │
    │ noise → 좌표 이동
    ▼
SourceGraphic 변형
```

이라는 구조를 이해하는 것이 중요하다.

---

# 20. 성능 고려 사항

`feTurbulence`는 GPU/브라우저에서 비교적 비용이 높은 효과가 될 수 있다.

특히 다음 조건에서는 주의해야 한다.

```text
큰 화면
+
높은 numOctaves
+
애니메이션
+
높은 해상도
```

따라서 일반 UI에서는 가능한 한:

```text
numOctaves = 1 ~ 3
```

정도를 먼저 고려하는 것이 좋다.

전체 화면에서 지속적으로 `baseFrequency`를 애니메이션하면 저사양 기기나 모바일 환경에서 렌더링 비용이 커질 수 있다.

---

# 21. 실무에서 많이 사용하는 구조

실제 사용에서는 다음 패턴이 가장 중요하다.

```svg
<filter id="effect">

  <!-- 1. 노이즈 생성 -->
  <feTurbulence
    type="fractalNoise"
    baseFrequency="0.02"
    numOctaves="3"
    seed="1"
    result="noise" />

  <!-- 2. 노이즈를 좌표 변형에 사용 -->
  <feDisplacementMap
    in="SourceGraphic"
    in2="noise"
    scale="15"
    xChannelSelector="R"
    yChannelSelector="G" />

</filter>
```

즉:

```text
feTurbulence
     +
feDisplacementMap
```

조합을 가장 먼저 익히는 것이 좋다.

---

# 22. 핵심 정리

`feTurbulence`는 SVG에서 절차적 노이즈를 생성하는 필터다.

가장 중요한 속성은 다음과 같다.

| 속성 | 의미 |
|---|---|
| `type` | turbulence / fractalNoise |
| `baseFrequency` | 노이즈 크기 |
| `numOctaves` | 세부 정도 |
| `seed` | 패턴 변경 |
| `stitchTiles` | 타일 연결 |

그리고 실제 효과에서는 대부분:

```text
feTurbulence
        ↓
   Noise Map
        ↓
feDisplacementMap
        ↓
    Distortion
```

형태로 활용한다.

특히 **웹사이트의 광고 카드나 지면 UI에 `feTurbulence + feDisplacementMap`을 적용하면 종이 질감, 인쇄 불량, 오래된 신문, 스티커, 물결치는 광고 등의 효과를 이미지 리소스 없이 SVG만으로 구현할 수 있다.**