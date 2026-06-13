import { MetadataRoute } from 'next';
import { tools, escapeModes } from '@/lib/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://creativeelephant.com.tr'; // Change to actual domain when known

  // Static routes
  const routes = [
    '',
    '/matrix',
    '/stacks',
    '/compare',
    '/wizard',
    '/search',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Tool details pages
  const toolRoutes = tools.map((tool) => ({
    url: `${baseUrl}/tool/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Tool alternatives pages
  const alternativesRoutes = tools.map((tool) => ({
    url: `${baseUrl}/alternatives/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Categories pages
  const categories = Array.from(new Set(tools.flatMap(t => t.categories)));
  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Escape modes pages
  const escapeRoutes = escapeModes.map((escape) => ({
    url: `${baseUrl}/escape/${escape.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...toolRoutes, ...alternativesRoutes, ...categoryRoutes, ...escapeRoutes];
}
