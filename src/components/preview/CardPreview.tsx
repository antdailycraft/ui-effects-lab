export function CardPreview({ filterId }: { filterId?: string }) {
  return (
    <div className="pv pv-card" style={{ filter: filterId ? `url(#${filterId})` : undefined }}>
      <div className="banner">
        <b>50% OFF</b>
      </div>
      <div className="body">
        <div className="ktag">Local Advertisement</div>
        <h3>Harbor Roastery</h3>
        <p>Small-batch coffee, roasted on the pier every morning. Sample copy for layout only.</p>
        <div className="row">
          <span className="price">$12</span>
          <span className="cta">Order now</span>
        </div>
      </div>
    </div>
  );
}
