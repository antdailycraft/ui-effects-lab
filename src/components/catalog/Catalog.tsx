import { usePlayground } from "../../state/PlaygroundContext";
import { EFFECTS, groupByCategory } from "../../registry/effects";
import { SearchBox } from "./SearchBox";
import { EffectItem } from "./EffectItem";

// Effects not yet implemented, shown as disabled "Coming soon" rows.
// All previously-listed placeholders are now real effects in the registry.
const PLACEHOLDERS: Record<string, string[]> = {};

export function Catalog() {
  const { state } = usePlayground();
  const term = state.search.trim().toLowerCase();
  const match = (text: string) => !term || text.toLowerCase().includes(term);

  const filtered = EFFECTS.filter((e) =>
    match(`${e.name} ${e.tags.join(" ")} ${e.tech.join(" ")}`)
  );
  const groups = groupByCategory(filtered);

  const placeholderGroups = Object.entries(PLACEHOLDERS)
    .map(([label, items]) => ({ label, items: items.filter(match) }))
    .filter((g) => g.items.length > 0);

  const empty = groups.length === 0 && placeholderGroups.length === 0;

  return (
    <aside className="col col-left">
      <SearchBox />
      <nav className="catalog">
        {groups.map((g) => (
          <div className="cat-group" key={g.label}>
            <div className="cat-label">{g.label}</div>
            {g.effects.map((e) => (
              <EffectItem effect={e} key={e.id} />
            ))}
          </div>
        ))}
        {placeholderGroups.map((g) => (
          <div className="cat-group" key={g.label}>
            <div className="cat-label">{g.label}</div>
            {g.items.map((name) => (
              <button
                className="effect-item"
                style={{ opacity: 0.5, cursor: "not-allowed" }}
                disabled
                key={name}
              >
                <span className="effect-dot" />
                <span className="effect-meta">
                  <div className="effect-name">{name}</div>
                  <div className="effect-sub">Coming soon</div>
                </span>
              </button>
            ))}
          </div>
        ))}
        {empty && <div className="catalog-empty">No effects match “{term}”.</div>}
      </nav>
    </aside>
  );
}
