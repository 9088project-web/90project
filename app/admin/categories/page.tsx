import { mealCategories } from "@/lib/meal-data";
export default function CategoriesPage() { return <div><h1 className="mb-6 text-3xl font-black text-ink">菜品分类</h1><div className="grid gap-3 md:grid-cols-3">{mealCategories.map((item) => <div key={item} className="rounded-card border border-ink/10 bg-warm p-4 font-black">{item}</div>)}</div></div>; }
