import { useState } from "react";

export function CopyButton({ code }: { code: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setDone(true);
      setTimeout(() => setDone(false), 1200);
    } catch {
      /* clipboard blocked */
    }
  };
  return (
    <button className={"code-copy" + (done ? " done" : "")} onClick={copy}>
      <svg className="i i-sm" viewBox="0 0 24 24">
        <rect x="9" y="9" width="12" height="12" rx="2" />
        <path d="M5 15V5a2 2 0 0 1 2-2h10" />
      </svg>
      {done ? "Copied" : "Copy"}
    </button>
  );
}
