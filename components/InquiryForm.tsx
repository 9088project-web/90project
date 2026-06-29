"use client";

import { createWhatsAppLink } from "@/lib/whatsapp";

export default function InquiryForm() {
  return (
    <form className="grid gap-4 rounded-card border border-ink/10 bg-warm p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="form-field"><span className="form-label">姓名</span><input className="form-input" placeholder="你的姓名" /></label>
        <label className="form-field"><span className="form-label">电话</span><input className="form-input" placeholder="WhatsApp 电话" /></label>
        <label className="form-field"><span className="form-label">地区</span><input className="form-input" placeholder="例如 Cheras / PJ" /></label>
        <label className="form-field"><span className="form-label">开始日期</span><input className="form-input" type="date" /></label>
      </div>
      <textarea className="form-input min-h-28" placeholder="包伙食类型、人数、餐期、口味偏好" />
      <a href={createWhatsAppLink()} target="_blank" rel="noopener" className="rounded-card bg-blackgold px-5 py-3 text-center font-black text-goldLight">WhatsApp 确认</a>
    </form>
  );
}
