export function LicenseBadge({ license }: { license?: string }) {
  const id = license ?? "MIT";
  return (
    <a
      className="license-chip"
      href={`https://spdx.org/licenses/${id}.html`}
      target="_blank"
      rel="noopener noreferrer"
      title={`${id} — original implementation on open web standards (SVG filters / CSS). Free to use.`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3v18" />
        <path d="M6 21h12" />
        <path d="M5 7h14" />
        <path d="M5 7l-3 6a3 3 0 0 0 6 0z" />
        <path d="M19 7l-3 6a3 3 0 0 0 6 0z" />
      </svg>
      {id}
    </a>
  );
}
