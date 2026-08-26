import { useLocale } from "../../i18n/LocaleContext";

export function LanguageToggle({ landing = false }: { landing?: boolean }) {
  const { locale, setLocale, t } = useLocale();
  const next = locale === "en" ? "ko" : "en";
  const label = next === "ko"
    ? t("switchToKorean", "Switch to Korean")
    : t("switchToEnglish", "영어로 전환");

  return (
    <button
      className={landing ? "lp-language" : "language-toggle"}
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setLocale(next)}
    >
      <span aria-hidden="true">{locale === "ko" ? "KO" : "EN"}</span>
    </button>
  );
}
