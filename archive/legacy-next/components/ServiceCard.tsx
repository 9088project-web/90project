import Image from "next/image";

export type ServiceCardProps = {
  title: string;
  description: string;
  image: string;
  icon?: string;
};

export default function ServiceCard({ title, description, image, icon }: ServiceCardProps) {
  return (
    <article className="overflow-hidden rounded-card border border-ink/10 bg-warm shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <Image src={image} alt={`${title} 服务展示`} width={1200} height={900} className="aspect-[16/11] w-full object-cover" />
      <div className="p-5">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blackgold text-sm font-black text-goldLight">{icon || "90"}</div>
        <h3 className="mb-2 text-xl font-black text-ink">{title}</h3>
        <p className="text-sm leading-7 text-ink/68">{description}</p>
      </div>
    </article>
  );
}
