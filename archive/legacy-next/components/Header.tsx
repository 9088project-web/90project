"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createWhatsAppLink } from "@/lib/whatsapp";

const navLinks = [
  { href: "/meal-plan", label: "包伙食介绍" },
  { href: "/meal-builder", label: "选择菜式" },
  { href: "/member/dashboard", label: "会员记录" },
  { href: "/admin/dashboard", label: "本地后台" }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-cream/10 bg-blackgold/95 text-cream backdrop-blur-xl">
      <div className="container-page flex min-h-[72px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-goldLight/70 text-sm font-black text-goldLight">90</span>
          <span className="leading-tight"><strong className="block text-sm">九零食刻</strong><small className="block text-[11px] font-bold text-cream/65">90 PROJECT</small></span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => <Link key={link.href} href={link.href} className={`rounded-card px-3 py-2 text-sm font-bold hover:bg-cream/10 hover:text-goldLight ${pathname === link.href ? "text-goldLight" : "text-cream/85"}`}>{link.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/login" className="rounded-card px-3 py-2 text-sm font-bold text-cream/80 hover:text-goldLight">登录</Link>
          <a href={createWhatsAppLink()} target="_blank" rel="noopener" className="rounded-card bg-gold px-4 py-2 text-sm font-black text-blackgold">WhatsApp</a>
        </div>
        <button className="grid h-11 w-11 place-content-center gap-1.5 rounded-card border border-cream/15 bg-cream/5 lg:hidden" onClick={() => setOpen(!open)} aria-label="菜单">
          <span className="block h-0.5 w-5 bg-cream" /><span className="block h-0.5 w-5 bg-cream" /><span className="block h-0.5 w-5 bg-cream" />
        </button>
      </div>
      {open ? <nav className="container-page grid gap-1 border-t border-cream/10 py-4 lg:hidden">{navLinks.map((link) => <Link key={link.href} href={link.href} className="rounded-card px-3 py-3 font-bold text-cream/88 hover:bg-cream/10">{link.label}</Link>)}</nav> : null}
    </header>
  );
}
