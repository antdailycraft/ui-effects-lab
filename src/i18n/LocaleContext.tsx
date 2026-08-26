import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Locale = "en" | "ko";

const STORAGE_KEY = "ui-effects-lab:locale";

const ko = {
  language: "언어",
  switchToKorean: "한국어로 전환",
  switchToEnglish: "영어로 전환",
  backToLanding: "시작 화면으로 돌아가기",
  gallery: "갤러리",
  reference: "참고자료",
  resources: "리소스",
  toggleTheme: "테마 전환",
  githubRepository: "GitHub 저장소",
  viewSourceGithub: "GitHub에서 소스 보기",
  searchPlaceholder: "효과, 태그, 기술 검색…",
  searchEffects: "효과 검색",
  favorites: "즐겨찾기",
  noEffects: "‘{term}’에 맞는 효과가 없습니다.",
  controls: "조절",
  editingLayer: "레이어 {number} 편집 중:",
  done: "완료",
  animate: "애니메이션",
  reducedMotion: "시스템의 동작 줄이기 설정에 따라 애니메이션을 일시 정지했습니다.",
  randomize: "무작위",
  reset: "초기화",
  parametersPrimitives: "매개변수 {parameters}개 · 구성 요소 {primitives}개",
  linkCopied: "링크 복사됨",
  share: "공유",
  copied: "복사됨",
  copy: "복사",
  copyCode: "코드 복사",
  expand: "펼치기",
  expandCode: "코드 펼치기",
  fullCode: "전체 코드",
  close: "닫기",
  openLab: "실험실 열기 →",
  viewSource: "소스 보기",
  liveEffects: "SVG · CSS · WebGL — 실시간 효과 {count}개",
  heroTitleA: "탐색하고. 조절하고.",
  heroTitleB: "비교하고. 복사하세요.",
  heroExplore: "탐색하고.",
  heroTweak: "조절하고.",
  heroCompare: "비교하고.",
  heroCopy: "복사하세요.",
  heroDescription: "시각 효과를 직접 실험하는 플레이그라운드입니다. 실제 UI에서 효과를 조절하고, 전후를 비교한 뒤 SVG·CSS·React 코드를 복사하세요.",
  effectGallery: "효과 갤러리",
  openEffect: "{name} 열기",
  explore: "탐색",
  exploreDesc: "SVG 필터, CSS, 레트로, WebGL 효과 50가지를 둘러보세요.",
  tweak: "조절",
  tweakDesc: "매개변수를 실시간으로 바꾸고 무작위 값이나 기본 프리셋을 불러오세요.",
  compare: "비교",
  compareDesc: "실제 컴포넌트에서 분할 화면이나 슬라이더로 전후를 비교하세요.",
  copyStep: "복사",
  copyStepDesc: "생성된 SVG·CSS·React 코드를 가져오거나 링크로 공유하세요.",
  tools: "도구",
  inspiration: "영감",
  components: "컴포넌트",
  libraries: "라이브러리",
  learn: "학습",
  colorsThemes: "색상과 테마",
  assets: "에셋",
  presets: "프리셋",
  builtIn: "기본 제공",
  presetName: "프리셋 이름…",
  presetNameLabel: "프리셋 이름",
  save: "저장",
  noPresets: "이 효과의 프리셋이 아직 없습니다. 값을 조절한 뒤 저장하세요.",
  generator: "생성기",
  preview: "미리보기",
  compareLabel: "비교",
  off: "끄기",
  split: "분할",
  slider: "슬라이더",
  before: "적용 전",
  after: "적용 후",
  loadingShader: "셰이더 불러오는 중…",
  previewHint: "슬라이더를 움직여 효과를 실시간으로 조절하세요",
  enterFullscreen: "전체 화면으로 보기",
  exitFullscreen: "전체 화면 나가기",
} as const;

export type MessageKey = keyof typeof ko;
type Params = Record<string, string | number>;

function initialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "en" || saved === "ko") return saved;
  return window.navigator.language.toLowerCase().startsWith("ko") ? "ko" : "en";
}

function format(template: string, params?: Params) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(params?.[key] ?? `{${key}}`));
}

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey, fallback: string, params?: Params) => string;
}>({ locale: "en", setLocale: () => {}, t: (_key, fallback, params) => format(fallback, params) });

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: (key: MessageKey, fallback: string, params?: Params) =>
        format(locale === "ko" ? ko[key] : fallback, params),
    }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function localizedGroupLabel(label: string, locale: Locale) {
  if (locale !== "ko") return label;
  return ({
    Tools: ko.tools,
    Inspiration: ko.inspiration,
    Components: ko.components,
    Libraries: ko.libraries,
    Learn: ko.learn,
    "Colors & Themes": ko.colorsThemes,
    Assets: ko.assets,
  } as Record<string, string>)[label] ?? label;
}
