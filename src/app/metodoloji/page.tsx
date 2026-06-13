export default function MetodolojiPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-14">
      <div className="text-center mb-12">
        <h1 className="font-serif text-[32px] md:text-[40px] text-[var(--text)] mb-4">Metodoloji & Puanlama</h1>
        <p className="text-[16px] text-[var(--muted)] max-w-[600px] mx-auto">
          Creative Elephant&apos;ta hiçbir aracın reklamını yapmıyor, sponsorluk kabul etmiyoruz.
          Puanlamalarımız tamamen tarafsız metriklere dayanır.
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="font-serif text-[24px] text-[var(--text)] mb-4 flex items-center gap-2">
            <span className="text-2xl">🛡️</span> Trust Score (Güven Puanı)
          </h2>
          <p className="text-[15px] text-[var(--muted)] leading-relaxed mb-3">
            Bir aracın ne kadar güvenilir olduğunu ve uzun vadede yaşayıp yaşamayacağını gösterir. Aşağıdaki kriterlere göre 100 üzerinden hesaplanır:
          </p>
          <ul className="list-disc pl-5 text-[15px] text-[var(--muted)] space-y-2">
            <li><strong>Açık Kaynak (OSS) Sağlığı:</strong> Reponun yıldız sayısı, son commit tarihi, issue çözme hızı.</li>
            <li><strong>İş Modeli Şeffaflığı:</strong> Sürpriz fiyatlandırma var mı? Ücretsiz katman gerçekten işe yarıyor mu?</li>
            <li><strong>Gizlilik:</strong> Verilerinle yapay zeka modelleri eğitiliyor mu? GDPR uyumlu mu?</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-[24px] text-[var(--text)] mb-4 flex items-center gap-2">
            <span className="text-2xl">🎯</span> MatchScore (Uyum Puanı)
          </h2>
          <p className="text-[15px] text-[var(--muted)] leading-relaxed mb-3">
            AI Sihirbazı&apos;nı kullandığınızda, verdiğiniz cevaplara göre size en uygun araçları dinamik olarak hesaplayan algoritmadır:
          </p>
          <ul className="list-disc pl-5 text-[15px] text-[var(--muted)] space-y-2">
            <li>Bütçenize tam uyum (+30 puan)</li>
            <li>Teknik seviyenize uygun arayüz (+25 puan)</li>
            <li>Gizlilik hassasiyetinizle örtüşme (+20 puan)</li>
            <li>Temel kullanım amacınızı karşılama (+25 puan)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-[24px] text-[var(--text)] mb-4 flex items-center gap-2">
            <span className="text-2xl">📦</span> Wrapper Depth (Katman Derinliği)
          </h2>
          <p className="text-[15px] text-[var(--muted)] leading-relaxed">
            Piyasadaki birçok araç aslında sadece ChatGPT&apos;nin üzerine giydirilmiş bir arayüzdür (Wrapper).
            Bu puan, bir aracın kendi teknolojisini mi ürettiğini yoksa sadece başka bir API&apos;yi mi paketlediğini gösterir.
            Yüksek puan (80-100), aracın benzersiz bir teknoloji veya çok güçlü bir özel iş akışı sunduğu anlamına gelir.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-[24px] text-[var(--text)] mb-4 flex items-center gap-2">
            <span className="text-2xl">🔄</span> Veri Tazeliği
          </h2>
          <p className="text-[15px] text-[var(--muted)] leading-relaxed">
            Araçların fiyatları, GitHub yıldızları ve özellikleri düzenli olarak gözden geçirilir.
            Amacımız, AI dünyasının baş döndürücü hızında size her zaman en güncel ve en doğru bilgiyi sunmaktır.
          </p>
        </section>
      </div>
    </div>
  );
}
