import Link from 'next/link';

export default function WizardCompareSection() {
  return (
    <section className="max-w-[1100px] mx-auto mt-14 px-6 mb-14">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3">
        {/* Sihirbaz */}
        <div className="bg-gradient-to-br from-[var(--wizard-gradient-1)] to-[var(--wizard-gradient-2)] border border-[var(--accent-border)] rounded-[20px] py-8 px-7">
          <div className="text-[36px] mb-3">🧙</div>
          <h2 className="font-serif text-[22px] text-[var(--text)] mb-2">
            Hangi araç senin için?
          </h2>
          <p className="text-[14px] text-[var(--muted)] leading-relaxed mb-5">
            4 soruyu yanıtla — kişiye özel 5 araç önerelim. Bütçen, gizliliğin, teknik seviyene göre.
          </p>
          <Link href="/wizard" className="btn btn-accent inline-block">
            Sihirbazı Başlat →
          </Link>
        </div>
        {/* Karşılaştır */}
        <div className="bg-gradient-to-br from-[var(--compare-gradient-1)] to-[var(--compare-gradient-2)] border border-[var(--compare-border)] rounded-[20px] py-8 px-7">
          <div className="text-[36px] mb-3">⚖️</div>
          <h2 className="font-serif text-[22px] text-[var(--text)] mb-2">
            Yan yana karşılaştır
          </h2>
          <p className="text-[14px] text-[var(--muted)] leading-relaxed mb-5">
            ChatGPT vs Claude vs Gemini? 3 aracı seç, 15+ metrik ile kıyasla. Kararı sen ver.
          </p>
          <Link href="/compare" className="btn btn-dark inline-block">
            Karşılaştırmayı Aç →
          </Link>
        </div>
      </div>
    </section>
  );
}
