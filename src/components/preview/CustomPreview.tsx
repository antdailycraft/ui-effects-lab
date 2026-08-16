import type { CSSProperties } from "react";
import { usePlayground } from "../../state/PlaygroundContext";
import { sanitizeHtml } from "../../lib/sanitizeHtml";

export function CustomPreview({ className, style }: { className?: string; style?: CSSProperties }) {
  const { state } = usePlayground();
  return (
    <div
      className={"pv pv-custom" + (className ? " " + className : "")}
      style={style}
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(state.customHtml) }}
    />
  );
}
