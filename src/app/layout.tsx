import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Creative Elephant 🐘 — AI Dünyasının Kılavuzu",
  description: "Fil hortumu gibi her köşeyi koklayan AI keşif platformu. Bütçene, gizliliğine ve iş akışına göre en iyi AI aracını saniyede bul. 0 affiliate link, gerçek veriler.",
  keywords: "AI araçlar, ChatGPT alternatifi, ücretsiz AI, açık kaynak AI, AI karşılaştırma, creative elephant",
  openGraph: {
    title: "Creative Elephant 🐘 — AI Dünyasının Kılavuzu",
    description: "Fil hortumu gibi her yeri araştırıyor, sana en iyi AI aracını buluyor. 43+ araç, 0 reklam.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Nav />
          <main>{children}</main>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
