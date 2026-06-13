# Creative Elephant 🐘

> **Fil hortumu gibi her köşeyi koklayan, sana en iyi AI aracını saniyede bulan bağımsız keşif platformu.**

Creative Elephant, yapay zeka araçları dünyasındaki karmaşayı, bilgi kirliliğini ve affiliate (satış ortaklığı) manipülasyonlarını ortadan kaldırmak için tasarlanmış **%100 bağımsız, reklamsız ve açık kaynak odaklı** bir keşif platformudur.

Canlı Demo: [https://creativeelephant.com.tr](https://creativeelephant.com.tr)

---

## 🎯 Projenin Amacı ve Felsefesi

Piyasadaki yapay zeka "dizin" (directory) sitelerinin neredeyse tamamı, en çok komisyon veren araçları üst sıralara taşıyan affiliate link çiftlikleridir. **Creative Elephant bu düzene bir isyandır.**

*   **0 Affiliate Link:** Sitedeki hiçbir dış bağlantıdan gelir elde edilmez.
*   **Gerçek Metrikler:** Açık kaynak (OSS) araçlar önceliklendirilir. GitHub yıldızları, aktiflik durumları ve gizlilik politikaları objektif olarak puanlanır.
*   **Tasarruf (Escape) Odaklı:** Pahalı tekel araçlardan (OpenAI, Adobe, Zapier) kurtulmak isteyenler için ücretsiz ve açık kaynaklı kaçış yolları sunar.

---

## 🏗️ Teknik Mimari

Proje, hız, güvenlik ve sıfır barındırma maliyeti (MVP yaklaşımı) gözetilerek **tamamen statik** olarak inşa edilmiştir. Veritabanı (PostgreSQL, MongoDB vb.), harici API veya karmaşık bir backend katmanı **bulunmamaktadır.**

*   **Framework:** [Next.js 16.2.6](https://nextjs.org/) (App Router)
*   **Kütüphane:** React 19.2.4
*   **Stil & Tasarım:** [Tailwind CSS v4](https://tailwindcss.com/) (Utility-first, sıfır inline stil)
*   **Arama Motoru:** [Fuse.js](https://fusejs.io/) (Client-side Fuzzy Search, Türkçe karakter normalizasyonu, eşanlamlı kelime kütüphanesi)
*   **Tema Yönetimi:** `next-themes` (Dark/Light mode, FOUC korumalı)
*   **SEO & Metadata:** Next.js metadata API, JSON-LD Schema (SoftwareApplication), `@vercel/og` ile dinamik Open Graph görselleri.
*   **Veri Katmanı:** Tüm veri `src/lib/tools.ts` adlı tek bir TypeScript dosyasında nesne (object) dizisi olarak statik tutulur.

---

## ✨ Temel Özellikler

### 1. AI Sihirbazı (`/wizard`)
Kullanıcının bütçesi, kullanım amacı, teknik bilgisi ve gizlilik hassasiyetine göre 4 basit soru sorar. Arka planda çalışan `heuristic scoreTools()` algoritması, veritabanındaki her bir aracı bu cevaplara göre puanlar (MatchScore) ve kişiye en uygun 5 aracı önerir.

### 2. İmdat Hortumu (`/imdat`)
"Kullandığım araç çöktü, erişim engellendi veya çok pahalandı, ne yapacağım?" krizleri için tasarlanmış acil durum butonu. Sorun yaşanan araç seçildiğinde, anında en iyi alternatifleri listeler. Sihirbazın uzun yolunu atlar.

### 3. Escape (Kaçış) Modları (`/escape/[id]`)
Sektörü domine eden pahalı araçların (Örn: $72/aylık OpenAI Stack, $55/aylık Adobe Cloud) tam karşılığı olan ücretsiz ve yerel alternatifleri listeler. Matematiksel olarak elde edilecek tasarruf yüzdesini hesaplar ve gösterir.

### 4. Gelişmiş Arama (`/search`)
Sadece ürün adında değil; kullanım alanlarında (use cases), etiketlerde (tagline) ve kategorilerde arama yapar. "bedava resim", "chatgpt alternatifi" gibi eşanlamlı kelimeleri ve yazım hatalarını anlar (Fuzzy Search). Ücretsiz, Açık Kaynak, Lokal gibi hızlı filtreleme (chip) seçenekleri sunar.

### 5. Karşılaştırma & Matrix (`/compare`, `/matrix`)
Kullanıcıların seçtikleri araçları yan yana 15 farklı metrik (Fiyat, Docker desteği, Veri eğitimi, Açık Kaynak Lisansı vb.) üzerinden kıyaslamasını sağlar.

---

## 📊 Metodoloji ve Puanlama Sistemleri

Creative Elephant'ta araçlar rastgele sıralanmaz. `src/app/metodoloji/page.tsx` sayfasında da detaylandırılan 4 temel metrik kullanılır:

1.  **Trust Score (Güven Puanı):** Açık kaynak sağlığı (commit sıklığı), iş modeli şeffaflığı ve gizlilik politikalarının matematiksel birleşimidir.
2.  **MatchScore (Uyum Puanı):** Sihirbazda kullanıcının profiline göre dinamik hesaplanan puandır.
3.  **OSS Health Score:** Açık kaynaklı projelerin yaşama şansını gösterir (GitHub yıldızları güncel tutulur).
4.  **Wrapper Depth:** Aracın gerçekten bir teknoloji mi ürettiği, yoksa sadece ChatGPT API'sine giydirilmiş bir arayüz (wrapper) mü olduğunu belirler.

---

## 📂 Dosya ve Klasör Yapısı

```text
creative-elephant/
├── .github/workflows/   # CI/CD (Node.js Build & Lint)
├── src/
│   ├── app/             # Next.js App Router sayfaları
│   │   ├── alternatives/# Alternatif araç sayfaları
│   │   ├── api/og/      # Dinamik Open Graph (sosyal medya) görsel üretimi
│   │   ├── escape/      # Pahalı stack'lerden kaçış sayfaları
│   │   ├── imdat/       # Acil durum kriz alternatifi bulucu
│   │   ├── metodoloji/  # Puanlama açıklamaları
│   │   ├── search/      # Arama sonuçları
│   │   ├── submit/      # Yeni araç önerme formu (UI)
│   │   ├── tool/        # Tekil araç detay sayfaları (JSON-LD SEO entegreli)
│   │   └── wizard/      # Çok adımlı tavsiye motoru
│   ├── components/      # Tekrar kullanılabilir React bileşenleri
│   │   ├── home/        # Anasayfa bölümleri (Hero, Stats, Categories vb.)
│   │   ├── Nav.tsx      # Üst navigasyon
│   │   ├── Footer.tsx   # Alt bilgi
│   │   ├── SearchBox.tsx# Arama kutusu (Fuzzy search entegreli)
│   │   ├── ToolCard.tsx # Araçları listeleyen temel kart bileşeni
│   │   └── Newsletter.tsx # Bülten kayıt UI (şimdilik manuel süreç)
│   └── lib/
│       └── tools.ts     # !!! UYGULAMANIN KALBİ: Tüm veri ve algoritmalar !!!
├── public/              # Statik dosyalar (favicon vb.)
├── tailwind.config.ts   # Tailwind yapılandırması
├── eslint.config.mjs    # ESLint kuralları
├── .gitattributes       # Satır sonu (LF) zorlamaları
├── next.config.ts       # Next.js ayarları
└── package.json         # Bağımlılıklar
```

---

## 🚀 Kurulum ve Geliştirme (Local Development)

Projeyi bilgisayarınızda çalıştırmak için Node.js (v20+) yüklü olmalıdır.

1.  **Repoyu klonlayın:**
    ```text
    git clone https://github.com/AppleCurse/hiveatlas.git
    cd hiveatlas
    ```

2.  **Bağımlılıkları yükleyin:**
    ```text
    npm install
    # veya yarn install / pnpm install
    ```

3.  **Geliştirme sunucusunu başlatın:**
    ```text
    npm start &
    # Aslında geliştirme için: npm run d e v
    ```
    (Not: Çalıştırmak için geliştirme script'i `package.json` içindedir.)

4.  Tarayıcınızda `http://localhost:3000` adresine giderek platformu görüntüleyin.

---

## 🛠️ Katkıda Bulunma (Contributing)

Creative Elephant'ın veritabanı herkese açıktır. Yeni bir araç eklemek veya mevcut bir aracı güncellemek çok kolaydır:

1.  `src/lib/tools.ts` dosyasını açın.
2.  `tools` dizisine yeni bir obje ekleyin (TypeScript arayüzü olan `Tool` tipine uygun olarak).
3.  Özellikle açık kaynak (OSS) bir araç ekliyorsanız `githubUrl` ve `githubStars` verilerini doğru girdiğinizden emin olun.
4.  Değişikliklerinizi commit edin ve bir Pull Request (PR) oluşturun.

*Not: Tüm PR'lar ESLint ve Next.js derleme testlerinden (CI) geçmelidir.*

---

## 📜 Lisans

Bu proje açık kaynaklıdır ve MIT Lisansı ile lisanslanmıştır. Veri seti (`tools.ts`) topluluk kullanımı için serbesttir.
