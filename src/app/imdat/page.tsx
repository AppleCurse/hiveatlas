'use client';

import { useState } from 'react';
import { tools, getAlternatives, getToolBySlug } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import Link from 'next/link';
import Image from 'next/image';

export default function ImdatPage() {
  const [selectedSlug, setSelectedSlug] = useState<string>('');

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSlug(e.target.value);
  };

  const selectedTool = getToolBySlug(selectedSlug);
  const alternatives = selectedSlug ? getAlternatives(selectedSlug, 3) : [];

  return (
    <div className="max-w-[700px] mx-auto px-6 py-14 min-h-[70vh]">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-6">
          <Image src="/imdat-mascot.svg" alt="İmdat Hortumu Maskotu" width={160} height={256} className="drop-shadow-lg" priority />
        </div>
        <h1 className="font-serif text-[32px] md:text-[40px] text-[#DC2626] mb-3 leading-tight">
          İmdat Hortumu
        </h1>
        <p className="text-[15px] md:text-[16px] text-[var(--muted)] leading-relaxed max-w-[500px] mx-auto">
          Kullandığın araç çöktü mü? Engellendi mi? Yoksa fiyatı mı fırladı?
          Kriz anında panik yok. Hangi aracı kullandığını seç, en iyi alternatifi anında gösterelim.
        </p>
      </div>

      <div className="card p-6 md:p-8 bg-[var(--bg2)] border-2 border-[var(--border)]">
        <label htmlFor="tool-select" className="block text-[14px] font-medium text-[var(--text)] mb-3">
          Şu an kriz yaşadığın aracı seç:
        </label>
        <select
          id="tool-select"
          value={selectedSlug}
          onChange={handleSelect}
          className="w-full input px-4 py-3 bg-[var(--card-bg)] border-[var(--border2)] focus:border-[#DC2626] appearance-none cursor-pointer text-[15px]"
        >
          <option value="" disabled>Seçiniz...</option>
          {tools.map(t => (
            <option key={t.slug} value={t.slug}>
              {t.icon} {t.name}
            </option>
          ))}
        </select>
      </div>

      {selectedTool && (
        <div className="mt-10 animate-fade-in">
          <h2 className="font-serif text-[22px] text-[var(--text)] mb-4">
            <span className="text-[var(--text)]">{selectedTool.name}</span> yerine anında kullanabileceğin araçlar:
          </h2>
          {alternatives.length > 0 ? (
            <div className="flex flex-col gap-4">
              {alternatives.map((alt, i) => (
                <ToolCard key={alt.slug} tool={alt} rank={i + 1} />
              ))}
              <Link href={`/alternatives/${selectedSlug}`} className="btn btn-ghost w-full justify-center mt-2 py-3">
                Tüm alternatifleri gör →
              </Link>
            </div>
          ) : (
            <div className="text-center py-8 text-[var(--muted)] bg-[var(--bg2)] rounded-xl border border-[var(--border)]">
              Bu araç için veritabanımızda henüz bir alternatif bulunmuyor.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
