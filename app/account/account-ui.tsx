export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white backdrop-blur transition hover:border-cyan-400/35 hover:bg-white/10">
      <div className="text-xs font-medium uppercase tracking-wide text-white/50">
        {label}
      </div>
      <div className="break-all text-sm font-medium text-white">
        {value}
      </div>
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
      <span className="text-sm font-medium text-white/70">{label}</span>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        minLength={8}
        className="min-h-11 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none backdrop-blur transition focus:border-cyan-400/50 focus:bg-white/10 focus:shadow-[0_0_18px_rgba(34,211,238,0.18)]"
      />
    </label>
  );
}