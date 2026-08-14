import type { CSSProperties } from "react";

export function TextPreview({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={"pv pv-text" + (className ? " " + className : "")} style={style}>
      Turbulence
    </div>
  );
}
