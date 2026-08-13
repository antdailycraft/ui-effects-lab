export function ImagePreview({ filterId }: { filterId?: string }) {
  return (
    <div className="pv pv-image" style={{ filter: filterId ? `url(#${filterId})` : undefined }}>
      <div className="grain-lines" />
      <div className="tag">Cover / Poster</div>
      <div className="big">Nightfall</div>
      <div className="sub">Sample artwork · displacement target</div>
    </div>
  );
}
