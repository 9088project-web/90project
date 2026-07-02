import InquiryForm from "@/components/InquiryForm";
import { createWhatsAppLink, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

export default function ContactPage() {
  return (
    <section className="section-pad">
      <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-2 text-xs font-black uppercase text-wine">Contact</p>
          <h1 className="mb-4 text-4xl font-black text-ink">提交活动询问</h1>
          <p className="mb-6 text-ink/65">提供日期、地点、人数和服务需求，我们会协助整理菜单、布置和报价方向。</p>
          <div className="rounded-card border border-ink/10 bg-blackgold p-5 text-cream shadow-soft">
            <p className="text-sm text-cream/70">WhatsApp 快速沟通</p>
            <a href={createWhatsAppLink()} target="_blank" rel="noopener" className="mt-1 block text-2xl font-black text-goldLight">
              {WHATSAPP_DISPLAY}
            </a>
          </div>
        </div>
        <InquiryForm />
      </div>
    </section>
  );
}

