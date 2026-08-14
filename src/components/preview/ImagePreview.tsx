import type { CSSProperties } from "react";

export function ImagePreview({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={"pv pv-image" + (className ? " " + className : "")} style={style}>
      <div className="grain-lines" />
      <div className="tag">Cover / Poster</div>
      <div className="big">Nightfall</div>
      <div className="sub">Sample artwork · displacement target</div>
    </div>
  );
}
