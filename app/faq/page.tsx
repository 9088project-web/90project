import { faqs } from "@/lib/data";

export default function FaqPage() {
  return (
    <section className="section-pad bg-cream">
      <div className="container-page max-w-4xl">
        <div className="mb-9 text-center">
          <p className="mb-2 text-xs font-black uppercase text-wine">FAQ</p>
          <h1 className="mb-3 text-4xl font-black text-ink">常见问题</h1>
        </div>
        <div className="grid gap-3">
          {(faqs ?? []).map((item, index) => (
            <details key={item.question} open={index === 0} className="rounded-card border border-ink/10 bg-warm p-5 shadow-sm">
              <summary className="cursor-pointer font-black text-ink">{item.question}</summary>
              <p className="mt-3 border-t border-ink/10 pt-3 text-ink/65">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

