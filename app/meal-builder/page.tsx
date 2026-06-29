import MealBuilderClient from "@/components/MealBuilderClient";

export default function MealBuilderPage() {
  return <section className="section-pad bg-cream"><div className="container-page"><div className="mb-8"><p className="mb-2 text-xs font-black uppercase text-wine">Meal Builder</p><h1 className="text-4xl font-black text-ink">包伙食选择系统</h1><p className="mt-3 text-ink/65">选择喜欢或避免的菜式，右侧会即时生成 WhatsApp 确认消息。</p></div><MealBuilderClient /></div></section>;
}
