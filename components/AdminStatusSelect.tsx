"use client";

export default function AdminStatusSelect({ currentValue = "new", options = [] }: { table?: string; id?: string; currentValue?: string | null; options?: string[]; column?: string }) {
  return <select className="rounded-card border border-ink/10 bg-warm px-2 py-2 text-sm font-bold" defaultValue={currentValue || "new"}>{options.map((option) => <option key={option}>{option}</option>)}</select>;
}
