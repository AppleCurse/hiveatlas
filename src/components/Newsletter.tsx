'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="mt-20 border-t border-[var(--border)] pt-16 px-6 pb-10 bg-[var(--bg)]">
      <div className="max-w-[800px] mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--accent-bg)] text-[var(--accent)] rounded-2xl mb-5 text-2xl border border-[var(--accent-border)] shadow-sm">
          💌
        </div>
        <h2 className="font-serif text-[28px] md:text-[34px] text-[var(--text)] mb-3 leading-tight">
          AI Dünyasından Geri Kalma
        </h2>
        <p className="text-[15px] md:text-[16px] text-[var(--muted)] mb-8 max-w-[500px] mx-auto leading-relaxed">
          Her hafta 100&apos;lerce yeni yapay zeka aracı çıkıyor. En iyi ve en faydalı olanları seçip, sıfır spam sözüyle cuma günleri mailine gönderiyoruz.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[460px] mx-auto relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-posta adresin..."
            required
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 input px-4 py-3 text-[15px] border-[var(--border2)] focus:border-[var(--accent)] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-sm bg-[var(--card-bg)]"
            aria-label="E-posta adresi"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="btn btn-accent px-6 py-3 text-[14px] md:text-[15px] font-medium rounded-xl disabled:opacity-50 min-w-[120px] justify-center shadow-sm"
          >
            {status === 'loading' ? '⏳...' : status === 'success' ? 'Katıldın! 🎉' : 'Bültene Katıl'}
          </button>
        </form>
        {status === 'success' && (
          <p className="text-[13px] text-[var(--success)] mt-4 font-medium animate-fade-in">
            Aramıza hoş geldin! İlk e-postan bu cuma yola çıkacak.
          </p>
        )}
      </div>
    </section>
  );
}
