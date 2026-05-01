export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="theme-inner-card flex flex-col gap-1 rounded-2xl px-4 py-3 transition hover:border-cyan-400/35">
      <div className="text-xs font-medium uppercase tracking-wide theme-text-subtle">
        {label}
      </div>
      <div className="break-all text-sm font-medium theme-text">{value}</div>
    </div>
  );
}

export function PasswordField({
  label,
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium theme-text-muted">{label}</span>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        minLength={8}
        className="theme-input min-h-11 rounded-2xl px-4 py-3 text-sm outline-none transition"
      />
    </label>
  );
}