import PackageCard from "@/components/PackageCard";
import { packages } from "@/lib/data";

export default function PackagesPage() {
  return (
    <section className="section-pad bg-cream">
      <div className="container-page">
        <div className="mb-9 max-w-3xl">
          <p className="mb-2 text-xs font-black uppercase text-wine">Packages</p>
          <h1 className="mb-3 text-4xl font-black text-ink">配套与报价</h1>
          <p className="text-ink/65">所有价格会根据人数、地点、菜单、服务内容与活动规模调整。提供资料后可获得初步报价。</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {(packages ?? []).map((item, index) => <PackageCard key={item.title} {...item} featured={index === 0} />)}
        </div>
      </div>
    </section>
  );
}

