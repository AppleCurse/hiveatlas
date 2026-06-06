import Link from 'next/link';
import SearchBox from '@/components/SearchBox';

type Chip = {
  label: string;
  query: string;
};

export default function HeroSection({ chips }: { chips: Chip[] }) {
  return (
    <section className="px-6 pt-[72px] pb-[52px] max-w-[680px] mx-auto text-center">
      <div className="inline-flex items-center gap-[6px] text-[11px] font-medium tracking-[0.06em] uppercase text-[var(--accent)] bg-[var(--accent-bg)] px-3 py-[5px] rounded-[20px] mb-7 border border-[var(--accent-border)]">
        <span className="text-[14px]">🐘</span>
        Her yerde, her zaman — duyan, bilen, haber veren
      </div>

      <h1 className="text-[clamp(38px,6vw,54px)] font-serif tracking-[-0.025em] leading-[1.08] text-[var(--text)] mb-4">
        Fil gibi araştır,<br />
        <em className="italic text-[var(--accent)]">akıllıca seç</em>
      </h1>

      <p className="text-[16px] text-[var(--muted)] leading-[1.65] font-light max-w-[440px] mx-auto mb-10">
        400 araç araştırmak yok. Reddit kazmak yok.<br />
        Creative Elephant&apos;ın hortumu her köşeyi koklayıp sana en doğru AI aracını saniyede buluyor.
      </p>

      <SearchBox autoFocus />

      {/* Chips */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {chips.map(c => (
          <Link key={c.label} href={`/search?q=${encodeURIComponent(c.query)}`} className="chip">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--border)] inline-block" />
            {c.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
