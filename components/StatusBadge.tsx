import { statusLabels } from "@/lib/data";

const statusClass: Record<string, string> = {
  new: "bg-gold/18 text-[#7a4b00] border-gold/30",
  contacted: "bg-olive/15 text-olive border-olive/25",
  quoted: "bg-blue-50 text-blue-700 border-blue-200",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  completed: "bg-zinc-100 text-zinc-700 border-zinc-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  draft: "bg-zinc-100 text-zinc-700 border-zinc-200",
  sent: "bg-blue-50 text-blue-700 border-blue-200",
  accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  expired: "bg-stone-100 text-stone-700 border-stone-200",
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  inactive: "bg-stone-100 text-stone-700 border-stone-200"
};

export default function StatusBadge({ status }: { status?: string | null }) {
  const value = status || "pending";
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-black ${statusClass[value] || "bg-stone-100 text-stone-700 border-stone-200"}`}>
      {statusLabels[value] || value}
    </span>
  );
}
