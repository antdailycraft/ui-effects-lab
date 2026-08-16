import { usePlayground } from "../../state/PlaygroundContext";
import { DEFAULT_CUSTOM_HTML } from "../../lib/storage";

export function CustomHtmlBar() {
  const { state, dispatch } = usePlayground();
  return (
    <div className="custom-bar">
      <div className="custom-bar-head">
        <span className="custom-bar-label">Custom markup</span>
        <button
          className="custom-bar-reset"
          onClick={() => dispatch({ type: "SET_CUSTOM_HTML", html: DEFAULT_CUSTOM_HTML })}
        >
          Reset
        </button>
      </div>
      <textarea
        className="custom-textarea mono"
        aria-label="Custom HTML markup"
        spellCheck={false}
        value={state.customHtml}
        onChange={(e) => dispatch({ type: "SET_CUSTOM_HTML", html: e.target.value })}
        placeholder="<div>Your HTML…</div>"
      />
    </div>
  );
}
