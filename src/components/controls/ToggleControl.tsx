export function ToggleControl({
  label,
  checked,
  disabled,
  note,
  onToggle,
}: {
  label: string;
  checked: boolean;
  disabled?: boolean;
  note?: string;
  onToggle: () => void;
}) {
  return (
    <div className="control">
      <div className="ctrl-toggle">
        <span className="ctrl-name">{label}</span>
        <button
          className={"mini-sw" + (checked ? " on" : "")}
          role="switch"
          aria-checked={checked}
          aria-label={label}
          disabled={disabled}
          onClick={onToggle}
        />
      </div>
      {note && <div className="reduced-note show">{note}</div>}
    </div>
  );
}
