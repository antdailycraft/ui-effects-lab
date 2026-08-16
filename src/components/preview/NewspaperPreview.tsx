import type { CSSProperties } from "react";

export function NewspaperPreview({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={"pv pv-newspaper" + (className ? " " + className : "")} style={style}>
      <div className="masthead">The Daily Turbulence</div>
      <div className="dateline">
        <span>Vol. XCII — No. 128</span>
        <span>Harbor City, Monday</span>
        <span>25¢</span>
      </div>
      <h2 className="headline">Filters Reshape the Front Page</h2>
      <div className="subhead">
        How noise, displacement, and grain quietly redraw everyday layouts
      </div>
      <div className="cols">
        <p className="drop">
          Down at the pier the presses still run each dawn, ink pooling into the same broadsheet
          columns readers have trusted for a century of ordinary mornings.
        </p>
        <p>
          Editors say the format survives because it forces a hierarchy — a masthead, a lead, and
          the quiet rows of type beneath that carry the day's smaller truths.
        </p>
        <p>
          Whether crisp or weathered, the page remains a proving ground: if an effect reads here,
          among rules and gutters and justified text, it will read anywhere.
        </p>
      </div>
    </div>
  );
}
