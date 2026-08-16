import { usePlayground } from "../../state/PlaygroundContext";
import { SAMPLE_IMAGES } from "../../lib/sampleImage";

export function ImagePicker() {
  const { state, dispatch } = usePlayground();
  return (
    <div className="img-picker">
      <span className="img-picker-label">Source</span>
      <div className="img-samples">
        {SAMPLE_IMAGES.map((s) => (
          <button
            key={s.name}
            className={"img-sample" + (state.imageUrl === s.url ? " on" : "")}
            style={{ backgroundImage: s.url ? `url(${s.url})` : undefined }}
            aria-label={`Sample image ${s.name}`}
            aria-pressed={state.imageUrl === s.url}
            title={s.name}
            onClick={() => dispatch({ type: "SET_IMAGE", url: s.url })}
          />
        ))}
      </div>
      <input
        className="img-url"
        type="text"
        placeholder="…or paste an image URL, press Enter"
        aria-label="Image URL"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const v = (e.target as HTMLInputElement).value.trim();
            if (v) dispatch({ type: "SET_IMAGE", url: v });
          }
        }}
      />
    </div>
  );
}
