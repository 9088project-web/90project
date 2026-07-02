"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

const links = [
  { href: "/member/dashboard", label: "会员首页" },
  { href: "/member/profile", label: "个人资料" },
  { href: "/member/inquiries", label: "我的询问" },
  { href: "/member/quotations", label: "我的报价" },
  { href: "/member/bookings", label: "我的预订" },
  { href: "/contact", label: "提交新询问" }
];

export default function MemberSidebar() {
  const pathname = usePathname();

  return (
    <aside className="rounded-card border border-ink/10 bg-warm p-3 shadow-sm md:sticky md:top-24 md:self-start">
      <p className="px-3 pb-2 text-xs font-black uppercase text-wine">Member</p>
      <nav className="grid gap-1" aria-label="会员导航">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={`rounded-card px-3 py-2 text-sm font-black ${pathname === link.href ? "bg-blackgold text-goldLight" : "text-ink/72 hover:bg-cream"}`}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="mt-3 border-t border-ink/10 pt-3">
        <LogoutButton />
      </div>
    </aside>
  );
}
