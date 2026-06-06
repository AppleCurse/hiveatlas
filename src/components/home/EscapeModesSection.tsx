import Link from 'next/link';

type EscapeMode = {
  id: string;
  name: string;
  icon: string;
  fromCost: number;
  toCost: number;
};

export default function EscapeModesSection({ escapeModes }: { escapeModes: EscapeMode[] }) {
  return (
    <section className="max-w-[1100px] mx-auto mt-14 px-6">
      <div className="flex items-baseline justify-between mb-5 flex-wrap gap-2">
        <div>
          <p className="section-label">Escape modları</p>
          <h2 className="text-[22px] font-serif text-[var(--text)] mt-1">
            Ücretli araçtan kaç, özgür ol
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2.5">
        {escapeModes.map(e => (
          <Link
            key={e.id}
            href={`/escape/${e.id}`}
            className="no-underline"
          >
            <div className="card card-interactive p-4">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-[20px]">{e.icon}</span>
                <span className="font-medium text-[14px] text-[var(--text)]">{e.name}</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[11px] text-[var(--subtle)] mb-0.5">Şu an</div>
                  <div className="text-[16px] font-semibold text-[var(--danger)]">${e.fromCost}/ay</div>
                </div>
                <div className="text-[18px] text-[var(--border2)]">→</div>
                <div className="text-right">
                  <div className="text-[11px] text-[var(--subtle)] mb-0.5">Sonra</div>
                  <div className="text-[16px] font-semibold text-[var(--success)]">
                    {e.toCost === 0 ? 'Ücretsiz' : `$${e.toCost}/ay`}
                  </div>
                </div>
              </div>
              <div className="mt-2.5 text-[11px] font-medium text-[var(--success)] bg-[var(--success-bg)] px-2 py-1 rounded-md inline-block">
                %{Math.round((1 - e.toCost / e.fromCost) * 100)} tasarruf
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
