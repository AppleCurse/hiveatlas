import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-20 py-8 px-6">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5.5 h-5.5 bg-[var(--text)] rounded-[5px] flex items-center justify-center text-[12px]">
            🐘
          </div>
          <span className="font-serif text-[14px] text-[var(--text)]">Creative Elephant</span>
          <span className="text-[12px] text-[var(--subtle)]">— 0 affiliate link. Gerçek veri.</span>
        </div>
        <div className="flex gap-5 text-[12px] text-[var(--muted)]">
          <Link href="/matrix" className="text-[var(--muted)] no-underline hover:text-[var(--text)] transition-colors">Matrix</Link>
          <Link href="/stacks" className="text-[var(--muted)] no-underline hover:text-[var(--text)] transition-colors">Stack Presets</Link>
          <Link href="/escape/openai" className="text-[var(--muted)] no-underline hover:text-[var(--text)] transition-colors">Escape OpenAI</Link>
          <Link href="/category/chatbot" className="text-[var(--muted)] no-underline hover:text-[var(--text)] transition-colors">Kategoriler</Link>
        </div>
      </div>
    </footer>
  );
}
