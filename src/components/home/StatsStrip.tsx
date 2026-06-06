export default function StatsStrip({ toolCount }: { toolCount: number }) {
  const stats = [
    { n: `${toolCount}+`, label: 'araç veritabanında' },
    { n: '11', label: 'farklı kategori' },
    { n: '15+', label: 'analiz metriği' },
    { n: '0', label: 'reklam / affiliate link' },
    { n: 'Gerçek', label: 'veri, gerçek puan' },
    { n: '🆓', label: 'tamamen ücretsiz platform' },
  ];

  return (
    <div className="border-y border-[var(--border)] bg-[var(--bg2)]">
      <div className="max-w-[1100px] mx-auto py-3.5 px-6 flex justify-center gap-10 flex-wrap">
        {stats.map(s => (
          <div key={s.label} className="flex items-center gap-1.5 text-[13px] text-[var(--muted)]">
            <span className="font-semibold text-[var(--text)]">{s.n}</span>
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}
