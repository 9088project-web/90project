import { mealPlanTypes } from "@/lib/meal-data";
export default function PlanTypesPage() { return <div><h1 className="mb-6 text-3xl font-black text-ink">包伙食类型</h1><div className="grid gap-3">{mealPlanTypes.map((item) => <div key={item} className="rounded-card border border-ink/10 bg-warm p-4 font-black">{item}</div>)}</div></div>; }
