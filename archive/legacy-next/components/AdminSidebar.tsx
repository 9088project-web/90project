"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

const links = [
  { href: "/admin/dashboard", label: "后台首页" },
  { href: "/admin/members", label: "会员管理" },
  { href: "/admin/inquiries", label: "询问管理" },
  { href: "/admin/quotations", label: "报价管理" },
  { href: "/admin/bookings", label: "预订管理" },
  { href: "/admin/services", label: "服务项目" },
  { href: "/admin/packages", label: "配套管理" },
  { href: "/admin/gallery", label: "图库管理" },
  { href: "/admin/faq", label: "FAQ 管理" },
  { href: "/admin/settings", label: "网站设置" }
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="rounded-card border border-ink/10 bg-blackgold p-3 text-cream shadow-sm md:sticky md:top-24 md:self-start">
      <p className="px-3 pb-2 text-xs font-black uppercase text-goldLight">Admin</p>
      <nav className="grid gap-1" aria-label="后台导航">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={`rounded-card px-3 py-2 text-sm font-black ${pathname === link.href ? "bg-gold text-blackgold" : "text-cream/78 hover:bg-cream/10 hover:text-goldLight"}`}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="mt-3 border-t border-cream/10 pt-3">
        <LogoutButton />
      </div>
    </aside>
  );
}
