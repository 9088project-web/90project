"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { dishes, mealCategories, mealPlanTypes } from "@/lib/meal-data";
import { createWhatsAppLink } from "@/lib/whatsapp";

type FormState = {
  name: string;
  phone: string;
  area: string;
  startDate: string;
  planType: string;
  meals: string;
  cycle: string;
  people: string;
  taste: string;
  staple: string;
  notes: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  area: "",
  startDate: "",
  planType: "个人包伙食",
  meals: "午餐 + 晚餐",
  cycle: "一个月",
  people: "1",
  taste: "少油少盐",
  staple: "白饭",
  notes: ""
};

export default function MealBuilderClient() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [category, setCategory] = useState("主食");
  const [liked, setLiked] = useState<string[]>([]);
  const [avoided, setAvoided] = useState<string[]>([]);

  const visibleDishes = dishes.filter((dish) => dish.category === category);

  function updateField(name: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function toggleDish(name: string, mode: "like" | "avoid" | "clear") {
    if (mode === "clear") {
      setLiked((items) => items.filter((item) => item !== name));
      setAvoided((items) => items.filter((item) => item !== name));
      return;
    }
    if (mode === "like") {
      setLiked((items) => items.includes(name) ? items.filter((item) => item !== name) : [...items, name]);
      setAvoided((items) => items.filter((item) => item !== name));
      return;
    }
    setAvoided((items) => items.includes(name) ? items.filter((item) => item !== name) : [...items, name]);
    setLiked((items) => items.filter((item) => item !== name));
  }

  const message = useMemo(() => {
    const likeLines = liked.length ? liked.map((item, index) => `${index + 1}. ${item}`).join("\n") : "1.\n2.\n3.";
    const avoidLines = avoided.length ? avoided.map((item, index) => `${index + 1}. ${item}`).join("\n") : "1.\n2.\n3.";
    return `你好，我想询问九零食刻 90 PROJECT 包伙食配套。\n\n【顾客资料】\n姓名：${form.name}\n电话：${form.phone}\n地区：${form.area}\n开始日期：${form.startDate}\n\n【包伙食类型】\n${form.planType}\n\n【餐期】\n${form.meals}\n\n【周期】\n${form.cycle}\n\n【人数】\n${form.people}\n\n【口味偏好】\n${form.taste}\n\n【主食偏好】\n${form.staple}\n\n【喜欢的菜式】\n${likeLines}\n\n【不喜欢 / 避免】\n${avoidLines}\n\n【备注】\n${form.notes || "请帮我确认价格、菜单安排和配送。"}`;
  }, [form, liked, avoided]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="grid gap-6">
        <section className="rounded-card border border-ink/10 bg-warm p-5 shadow-sm">
          <h2 className="mb-4 text-2xl font-black text-ink">顾客资料与包伙食偏好</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="form-field"><span className="form-label">姓名</span><input className="form-input" value={form.name} onChange={(e) => updateField("name", e.target.value)} /></label>
            <label className="form-field"><span className="form-label">电话</span><input className="form-input" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} /></label>
            <label className="form-field"><span className="form-label">地区</span><input className="form-input" value={form.area} onChange={(e) => updateField("area", e.target.value)} placeholder="例如 Cheras / PJ" /></label>
            <label className="form-field"><span className="form-label">开始日期</span><input className="form-input" type="date" value={form.startDate} onChange={(e) => updateField("startDate", e.target.value)} /></label>
            <label className="form-field"><span className="form-label">包伙食类型</span><select className="form-input" value={form.planType} onChange={(e) => updateField("planType", e.target.value)}>{mealPlanTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="form-field"><span className="form-label">餐期</span><select className="form-input" value={form.meals} onChange={(e) => updateField("meals", e.target.value)}><option>午餐</option><option>晚餐</option><option>午餐 + 晚餐</option></select></label>
            <label className="form-field"><span className="form-label">周期</span><select className="form-input" value={form.cycle} onChange={(e) => updateField("cycle", e.target.value)}><option>一星期</option><option>两个星期</option><option>一个月</option></select></label>
            <label className="form-field"><span className="form-label">人数</span><input className="form-input" type="number" min="1" value={form.people} onChange={(e) => updateField("people", e.target.value)} /></label>
            <label className="form-field"><span className="form-label">口味偏好</span><input className="form-input" value={form.taste} onChange={(e) => updateField("taste", e.target.value)} /></label>
            <label className="form-field"><span className="form-label">主食偏好</span><input className="form-input" value={form.staple} onChange={(e) => updateField("staple", e.target.value)} /></label>
          </div>
          <label className="form-field mt-4"><span className="form-label">备注</span><textarea className="form-input min-h-24" value={form.notes} onChange={(e) => updateField("notes", e.target.value)} /></label>
        </section>

        <section>
          <div className="mb-4 flex flex-wrap gap-2">
            {mealCategories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm font-black ${category === item ? "bg-blackgold text-goldLight" : "bg-cream text-ink"}`}>{item}</button>)}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visibleDishes.map((dish) => {
              const isLiked = liked.includes(dish.name);
              const isAvoided = avoided.includes(dish.name);
              return (
                <article key={dish.id} className="overflow-hidden rounded-card border border-ink/10 bg-warm shadow-sm">
                  <Image src={dish.image} alt={`${dish.name} 菜品图片`} width={1200} height={900} className="aspect-[4/3] w-full object-cover" />
                  <div className="p-4">
                    <p className="text-xs font-black text-wine">{dish.category}</p>
                    <h3 className="mb-3 text-lg font-black text-ink">{dish.name}</h3>
                    <div className="grid grid-cols-3 gap-2 text-xs font-black">
                      <button onClick={() => toggleDish(dish.name, "like")} className={`rounded-card px-2 py-2 ${isLiked ? "bg-emerald-600 text-white" : "bg-emerald-50 text-emerald-700"}`}>喜欢</button>
                      <button onClick={() => toggleDish(dish.name, "avoid")} className={`rounded-card px-2 py-2 ${isAvoided ? "bg-red-600 text-white" : "bg-red-50 text-red-700"}`}>避免</button>
                      <button onClick={() => toggleDish(dish.name, "clear")} className="rounded-card bg-stone-100 px-2 py-2 text-stone-700">清除</button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      <aside className="rounded-card border border-gold/35 bg-blackgold p-5 text-cream shadow-soft lg:sticky lg:top-24 lg:self-start">
        <p className="mb-2 text-xs font-black uppercase text-goldLight">Selected Summary</p>
        <h2 className="mb-4 text-2xl font-black">WhatsApp 确认预览</h2>
        <div className="mb-4 grid gap-2 text-sm text-cream/80">
          <p><strong className="text-goldLight">喜欢：</strong>{liked.join("、") || "未选择"}</p>
          <p><strong className="text-goldLight">避免：</strong>{avoided.join("、") || "未选择"}</p>
        </div>
        <textarea readOnly value={message} className="mb-4 h-72 w-full rounded-card border border-cream/15 bg-cream/10 p-3 text-sm text-cream" />
        <a href={createWhatsAppLink(message)} target="_blank" rel="noopener" className="block rounded-card bg-gold px-5 py-3 text-center font-black text-blackgold hover:bg-goldLight">WhatsApp 确认</a>
      </aside>
    </div>
  );
}
