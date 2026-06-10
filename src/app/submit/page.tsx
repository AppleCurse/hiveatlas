'use client';

import { useState } from 'react';

export default function SubmitToolPage() {
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    category: '',
    description: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', website: '', category: '', description: '' });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-[700px] mx-auto px-6 py-14">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-[var(--bg2)] text-[var(--text)] rounded-2xl mb-4 text-3xl border border-[var(--border)] shadow-sm">
          🚀
        </div>
        <h1 className="font-serif text-[32px] md:text-[40px] text-[var(--text)] mb-3 leading-tight">
          Yeni Araç Öner
        </h1>
        <p className="text-[15px] md:text-[16px] text-[var(--muted)] leading-relaxed max-w-[500px] mx-auto">
          Creative Elephant veritabanında henüz olmayan harika bir AI aracı mı biliyorsun?
          Hemen öner, inceleyip listeye ekleyelim.
        </p>
      </div>

      <div className="card p-6 md:p-8">
        {status === 'success' ? (
          <div className="text-center py-10 animate-fade-in">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="font-serif text-2xl text-[var(--text)] mb-2">Önerin Alındı!</h3>
            <p className="text-[var(--muted)] text-[15px] mb-6">
              Katkın için teşekkürler. Fil hortumu hemen aracı koklamaya başlıyor. 🐘
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="btn btn-ghost"
            >
              Başka Bir Araç Öner
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[13px] font-medium text-[var(--text)] ml-1">
                Araç Adı <span className="text-[var(--danger)]">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Örn: Midjourney"
                className="input px-4 py-3 bg-[var(--bg)] border-[var(--border2)] focus:border-[var(--accent)]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="website" className="text-[13px] font-medium text-[var(--text)] ml-1">
                Web Sitesi (URL) <span className="text-[var(--danger)]">*</span>
              </label>
              <input
                id="website"
                name="website"
                type="url"
                required
                value={formData.website}
                onChange={handleChange}
                placeholder="https://..."
                className="input px-4 py-3 bg-[var(--bg)] border-[var(--border2)] focus:border-[var(--accent)]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="text-[13px] font-medium text-[var(--text)] ml-1">
                Ana Kategori <span className="text-[var(--danger)]">*</span>
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="input px-4 py-3 bg-[var(--bg)] border-[var(--border2)] focus:border-[var(--accent)] appearance-none cursor-pointer"
              >
                <option value="" disabled>Seçiniz...</option>
                <option value="chatbot">💬 Chatbot / Asistan</option>
                <option value="image">🎨 Görsel Üretim</option>
                <option value="video">🎬 Video Üretim</option>
                <option value="audio">🎵 Ses / Müzik</option>
                <option value="coding">⌨️ Kodlama</option>
                <option value="automation">⚡ Otomasyon</option>
                <option value="writing">📝 Yazı / Metin</option>
                <option value="other">Diğer</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-[13px] font-medium text-[var(--text)] ml-1">
                Kısa Açıklama & Neden Öneriyorsun?
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Bu aracın en sevdiğin özelliği ne? (Opsiyonel)"
                className="input px-4 py-3 bg-[var(--bg)] border-[var(--border2)] focus:border-[var(--accent)] resize-y min-h-[100px]"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn btn-dark w-full justify-center py-3.5 text-[15px] mt-2 shadow-sm"
            >
              {status === 'loading' ? 'Gönderiliyor...' : 'Gönder →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
