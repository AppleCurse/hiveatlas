import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import type { Tool } from '@/lib/tools';

export default function FeaturedToolsSection({ tools }: { tools: Tool[] }) {
  return (
    <section className="max-w-[1100px] mx-auto mt-14 px-6">
      <div className="flex items-baseline justify-between mb-5 flex-wrap gap-2">
        <div>
          <p className="section-label">Öne çıkanlar</p>
          <h2 className="text-[22px] font-serif text-[var(--text)] mt-1">
            En çok tercih edilen ücretsiz araçlar
          </h2>
        </div>
        <Link href="/matrix" className="text-[13px] text-[var(--accent)] no-underline font-medium">
          Tümünü karşılaştır →
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {tools.map((tool, i) => <ToolCard key={tool.slug} tool={tool} rank={i + 1} />)}
      </div>
    </section>
  );
}
