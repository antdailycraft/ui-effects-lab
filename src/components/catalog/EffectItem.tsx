import type { EffectDefinition } from "../../types/effects";
import { usePlayground } from "../../state/PlaygroundContext";
import { saveLastEffectId } from "../../lib/storage";

export function EffectItem({
  effect,
  favorite,
  onToggleFavorite,
}: {
  effect: EffectDefinition;
  favorite: boolean;
  onToggleFavorite: (id: string) => void;
}) {
  const { state, dispatch } = usePlayground();
  const active = effect.id === state.effectId;
  return (
    <div className="effect-item-row">
      <button
        className={"effect-item" + (active ? " active" : "")}
        onClick={() => {
          dispatch({ type: "SELECT_EFFECT", id: effect.id });
          saveLastEffectId(effect.id);
        }}
      >
        <span className="effect-dot" />
        <span className="effect-meta">
          <div className="effect-name">{effect.name}</div>
          <div className="effect-sub">{effect.sub}</div>
        </span>
      </button>
      <button
        className={"effect-fav" + (favorite ? " on" : "")}
        aria-label={favorite ? `Unfavorite ${effect.name}` : `Favorite ${effect.name}`}
        aria-pressed={favorite}
        title={favorite ? "Remove from favorites" : "Add to favorites"}
        onClick={() => onToggleFavorite(effect.id)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5z" />
        </svg>
      </button>
    </div>
  );
}
