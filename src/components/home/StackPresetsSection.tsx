import Link from 'next/link';

type StackPreset = {
  id: string;
  name: string;
  icon: string;
  description: string;
  totalMonthlyCost: number;
  tools: string[];
};

export default function StackPresetsSection({ stackPresets }: { stackPresets: StackPreset[] }) {
  return (
    <section className="max-w-[1100px] mx-auto mt-14 px-6">
      <div className="flex items-baseline justify-between mb-5 flex-wrap gap-2">
        <div>
          <p className="section-label">Stack presets</p>
          <h2 className="text-[22px] font-serif text-[var(--text)] mt-1">
            Kullanıma hazır AI stack&apos;ler
          </h2>
        </div>
        <Link href="/stacks" className="text-[13px] text-[var(--accent)] no-underline font-medium">
          Tümü →
        </Link>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2.5">
        {stackPresets.map(s => (
          <Link key={s.id} href={`/stacks#${s.id}`} className="no-underline">
            <div className="card card-interactive p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[22px]">{s.icon}</span>
                <span className="font-medium text-[14px] text-[var(--text)]">{s.name}</span>
              </div>
              <p className="text-[12px] text-[var(--muted)] leading-relaxed mb-2.5">{s.description}</p>
              <div className="flex items-center justify-between">
                <span className={`text-[12px] font-medium ${s.totalMonthlyCost === 0 ? 'text-[var(--success)]' : 'text-[var(--muted)]'}`}>
                  {s.totalMonthlyCost === 0 ? '🆓 Tamamen ücretsiz' : `$${s.totalMonthlyCost}/ay`}
                </span>
                <span className="text-[11px] text-[var(--subtle)]">{s.tools.length} araç</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
