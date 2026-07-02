import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/data";

export default function ServicesPage() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="mb-9 max-w-3xl">
          <p className="mb-2 text-xs font-black uppercase text-wine">Services</p>
          <h1 className="mb-3 text-4xl font-black text-ink">服务项目</h1>
          <p className="text-ink/65">九零食刻 90 PROJECT 提供餐饮、活动布置与饮料吧服务，可独立安排，也可组合成一站式活动方案。</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(services ?? []).map((service) => <ServiceCard key={service.slug} {...service} />)}
        </div>
      </div>
    </section>
  );
}

