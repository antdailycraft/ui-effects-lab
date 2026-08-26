import { useMemo } from "react";
import { usePlayground } from "../../state/PlaygroundContext";
import { EFFECTS, groupByCategory } from "../../registry/effects";
import { useFavorites } from "../../hooks/useFavorites";
import { SearchBox } from "./SearchBox";
import { EffectItem } from "./EffectItem";
import { useLocale } from "../../i18n/LocaleContext";

export function Catalog() {
  const { locale, t } = useLocale();
  const { state } = usePlayground();
  const { favorites: favoriteIds, isFavorite, toggle } = useFavorites();
  const term = state.search.trim().toLowerCase();

  // The filter/group work only depends on the search term — memoize it so a
  // slider drag (which changes unrelated context state) doesn't recompute it.
  const { groups, favorites } = useMemo(() => {
    const filtered = EFFECTS.filter((e) =>
      `${e.name} ${e.tags.join(" ")} ${e.tech.join(" ")}`.toLowerCase().includes(term)
    );
    return {
      groups: groupByCategory(filtered),
      favorites: filtered.filter((e) => favoriteIds.includes(e.id)),
    };
  }, [term, favoriteIds]);

  const empty = groups.length === 0;

  return (
    <aside className="col col-left">
      <SearchBox />
      <nav className="catalog">
        {favorites.length > 0 && (
          <div className="cat-group" key="__favorites">
            <div className="cat-label">★ {t("favorites", "Favorites")}</div>
            {favorites.map((e) => (
              <EffectItem
                effect={e}
                key={"fav-" + e.id}
                favorite
                onToggleFavorite={toggle}
              />
            ))}
          </div>
        )}
        {groups.map((g) => (
          <div className="cat-group" key={g.label}>
            <div className="cat-label">{locale === "ko" ? ({ "SVG Filters": "SVG 필터", "CSS Effects": "CSS 효과", "Retro": "레트로", "Experimental WebGL": "실험적 WebGL" } as Record<string, string>)[g.label] ?? g.label : g.label}</div>
            {g.effects.map((e) => (
              <EffectItem effect={e} key={e.id} favorite={isFavorite(e.id)} onToggleFavorite={toggle} />
            ))}
          </div>
        ))}
        {empty && <div className="catalog-empty">{t("noEffects", "No effects match “{term}”.", { term })}</div>}
      </nav>
    </aside>
  );
}
