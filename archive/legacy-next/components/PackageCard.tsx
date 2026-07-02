import { createWhatsAppLink } from "@/lib/whatsapp";

export type PackageCardProps = {
  title: string;
  price: string;
  description: string;
  featured?: boolean;
};

export default function PackageCard({ title, price, description, featured }: PackageCardProps) {
  return (
    <article className={`rounded-card border p-6 shadow-sm ${featured ? "border-gold/60 bg-[#fff8e7]" : "border-ink/10 bg-warm"}`}>
      <p className="mb-2 text-xs font-black uppercase text-wine">Package</p>
      <h3 className="mb-2 text-2xl font-black text-ink">{title}</h3>
      <p className="mb-3 text-2xl font-black text-blackgold">{price}</p>
      <p className="text-sm leading-7 text-ink/68">{description}</p>
      <a href={createWhatsAppLink()} target="_blank" rel="noopener" className="mt-5 inline-flex font-black text-wine underline decoration-wine/30 underline-offset-4">
        WhatsApp 询问此配套
      </a>
    </article>
  );
}
