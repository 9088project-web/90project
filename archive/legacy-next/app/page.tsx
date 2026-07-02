import Link from "next/link";
import { createWhatsAppLink } from "@/lib/whatsapp";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-blackgold text-cream">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,8,0.72),rgba(12,10,8,0.98)),url('/images/hero.jpg')] bg-cover bg-center" />
        <div className="container-page relative grid gap-8 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-28">
          <div>
            <p className="mb-3 text-xs font-black uppercase text-goldLight">Offline Local MVP</p>
            <h1 className="mb-4 text-[42px] font-black leading-tight md:text-[58px]">九零食刻 90 PROJECT</h1>
            <p className="mb-3 text-xl font-black text-goldLight md:text-2xl">包伙食点餐系统 · 本地离线预览</p>
            <p className="mb-7 max-w-2xl text-cream/82">顾客可以填写包伙食需求、选择喜欢和避免的菜式，并生成 WhatsApp 确认消息。当前版本不连接 Supabase、不部署、不上传 GitHub。</p>
            <div className="grid gap-3 sm:flex">
              <Link href="/meal-builder" className="rounded-card bg-gold px-6 py-3 text-center font-black text-blackgold">开始选择菜式</Link>
              <Link href="/meal-plan" className="rounded-card border border-cream/30 px-6 py-3 text-center font-black text-cream">查看包伙食介绍</Link>
            </div>
          </div>
          <div className="rounded-card border border-goldLight/25 bg-cream/8 p-5 shadow-soft">
            <h2 className="mb-4 text-2xl font-black text-goldLight">本地测试账号</h2>
            <div className="grid gap-3 text-sm text-cream/85">
              <p><strong>Admin:</strong> admin@90project.local / admin123456</p>
              <p><strong>Member:</strong> member@test.local / member123456</p>
              <p><strong>Database:</strong> Prisma SQLite planned at prisma/dev.db</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-pad bg-cream"><div className="container-page grid gap-5 md:grid-cols-4">{["个人包伙食", "家庭包伙食", "公司员工餐", "长者 / 清淡餐"].map((item) => <div key={item} className="rounded-card border border-ink/10 bg-warm p-5 shadow-sm"><h3 className="font-black text-ink">{item}</h3><p className="mt-2 text-sm text-ink/60">可按人数、餐期、周期和口味偏好安排。</p></div>)}</div></section>
      <section className="section-pad bg-blackgold text-center text-cream"><div className="container-page max-w-2xl"><h2 className="mb-3 text-3xl font-black">准备询问包伙食？</h2><p className="mb-6 text-cream/70">先选择菜式，再一键生成 WhatsApp 消息。</p><a href={createWhatsAppLink()} target="_blank" rel="noopener" className="rounded-card bg-gold px-6 py-3 font-black text-blackgold">WhatsApp 询问</a></div></section>
    </>
  );
}
