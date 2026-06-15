import { tools } from '@/lib/tools';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Karşılaştırma Matrisi — Creative Elephant',
  description: 'Tüm AI araçları tek tabloda karşılaştır.',
};

const CATS = ['chatbot','coding','image','video','audio','music','automation','writing','research','presentation','education','data'];
const CAT_LABELS: Record<string, string> = {
  chatbot: '💬 Chatbot & Asistan', coding: '⌨️ Kodlama',
  image: '🎨 Görsel Üretim', video: '🎬 Video Üretim',
  audio: '🎙️ Ses', music: '🎵 Müzik',
  automation: '⚡ Otomasyon', writing: '📝 Yazı & Verimlilik',
  research: '🔍 Araştırma', presentation: '📊 Sunum',
  education: '🎓 Eğitim', data: '📈 Veri Analizi',
};

export default function MatrixPage() {
  const sorted = [...tools].sort((a, b) => (b.matchScore ?? b.trustScore) - (a.matchScore ?? a.trustScore));
  const freeCount  = tools.filter(t => t.hasFreeTier && t.startingPriceUsd === 0).length;
  const ossCount   = tools.filter(t => t.openSource).length;
  const localCount = tools.filter(t => t.localRun).length;

  function getPrivacyClasses(score: string) {
    const base = "text-[11px] font-medium px-[7px] py-[2px] rounded-[5px]";
    if (score === "high") return `${base} bg-[var(--success-bg)] text-[var(--success)]`;
    if (score === "medium") return `${base} bg-[var(--warning-bg)] text-[var(--warning)]`;
    return `${base} bg-[var(--danger-bg)] text-[var(--danger)]`;
  }

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-10">
      <div className="mb-8">
        <p className="section-label mb-2">Karşılaştırma Tablosu</p>
        <h1 className="font-serif text-[32px] text-[var(--text)] mb-2.5">
          Tüm yapay zeka araçları, şeffaf verilerle
        </h1>
        <p className="text-[15px] text-[var(--muted)] max-w-[520px]">
          {tools.length} araç · {freeCount} ücretsiz · {ossCount} açık kaynak · {localCount} internetsiz çalışır
        </p>
      </div>

      {CATS.map(cat => {
        const catTools = sorted.filter(t => t.categories.includes(cat));
        if (catTools.length === 0) return null;
        return (
          <section key={cat} className="mb-10">
            <div className="flex items-center justify-between mb-3.5">
              <h2 className="font-serif text-xl text-[var(--text)]">
                {CAT_LABELS[cat]}
              </h2>
              <Link href={`/category/${cat}`} className="text-xs text-[var(--accent)] no-underline">
                Kategoriye git →
              </Link>
            </div>
            <div className="overflow-auto rounded-xl border-[0.5px] border-[var(--border)]">
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr className="bg-[var(--bg2)]">
                    {[
                      'Araç',
                      'Ücretsiz',
                      'Açık Kaynak (OSS)',
                      'İnternetsiz Çalışır',
                      'API (Yazılıma Bağlanır)',
                      'Gizlilik',
                      'Güven Puanı',
                      'Eşleşme Puanı',
                    ].map(h => (
                      <th key={h} className="px-3 py-2.5 text-left text-[11px] font-medium text-[var(--subtle)] tracking-wider uppercase whitespace-nowrap border-b-[0.5px] border-[var(--border)]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {catTools.map((tool, i) => (
                    <tr key={tool.slug} className={`${i % 2 === 0 ? 'bg-white' : 'bg-[var(--bg)]'} border-b-[0.5px] border-[var(--border)]`}>
                      <td className="px-3 py-2.5">
                        <Link href={`/tool/${tool.slug}`} className="no-underline flex items-center gap-2">
                          <span className="text-base">{tool.icon}</span>
                          <span className="font-medium text-[var(--text)]">{tool.name}</span>
                          {tool.trustWarnings && tool.trustWarnings.length > 0 && (
                            <span title={tool.trustWarnings.join(' · ')} className="text-xs">⚠</span>
                          )}
                        </Link>
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        {tool.hasFreeTier && tool.startingPriceUsd === 0
                          ? <span className="text-[var(--success)]">✓</span>
                          : <span className="text-[var(--subtle)] text-[11px]">${tool.startingPriceUsd}</span>}
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        {tool.openSource ? <span className="text-[var(--success)]">✓</span> : <span className="text-[var(--border2)]">—</span>}
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        {tool.localRun ? <span className="text-[var(--success)]">✓</span> : <span className="text-[var(--border2)]">—</span>}
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        {tool.apiAvailable ? <span className="text-[var(--success)]">✓</span> : <span className="text-[var(--border2)]">—</span>}
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={getPrivacyClasses(tool.privacyScore)}>
                          {tool.privacyScore === 'high' ? 'Yüksek' : tool.privacyScore === 'medium' ? 'Orta' : 'Düşük'}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-center text-[var(--muted)] text-xs">
                        {tool.trustScore}
                      </td>
                      <td className="px-3 py-2.5">
                        {tool.matchScore != null
                          ? <span className="score-pill text-xs">{tool.matchScore}</span>
                          : <span className="text-[var(--border2)] text-xs">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </div>
  );
}
