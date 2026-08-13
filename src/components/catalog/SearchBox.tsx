import { usePlayground } from "../../state/PlaygroundContext";

export function SearchBox() {
  const { state, dispatch } = usePlayground();
  return (
    <div className="search-wrap">
      <div className="search">
        <svg className="i i-sm" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          placeholder="Search effects, tags, tech…"
          value={state.search}
          aria-label="Search effects"
          onChange={(e) => dispatch({ type: "SET_SEARCH", value: e.target.value })}
        />
      </div>
    </div>
  );
}
