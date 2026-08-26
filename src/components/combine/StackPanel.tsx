import { usePlayground } from "../../state/PlaygroundContext";
import { getEffect } from "../../registry/effects";
import { isStackable, MAX_LAYERS } from "../../lib/combine";
import { useLocale } from "../../i18n/LocaleContext";

export function StackPanel() {
  const { locale } = useLocale();
  const { state, dispatch } = usePlayground();
  const active = getEffect(state.effectId)!;
  const stackable = isStackable(active);
  const layers = state.layers;
  const atCap = layers.length >= MAX_LAYERS;
  const canAdd = stackable && !atCap;
  const dormant = layers.length > 0 && !stackable;

  return (
    <>
      <div className="panel-head">
        <h2>{locale === "ko" ? "결합" : "Combine"}</h2>
        {layers.length > 0 && (
          <button className="stack-clear" onClick={() => dispatch({ type: "CLEAR_LAYERS" })}>
            {locale === "ko" ? "비우기" : "Clear"}
          </button>
        )}
      </div>
      <div className="stack">
        <button
          className="stack-add"
          disabled={!canAdd}
          title={
            atCap
              ? locale === "ko" ? `스택이 가득 찼습니다(최대 ${MAX_LAYERS}개)` : `Stack is full (max ${MAX_LAYERS})`
              : stackable
                ? locale === "ko" ? "현재 효과를 레이어로 추가" : "Add the current effect as a layer"
                : locale === "ko" ? "SVG 필터 효과만 결합할 수 있습니다" : "Only SVG-filter effects can be combined"
          }
          onClick={() => dispatch({ type: "ADD_LAYER" })}
        >
          {locale === "ko" ? `+ ‘${active.name}’ 효과를 스택에 추가` : `+ Add “${active.name}” to stack`}
        </button>

        {dormant && (
          <div className="stack-note">
            {locale === "ko" ? `스택이 일시 정지되었습니다. ‘${active.name}’은 SVG 필터가 아닙니다. 결합하려면 SVG 효과로 바꾸세요.` : `Stack is paused — “${active.name}” isn’t an SVG filter. Switch to an SVG effect to combine.`}
          </div>
        )}
        {atCap && (
          <div className="stack-note">{locale === "ko" ? `레이어는 최대 ${MAX_LAYERS}개입니다. 새로 추가하려면 하나를 제거하세요.` : `Maximum ${MAX_LAYERS} layers — remove one to add another.`}</div>
        )}

        {layers.length === 0 ? (
          <div className="stack-empty">
            {locale === "ko" ? "SVG 필터 효과를 순서대로 연결하세요. 현재 효과를 추가하고 다른 효과를 골라 다시 추가하면 됩니다." : "Chain SVG-filter effects: add the current one, pick another, add again — they apply in order."}
          </div>
        ) : (
          <ol className="stack-list">
            {layers.map((layer, i) => {
              const eff = getEffect(layer.effectId);
              const isEditing = state.editingLayer === i;
              return (
                <li className={"stack-item" + (isEditing ? " editing" : "")} key={i}>
                  <span className="stack-idx">{i + 1}</span>
                  <button
                    className="stack-name"
                    title={isEditing ? (locale === "ko" ? "이 레이어 편집 끝내기" : "Stop editing this layer") : (locale === "ko" ? "이 레이어의 매개변수 편집" : "Edit this layer's parameters")}
                    onClick={() =>
                      dispatch({ type: "SET_EDITING_LAYER", index: isEditing ? null : i })
                    }
                  >
                    {eff?.name ?? layer.effectId}
                  </button>
                  <span className="stack-actions">
                    <button
                      aria-label={locale === "ko" ? `${eff?.name ?? "레이어"} 위로 이동` : `Move ${eff?.name ?? "layer"} up`}
                      disabled={i === 0}
                      onClick={() => dispatch({ type: "MOVE_LAYER", index: i, dir: -1 })}
                    >
                      ↑
                    </button>
                    <button
                      aria-label={locale === "ko" ? `${eff?.name ?? "레이어"} 아래로 이동` : `Move ${eff?.name ?? "layer"} down`}
                      disabled={i === layers.length - 1}
                      onClick={() => dispatch({ type: "MOVE_LAYER", index: i, dir: 1 })}
                    >
                      ↓
                    </button>
                    <button
                      className="stack-del"
                      aria-label={locale === "ko" ? `${eff?.name ?? "레이어"} 제거` : `Remove ${eff?.name ?? "layer"}`}
                      onClick={() => dispatch({ type: "REMOVE_LAYER", index: i })}
                    >
                      ✕
                    </button>
                  </span>
                </li>
              );
            })}
          </ol>
        )}

        {layers.length >= 3 && (
          <div className="stack-note">
            {locale === "ko" ? "긴 필터 체인은 GPU 부하가 큽니다. 부드러운 애니메이션을 위해 짧게 유지하세요." : "Long filter chains are GPU-heavy — keep it short for smooth animation."}
          </div>
        )}
      </div>
    </>
  );
}
