import { tools, stackPresets, escapeModes, getToolBySlug } from '@/lib/tools';
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
  slug => getToolBySlug(slug)!
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

const categoryCounts = tools.reduce((acc, tool) => {
  tool.categories.forEach(cat => {
    acc.set(cat, (acc.get(cat) || 0) + 1);
  });
  return acc;
}, new Map<string, number>());

const CATEGORIES = [
  { slug: 'chatbot',      label: 'Chatbot',      icon: '💬', count: categoryCounts.get('chatbot') || 0 },
  { slug: 'coding',       label: 'Kodlama',       icon: '⌨️', count: categoryCounts.get('coding') || 0 },
  { slug: 'image',        label: 'Görsel',        icon: '🎨', count: categoryCounts.get('image') || 0 },
  { slug: 'video',        label: 'Video',         icon: '🎬', count: categoryCounts.get('video') || 0 },
  { slug: 'audio',        label: 'Ses / Müzik',   icon: '🎵', count: (categoryCounts.get('audio') || 0) + (categoryCounts.get('music') || 0) },
  { slug: 'automation',   label: 'Otomasyon',     icon: '⚡', count: categoryCounts.get('automation') || 0 },
  { slug: 'writing',      label: 'Yazı',          icon: '📝', count: categoryCounts.get('writing') || 0 },
  { slug: 'research',     label: 'Araştırma',     icon: '🔍', count: categoryCounts.get('research') || 0 },
  { slug: 'presentation', label: 'Sunum',         icon: '📊', count: categoryCounts.get('presentation') || 0 },
  { slug: 'education',    label: 'Eğitim',        icon: '🎓', count: categoryCounts.get('education') || 0 },
  { slug: 'data',         label: 'Veri',          icon: '📈', count: categoryCounts.get('data') || 0 },
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
