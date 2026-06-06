import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ borderTop: '0.5px solid var(--border)', marginTop: 80, padding: '32px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 22, height: 22, background: 'var(--text)', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
            🐘
          </div>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 14, color: 'var(--text)' }}>Creative Elephant</span>
          <span style={{ fontSize: 12, color: 'var(--subtle)' }}>— 0 affiliate link. Gerçek veri.</span>
        </div>
        <div style={{ display: 'flex', gap: 20, fontSize: 12, color: 'var(--muted)' }}>
          <Link href="/matrix" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Matrix</Link>
          <Link href="/stacks" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Stack Presets</Link>
          <Link href="/escape/openai" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Escape OpenAI</Link>
          <Link href="/category/chatbot" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Kategoriler</Link>
        </div>
      </div>
    </footer>
  );
}
