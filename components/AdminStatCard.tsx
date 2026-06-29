export default function AdminStatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <article className="rounded-card border border-ink/10 bg-warm p-5 shadow-sm">
      <p className="text-sm font-black text-ink/58">{label}</p>
      <strong className="mt-2 block text-3xl font-black text-ink">{value}</strong>
      {hint ? <span className="mt-2 block text-xs font-bold text-ink/55">{hint}</span> : null}
    </article>
  );
}
