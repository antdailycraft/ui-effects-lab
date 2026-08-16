import { usePlayground } from "../../state/PlaygroundContext";
import { ResourcesMenu } from "./ResourcesMenu";
import { ReferenceMenu } from "../reference/ReferenceMenu";

function MoonIcon() {
  return (
    <svg className="i" viewBox="0 0 24 24">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg className="i" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function TopBar() {
  const { state, dispatch } = usePlayground();
  const next = state.theme === "dark" ? "light" : "dark";
  return (
    <header className="topbar" role="banner">
      <h1 className="sr-only">UI Effects Lab</h1>
      <div className="brand">
        <span className="brand-mark">
          <svg className="i i-sm" viewBox="0 0 24 24">
            <path d="M4 16c2-6 4-9 8-9s6 3 8 9" />
            <path d="M4 8c2 3 4 4 8 4s6-1 8-4" />
          </svg>
        </span>
        <span className="brand-name">
          UI Effects <span>Lab</span>
        </span>
      </div>
      <span className="brand-tag">MVP</span>
      <div className="topbar-spacer" />
      <ReferenceMenu />
      <ResourcesMenu />
      <button
        className="icon-btn"
        aria-label="Toggle theme"
        onClick={() => dispatch({ type: "SET_THEME", theme: next })}
      >
        {state.theme === "dark" ? <MoonIcon /> : <SunIcon />}
      </button>
      <a
        className="icon-btn"
        href="https://github.com/antdailycraft/ui-effects-lab"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="GitHub repository"
        title="View source on GitHub"
      >
        <svg className="i" viewBox="0 0 24 24">
          <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
        </svg>
      </a>
    </header>
  );
}
