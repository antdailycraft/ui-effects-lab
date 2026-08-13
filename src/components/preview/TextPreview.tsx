export function TextPreview({ filterId }: { filterId?: string }) {
  return (
    <div className="pv pv-text" style={{ filter: filterId ? `url(#${filterId})` : undefined }}>
      Turbulence
    </div>
  );
}
