/** A monochrome SVG that depicts each CSS cursor's shape, so it's visible at rest. */

// Single-headed arrow pointing right (rotated for n/e/s/w-resize).
const SINGLE = (
  <>
    <path d="M4 12h12" />
    <path d="M12 7l5 5-5 5" />
  </>
);
// Double-headed arrow (rotated for ew/ns/diagonal-resize).
const DOUBLE = (
  <>
    <path d="M4 12h16" />
    <path d="M8 8l-4 4 4 4" />
    <path d="M16 8l4 4-4 4" />
  </>
);
const SINGLE_ROT: Record<string, number> = {
  "e-resize": 0,
  "s-resize": 90,
  "w-resize": 180,
  "n-resize": -90,
};
const DOUBLE_ROT: Record<string, number> = {
  "ew-resize": 0,
  "ns-resize": 90,
  "nwse-resize": 45,
  "nesw-resize": -45,
};

// Small top-left arrow used by the compound cursors (copy/alias/context-menu).
const ARROW_TL = (
  <path
    d="M4 3 L4 14 L7 11 L9 15.6 L10.7 14.8 L8.7 10.3 L12.6 10.3 Z"
    fill="currentColor"
    stroke="none"
  />
);

function inner(value: string): { body: JSX.Element; rotate?: number; filled?: boolean } {
  if (value in SINGLE_ROT) return { body: SINGLE, rotate: SINGLE_ROT[value] };
  if (value in DOUBLE_ROT) return { body: DOUBLE, rotate: DOUBLE_ROT[value] };

  switch (value) {
    case "col-resize":
      return {
        body: (
          <>
            {DOUBLE}
            <path d="M12 4v16" />
          </>
        ),
      };
    case "row-resize":
      return {
        body: (
          <>
            <g transform="rotate(90 12 12)">{DOUBLE}</g>
            <path d="M4 12h16" />
          </>
        ),
      };
    case "move":
    case "all-scroll":
      return {
        body: (
          <>
            <path d="M12 2v20M2 12h20" />
            <path d="M9 5l3-3 3 3M9 19l3 3 3-3M5 9l-3 3 3 3M19 9l3 3-3 3" />
            {value === "all-scroll" && <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />}
          </>
        ),
      };
    case "pointer":
      return {
        body: (
          <>
            <path d="M22 14a8 8 0 0 1-8 8" />
            <path d="M18 11v-1a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
            <path d="M14 10V9a2 2 0 0 0-2-2 2 2 0 0 0-2 2v1" />
            <path d="M10 9.5V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v10" />
            <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
          </>
        ),
      };
    case "grab":
    case "grabbing":
      return {
        body: (
          <>
            <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
            <path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2" />
            <path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8" />
            <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
          </>
        ),
      };
    case "text":
      return { body: <path d="M9 4h6M9 20h6M12 4v16" /> };
    case "vertical-text":
      return { body: <path d="M4 9v6M20 9v6M4 12h16" /> };
    case "crosshair":
      return { body: <path d="M12 2v20M2 12h20" /> };
    case "cell":
      return {
        body: (
          <>
            <rect x="3" y="3" width="18" height="18" rx="1.5" />
            <path d="M12 7v10M7 12h10" />
          </>
        ),
      };
    case "not-allowed":
    case "no-drop":
      return {
        body: (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M5.6 5.6l12.8 12.8" />
          </>
        ),
      };
    case "none":
      return {
        body: (
          <>
            <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
            <path d="M5.6 5.6l12.8 12.8" />
          </>
        ),
      };
    case "wait":
    case "progress":
      return {
        body: (
          <>
            <path d="M6 3h12M6 21h12" />
            <path d="M17 3v3.6l-5 5.4-5-5.4V3" />
            <path d="M17 21v-3.6l-5-5.4-5 5.4V21" />
          </>
        ),
      };
    case "help":
      return {
        body: (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M9.2 9.2a3 3 0 0 1 5.7 1c0 2-3 2.6-3 3.8" />
            <circle cx="12" cy="17.3" r="0.7" fill="currentColor" stroke="none" />
          </>
        ),
      };
    case "zoom-in":
      return {
        body: (
          <>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
            <path d="M11 8v6M8 11h6" />
          </>
        ),
      };
    case "zoom-out":
      return {
        body: (
          <>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
            <path d="M8 11h6" />
          </>
        ),
      };
    case "copy":
      return {
        body: (
          <>
            {ARROW_TL}
            <rect x="13" y="13" width="8" height="8" rx="1.6" />
            <path d="M17 15v4M15 17h4" />
          </>
        ),
      };
    case "alias":
      return {
        body: (
          <>
            {ARROW_TL}
            <path d="M13.5 21c3.6 0 6.5-2.9 6.5-6.5" />
            <path d="M17 12.5l3 2-1.4 3.2" />
          </>
        ),
      };
    case "context-menu":
      return {
        body: (
          <>
            {ARROW_TL}
            <rect x="13" y="13" width="8" height="7" rx="1" />
            <path d="M15 15.6h4M15 17.6h4" />
          </>
        ),
      };
    default:
      // default arrow (classic cursor)
      return {
        filled: true,
        body: <path d="M5 3 L5 18 L9.2 14 L11.6 19.2 L13.6 18.3 L11.2 13.2 L16 13 Z" />,
      };
  }
}

export function CursorGlyph({ value }: { value: string }) {
  const { body, rotate, filled } = inner(value);
  const paint = filled
    ? { fill: "currentColor", stroke: "none" }
    : ({
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.7,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
      });
  return (
    <svg className="cursor-glyph" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" {...paint}>
      {rotate ? <g transform={`rotate(${rotate} 12 12)`}>{body}</g> : body}
    </svg>
  );
}
