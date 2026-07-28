export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="theme-inner-card flex min-w-0 max-w-full flex-col gap-1 overflow-hidden rounded-2xl px-4 py-3 transition hover:border-cyan-400/35">
      <div className="text-xs font-medium uppercase tracking-wide theme-text-subtle">
        {label}
      </div>
      <div className="min-w-0 break-words text-sm font-medium theme-text [overflow-wrap:anywhere]">{value}</div>
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
    <label className="grid min-w-0 gap-1.5">
      <span className="text-sm font-medium theme-text-muted">{label}</span>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        minLength={8}
        className="theme-input min-h-11 w-full min-w-0 rounded-2xl px-4 py-3 text-sm outline-none transition"
      />
    </label>
  );
}