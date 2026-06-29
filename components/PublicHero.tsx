import Image from "next/image";
import Link from "next/link";
import { createWhatsAppLink } from "@/lib/whatsapp";

export default function PublicHero() {
  return (
    <section className="relative overflow-hidden bg-blackgold text-cream">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,8,0.72),rgba(12,10,8,0.98)),url('/images/hero.jpg')] bg-cover bg-center" />
      <div className="container-page relative grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-24">
        <div>
          <p className="mb-3 text-xs font-black uppercase text-goldLight">Food · Catering · Event Styling · Drinks</p>
          <h1 className="mb-4 text-[42px] font-black leading-tight md:text-[58px]">九零食刻 90 PROJECT</h1>
          <p className="mb-3 text-xl font-black text-goldLight md:text-2xl">一站式餐饮 · 活动餐饮 · 场地布置</p>
          <p className="mb-7 max-w-2xl text-base leading-8 text-cream/86 md:text-lg">
            为公司活动、生日派对、婚礼、开张仪式与私人聚会，提供餐饮与现场布置服务。
          </p>
          <div className="grid gap-3 sm:flex sm:flex-wrap">
            <a href={createWhatsAppLink()} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center justify-center rounded-card bg-gold px-6 font-black text-blackgold shadow-soft transition hover:bg-goldLight">
              WhatsApp 询问报价
            </a>
            <Link href="/services" className="inline-flex min-h-12 items-center justify-center rounded-card border border-cream/35 bg-cream/5 px-6 font-black text-cream transition hover:border-goldLight hover:text-goldLight">
              查看服务项目
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-card border border-goldLight/25 shadow-soft">
          <Image src="/images/hero.jpg" alt="九零食刻 90 PROJECT 餐饮与活动布置展示" width={1200} height={1500} priority className="aspect-[4/5] w-full object-cover" />
          <div className="absolute bottom-3 right-3 rounded-card border border-goldLight/45 bg-blackgold/82 px-4 py-3 text-sm backdrop-blur">
            <span className="block text-cream/70">快速询价</span>
            <strong className="block text-lg text-goldLight">011-1097 7166</strong>
          </div>
        </div>
      </div>
      <div className="gold-line" />
    </section>
  );
}
