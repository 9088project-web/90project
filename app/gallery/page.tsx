import Image from "next/image";
import { galleryItems } from "@/lib/data";

export default function GalleryPage() {
  return (
    <section className="section-pad bg-charcoal text-cream">
      <div className="container-page">
        <div className="mb-9 max-w-3xl">
          <p className="mb-2 text-xs font-black uppercase text-goldLight">Gallery</p>
          <h1 className="mb-3 text-4xl font-black">作品展示</h1>
          <p className="text-cream/70">替换为真实项目照片后，可用于展示餐点、布置、活动现场和饮料吧风格。</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <figure key={item.src} className="relative overflow-hidden rounded-card border border-cream/10 bg-cream/5">
              <Image src={item.src} alt={item.alt} width={1200} height={900} className="aspect-[4/3] w-full object-cover" />
              <figcaption className="absolute bottom-3 left-3 rounded-card bg-blackgold/80 px-3 py-1 text-sm font-black">{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

