import { createWhatsAppLink } from "@/lib/whatsapp";

export default function WhatsAppFloatingButton() {
  return (
    <a
      href={createWhatsAppLink()}
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp 询问 90 PROJECT 报价"
      className="fixed bottom-4 right-4 z-40 inline-flex min-h-12 items-center justify-center rounded-full bg-[#1fa855] px-5 text-sm font-black text-white shadow-soft transition hover:bg-[#168846]"
    >
      WhatsApp
    </a>
  );
}
