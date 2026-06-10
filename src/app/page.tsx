import { tools, stackPresets, escapeModes } from '@/lib/tools';
import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import StatsStrip from '@/components/home/StatsStrip';
import EscapeModesSection from '@/components/home/EscapeModesSection';
import StackPresetsSection from '@/components/home/StackPresetsSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedToolsSection from '@/components/home/FeaturedToolsSection';
import WizardCompareSection from "@/components/home/WizardCompareSection";
import Newsletter from "@/components/Newsletter";

export const metadata: Metadata = {
  title: 'Creative Elephant 🐘 — AI Dünyasının Kılavuzu',
  description: 'Fil hortumu gibi her köşeyi koklayan AI keşif platformu. 43+ araç, 0 affiliate link.',
};

const FEATURED_TOOLS = ['open-webui', 'continue-dev', 'n8n', 'flux', 'jan'].map(
  slug => tools.find(t => t.slug === slug)!
).filter(Boolean);

const CHIPS = [
  { label: 'ChatGPT\'den kaç 🏴', query: 'chatgpt alternatifi' },
  { label: 'Ücretsiz Midjourney alternatifi', query: 'midjourney ücretsiz' },
  { label: 'İnternetsiz çalışan AI', query: 'local çalışan ai' },
  { label: 'Ücretsiz Cursor alternatifi', query: 'cursor alternatifi' },
  { label: 'Gizlilik odaklı araçlar', query: 'gdpr gizlilik ai' },
  { label: 'AI video araçları', query: 'video' },
  { label: 'Ücretsiz sunum aracı', query: 'sunum ücretsiz' },
  { label: 'AI müzik üretici', query: 'müzik' },
];

const CATEGORIES = [
  { slug: 'chatbot',      label: 'Chatbot',      icon: '💬', count: tools.filter(t => t.categories.includes('chatbot')).length },
  { slug: 'coding',       label: 'Kodlama',       icon: '⌨️', count: tools.filter(t => t.categories.includes('coding')).length },
  { slug: 'image',        label: 'Görsel',        icon: '🎨', count: tools.filter(t => t.categories.includes('image')).length },
  { slug: 'video',        label: 'Video',         icon: '🎬', count: tools.filter(t => t.categories.includes('video')).length },
  { slug: 'audio',        label: 'Ses / Müzik',   icon: '🎵', count: tools.filter(t => t.categories.includes('audio') || t.categories.includes('music')).length },
  { slug: 'automation',   label: 'Otomasyon',     icon: '⚡', count: tools.filter(t => t.categories.includes('automation')).length },
  { slug: 'writing',      label: 'Yazı',          icon: '📝', count: tools.filter(t => t.categories.includes('writing')).length },
  { slug: 'research',     label: 'Araştırma',     icon: '🔍', count: tools.filter(t => t.categories.includes('research')).length },
  { slug: 'presentation', label: 'Sunum',         icon: '📊', count: tools.filter(t => t.categories.includes('presentation')).length },
  { slug: 'education',    label: 'Eğitim',        icon: '🎓', count: tools.filter(t => t.categories.includes('education')).length },
  { slug: 'data',         label: 'Veri',          icon: '📈', count: tools.filter(t => t.categories.includes('data')).length },
];

export default function HomePage() {
  return (
    <div>
      <HeroSection chips={CHIPS} />
      <StatsStrip toolCount={tools.length} />
      <EscapeModesSection escapeModes={escapeModes} />
      <StackPresetsSection stackPresets={stackPresets} />
      <CategoriesSection categories={CATEGORIES} />
      <FeaturedToolsSection tools={FEATURED_TOOLS} />
      <WizardCompareSection />
      <Newsletter />
    </div>
  );
}
