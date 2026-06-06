'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { escapeModes } from '@/lib/tools';

export default function Nav() {
  const [escapeOpen, setEscapeOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Initialize theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ce-theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ce-theme', next);
  }

  // Close mobile menu on route change
  function closeMobile() {
    setMobileOpen(false);
    setEscapeOpen(false);
  }

  return (
    <nav style={{ borderBottom: '0.5px solid var(--border)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }} onClick={closeMobile}>
          <div style={{ width: 32, height: 32, background: 'var(--text)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
            🐘
          </div>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: 'var(--text)', letterSpacing: '-0.01em' }}>Creative Elephant</span>
        </Link>

        {/* Desktop nav links */}
        <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {/* Escape Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setEscapeOpen(o => !o)}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '6px 12px', borderRadius: 8,
                border: escapeOpen ? '0.5px solid var(--border2)' : '0.5px solid transparent',
                background: escapeOpen ? 'var(--bg2)' : 'transparent',
                fontSize: 13, color: 'var(--muted)', cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                transition: 'all 0.15s',
              }}
            >
              🏴 Kaçış <span style={{ fontSize: 11, color: 'var(--subtle)', fontWeight: 400 }}>(ücretliden kurtul)</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: escapeOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
                <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {escapeOpen && (
              <div style={{
                position: 'absolute', top: '100%', left: 0, marginTop: 4,
                background: 'var(--card-bg)', border: '0.5px solid var(--border)',
                borderRadius: 12, padding: 6, minWidth: 220,
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 100,
              }}>
                {escapeModes.map(e => (
                  <Link
                    key={e.id}
                    href={`/escape/${e.id}`}
                    onClick={() => setEscapeOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '9px 12px', borderRadius: 8, textDecoration: 'none',
                      color: 'var(--text)', fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={e2 => (e2.currentTarget.style.background = 'var(--bg2)')}
                    onMouseLeave={e2 => (e2.currentTarget.style.background = 'transparent')}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>{e.icon}</span>
                      <span style={{ fontWeight: 500 }}>{e.name}</span>
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--success)', fontWeight: 500 }}>
                      %{Math.round((1 - e.toCost / e.fromCost) * 100)} tasarruf
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/compare" style={{ padding: '6px 12px', borderRadius: 8, fontSize: 13, color: 'var(--muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
            ⚖️ Karşılaştır
          </Link>
          <Link href="/stacks" style={{ padding: '6px 12px', borderRadius: 8, fontSize: 13, color: 'var(--muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
            Hazır Setler
          </Link>
          <Link href="/matrix" style={{ padding: '6px 12px', borderRadius: 8, fontSize: 13, color: 'var(--muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
            Matrix
          </Link>

          {/* Theme toggle */}
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Tema değiştir" style={{ marginLeft: 4 }}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <Link href="/wizard" className="btn btn-accent" style={{ marginLeft: 8, fontSize: 12, padding: '7px 14px' }}>
            🧙 Sihirbaz
          </Link>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Tema değiştir">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Menü"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 34, height: 34, borderRadius: 8,
              border: '0.5px solid var(--border)', background: 'transparent',
              cursor: 'pointer', color: 'var(--text)', fontSize: 18,
            }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mobile-nav-menu">
          <Link href="/wizard" onClick={closeMobile}>🧙 AI Sihirbazı</Link>
          <Link href="/compare" onClick={closeMobile}>⚖️ Karşılaştır</Link>
          <Link href="/stacks" onClick={closeMobile}>📦 Hazır Setler</Link>
          <Link href="/matrix" onClick={closeMobile}>📊 Matrix Tablosu</Link>
          <div style={{ height: 1, background: 'var(--border)', margin: '8px 0' }} />
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--subtle)', padding: '4px 16px' }}>
            🏴 Escape Modları
          </p>
          {escapeModes.map(e => (
            <Link key={e.id} href={`/escape/${e.id}`} onClick={closeMobile}>
              <span>{e.icon} {e.name}</span>
              <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--success)', fontWeight: 500 }}>
                %{Math.round((1 - e.toCost / e.fromCost) * 100)} tasarruf
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Close dropdown on outside click */}
      {escapeOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setEscapeOpen(false)} />
      )}
    </nav>
  );
}
