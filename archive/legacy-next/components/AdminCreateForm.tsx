"use client";

export default function AdminCreateForm({ title = "新增" }: { table?: string; fields?: any[]; defaults?: Record<string, unknown>; title?: string }) {
  return <div className="rounded-card border border-ink/10 bg-warm p-5 shadow-sm"><h3 className="text-lg font-black text-ink">{title}</h3><p className="mt-2 text-sm text-ink/60">离线预览：这里会接入 Prisma SQLite 的本地新增/编辑。</p></div>;
}
