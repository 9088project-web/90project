import Link from "next/link";
import { createWhatsAppLink, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-[#070605] py-12 text-cream/75">
      <div className="container-page grid gap-8 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <div>
          <Link href="/" className="mb-4 flex items-center gap-3 text-cream">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-goldLight/70 text-sm font-black text-goldLight">90</span>
            <span className="leading-tight">
              <strong className="block text-sm">九零食刻</strong>
              <small className="block text-[11px] font-bold text-cream/65">90 PROJECT</small>
            </span>
          </Link>
          <p className="max-w-md text-sm leading-7">一站式餐饮、活动餐饮、场地布置与 Mocktail / Cocktail 饮料吧服务。</p>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-black text-cream">服务项目</h2>
          <ul className="grid gap-2 text-sm">
            <li>包伙食</li>
            <li>活动餐饮 Catering</li>
            <li>场地布置 Event Styling</li>
            <li>鸡尾酒 / Mocktail Bar</li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-black text-cream">WhatsApp</h2>
          <a href={createWhatsAppLink()} target="_blank" rel="noopener" className="font-black text-goldLight">
            {WHATSAPP_DISPLAY}
          </a>
          <div className="mt-4 flex gap-3 text-sm">
            <Link href="/login" className="hover:text-goldLight">会员登录</Link>
            <Link href="/admin/dashboard" className="hover:text-goldLight">后台</Link>
          </div>
        </div>
      </div>
      <div className="container-page mt-8 border-t border-cream/10 pt-5 text-xs">
        Copyright {new Date().getFullYear()} 九零食刻 90 PROJECT. All rights reserved.
      </div>
    </footer>
  );
}
