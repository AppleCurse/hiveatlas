'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { searchTools } from '@/lib/tools';
import type { Tool } from '@/lib/tools';

const PLACEHOLDERS = [
  "ChatGPT'nin ücretsiz alternatifi ne?",
  "Yerel çalışan AI nasıl kullanırım?",
  "Adobe Firefly'dan kaçmak istiyorum",
  "Cursor'a para ödemeden kod yazabilir miyim?",
  "Gizliliğe önem veren AI stack",
  "Zapier'in açık kaynak alternatifi var mı?",
];

export default function SearchBox({ autoFocus }: { autoFocus?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Tool[]>([]);
  const [open, setOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState(PLACEHOLDERS[0]);

  const inputRef = useRef<HTMLInputElement>(null);

  // Rotate placeholder
  useEffect(() => {
    const t = setInterval(() => {
      setPlaceholder(prev => PLACEHOLDERS[(PLACEHOLDERS.indexOf(prev) + 1) % PLACEHOLDERS.length]);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  function handleChange(v: string) {
    setQuery(v);
    if (v.length >= 2) {
      setResults(searchTools(v).slice(0, 5));
      setOpen(true);
    } else {
      setOpen(false);
    }
  }

  function handleSubmit() {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setOpen(false);
    }
  }

  return (
    <div className="relative">
      <div className="relative">
        {/* Search icon */}
        <svg className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          ref={inputRef}
          className="input pl-[50px] pr-[120px] py-[17px] text-[15px]"
          autoFocus={autoFocus}
          value={query}
          onChange={e => handleChange(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          onFocus={() => query.length >= 2 && setOpen(true)}
          placeholder={placeholder}
          aria-label="Araç ara"
        />
        <button
          onClick={handleSubmit}
          className="btn btn-dark absolute right-2 top-1/2 -translate-y-1/2 text-[12px] px-4 py-2"
          aria-label="Arama yap"
        >
          Bul →
        </button>
      </div>

      {/* Dropdown suggestions */}
      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)] z-50">
          {results.map(t => (
            <button
              key={t.slug}
              onClick={() => { router.push(`/tool/${t.slug}`); setOpen(false); }}
              className="flex items-center gap-3 w-full px-4 py-3 border-none bg-transparent cursor-pointer text-left border-b border-[var(--border)] font-sans hover:bg-[var(--bg2)] transition-colors"
              aria-label={`${t.name} detay sayfasına git`}
            >
              <span className="text-[20px]">{t.icon}</span>
              <div>
                <div className="text-[13px] font-medium text-[var(--text)]">{t.name}</div>
                <div className="text-[11px] text-[var(--subtle)]">{t.categories.join(', ')}</div>
              </div>
              {t.hasFreeTier && t.startingPriceUsd === 0 && (
                <span className="badge badge-free ml-auto">Ücretsiz</span>
              )}
            </button>
          ))}
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 w-full px-4 py-2.5 border-none bg-[var(--bg2)] cursor-pointer text-left text-[12px] text-[var(--muted)] font-sans hover:bg-[var(--border)] transition-colors"
            aria-label={`"${query}" için tüm sonuçları gör`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            &quot;{query}&quot; için tüm sonuçları gör
          </button>
        </div>
      )}
      {open && (
        <div className="fixed inset-0 z-[49]" onClick={() => setOpen(false)} aria-hidden="true" />
      )}
    </div>
  );
}
