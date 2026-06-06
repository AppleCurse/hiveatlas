import Link from 'next/link';

type Category = {
  slug: string;
  label: string;
  icon: string;
  count: number;
};

export default function CategoriesSection({ categories }: { categories: Category[] }) {
  return (
    <section className="max-w-[1100px] mx-auto mt-14 px-6">
      <p className="section-label mb-4">Kategoriler</p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
        {categories.map(c => (
          <Link key={c.slug} href={`/category/${c.slug}`} className="no-underline">
            <div className="card card-interactive py-3.5 px-4 flex items-center gap-2.5">
              <span className="text-[18px]">{c.icon}</span>
              <div>
                <div className="text-[13px] font-medium text-[var(--text)]">{c.label}</div>
                <div className="text-[11px] text-[var(--subtle)]">{c.count} araç</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
