'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { escapeModes } from '@/lib/tools';
import { useTheme } from 'next-themes';

export default function Nav() {
  const [escapeOpen, setEscapeOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Avoid setting state in effect unless necessary, but we need it here to wait for client-side mounting
    // Use requestAnimationFrame to defer it if next-themes still complains, or just disable the rule inline
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  function toggleTheme() {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  }

  function closeMobile() {
    setMobileOpen(false);
    setEscapeOpen(false);
  }

  return (
    <nav className="border-b border-[var(--border)] sticky top-0 z-50 backdrop-blur-md bg-[var(--nav-bg)] transition-colors duration-300">
      <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline" onClick={closeMobile}>
          <div className="w-8 h-8 bg-[var(--text)] rounded-lg flex items-center justify-center text-lg">
            🐘
          </div>
          <span className="font-serif text-base text-[var(--text)] tracking-[-0.01em]">Creative Elephant</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {/* Escape Dropdown */}
          <div className="relative">
            <button
              onClick={() => setEscapeOpen(o => !o)}
              aria-expanded={escapeOpen}
              aria-controls="escape-menu"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[13px] text-[var(--muted)] cursor-pointer font-sans font-medium transition-all duration-150 ${
                escapeOpen ? 'border-[var(--border2)] bg-[var(--bg2)]' : 'border-transparent bg-transparent'
              }`}
            >
              🏴 Kaçış <span className="text-[11px] text-[var(--subtle)] font-normal">(ücretliden kurtul)</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-150 ${escapeOpen ? 'rotate-180' : ''}`}>
                <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {escapeOpen && (
              <div id="escape-menu" className="absolute top-full left-0 mt-1 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-1.5 min-w-[220px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-[100]">
                {escapeModes.map(e => (
                  <Link
                    key={e.id}
                    href={`/escape/${e.id}`}
                    onClick={() => setEscapeOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg no-underline text-[var(--text)] text-[13px] font-sans transition-colors duration-100 hover:bg-[var(--bg2)]"
                  >
                    <span className="flex items-center gap-2">
                      <span>{e.icon}</span>
                      <span className="font-medium">{e.name}</span>
                    </span>
                    <span className="text-[11px] text-[var(--success)] font-medium">
                      %{Math.round((1 - e.toCost / e.fromCost) * 100)} tasarruf
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/compare" className="px-3 py-1.5 rounded-lg text-[13px] text-[var(--muted)] no-underline font-medium transition-colors duration-150 hover:text-[var(--text)]">
            ⚖️ Karşılaştır
          </Link>
          <Link href="/stacks" className="px-3 py-1.5 rounded-lg text-[13px] text-[var(--muted)] no-underline font-medium transition-colors duration-150 hover:text-[var(--text)]">
            Hazır Setler
          </Link>
          <Link href="/matrix" className="px-3 py-1.5 rounded-lg text-[13px] text-[var(--muted)] no-underline font-medium transition-colors duration-150 hover:text-[var(--text)]">
            Matrix
          </Link>
          <Link href="/imdat" className="px-3 py-1.5 rounded-lg text-[13px] text-[#DC2626] font-semibold transition-colors duration-150 hover:bg-[#FEF2F2] border border-transparent hover:border-[#FCA5A5] no-underline">
            🚨 İmdat
          </Link>
          <Link href="/submit" className="px-3 py-1.5 rounded-lg text-[13px] text-[var(--muted)] no-underline font-medium transition-colors duration-150 hover:text-[var(--text)]">
            🚀 Araç Öner
          </Link>

          {/* Theme toggle */}
          {mounted && (
            <button onClick={toggleTheme} className="theme-toggle ml-1" aria-label="Tema değiştir">
              {resolvedTheme === 'dark' ? '☀️' : '🌙'}
            </button>
          )}

          <Link href="/wizard" className="btn btn-accent ml-2 text-[12px] px-3.5 py-1.5">
            🧙 Sihirbaz
          </Link>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          {mounted && (
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Tema değiştir">
              {resolvedTheme === 'dark' ? '☀️' : '🌙'}
            </button>
          )}
          <button
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={mobileOpen}
            className="flex items-center justify-center w-[34px] h-[34px] rounded-lg border border-[var(--border)] bg-transparent cursor-pointer text-[var(--text)] text-[18px]"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed top-14 left-0 right-0 bottom-0 bg-[var(--bg)] z-[100] flex flex-col p-4 px-6 gap-1 border-t border-[var(--border)] animate-fade-in md:hidden">
          <Link href="/wizard" onClick={closeMobile} className="flex items-center gap-2 px-4 py-3 rounded-[10px] text-[15px] font-medium text-[var(--text)] no-underline hover:bg-[var(--bg2)] transition-colors">🧙 AI Sihirbazı</Link>
          <Link href="/compare" onClick={closeMobile} className="flex items-center gap-2 px-4 py-3 rounded-[10px] text-[15px] font-medium text-[var(--text)] no-underline hover:bg-[var(--bg2)] transition-colors">⚖️ Karşılaştır</Link>
          <Link href="/stacks" onClick={closeMobile} className="flex items-center gap-2 px-4 py-3 rounded-[10px] text-[15px] font-medium text-[var(--text)] no-underline hover:bg-[var(--bg2)] transition-colors">📦 Hazır Setler</Link>
          <Link href="/matrix" onClick={closeMobile} className="flex items-center gap-2 px-4 py-3 rounded-[10px] text-[15px] font-medium text-[var(--text)] no-underline hover:bg-[var(--bg2)] transition-colors">📊 Matrix Tablosu</Link>
          <Link href="/imdat" onClick={closeMobile} className="flex items-center gap-2 px-4 py-3 rounded-[10px] text-[15px] font-semibold text-[#DC2626] no-underline hover:bg-[#FEF2F2] transition-colors">🚨 İmdat Hortumu</Link>
          <Link href="/submit" onClick={closeMobile} className="flex items-center gap-2 px-4 py-3 rounded-[10px] text-[15px] font-medium text-[var(--text)] no-underline hover:bg-[var(--bg2)] transition-colors">🚀 Araç Öner</Link>
          <div className="h-px bg-[var(--border)] my-2" />
          <p className="text-[11px] font-medium tracking-[0.06em] uppercase text-[var(--subtle)] px-4 py-1">
            🏴 Escape Modları
          </p>
          {escapeModes.map(e => (
            <Link key={e.id} href={`/escape/${e.id}`} onClick={closeMobile} className="flex items-center gap-2 px-4 py-3 rounded-[10px] text-[15px] font-medium text-[var(--text)] no-underline hover:bg-[var(--bg2)] transition-colors">
              <span>{e.icon} {e.name}</span>
              <span className="ml-auto text-[12px] text-[var(--success)] font-medium">
                %{Math.round((1 - e.toCost / e.fromCost) * 100)} tasarruf
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Close dropdown on outside click */}
      {escapeOpen && (
        <div className="fixed inset-0 z-[99]" onClick={() => setEscapeOpen(false)} aria-hidden="true" />
      )}
    </nav>
  );
}
