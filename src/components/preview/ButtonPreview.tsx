import type { CSSProperties } from "react";

export function ButtonPreview({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={"pv pv-button" + (className ? " " + className : "")} style={style}>
      <button className="btn btn-primary" type="button">
        Get started →
      </button>
      <button className="btn btn-ghost" type="button">
        Read the docs
      </button>
    </div>
  );
}
