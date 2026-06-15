import { getAlternatives, tools, Tool } from '../tools';

describe('getAlternatives', () => {
  it('should be defined', () => {
    expect(getAlternatives).toBeDefined();
  });

  it('should return alternatives based on categories', () => {
    // Bulunan ilk öğeyi al
    const tool = tools[0];
    if (!tool) return;

    // Testleri yap
    const alternatives = getAlternatives(tool.slug);
    expect(Array.isArray(alternatives)).toBe(true);

    // Dönen tüm alternatifler orijinal kategorilerden en az birine sahip olmalıdır
    alternatives.forEach(alt => {
      const hasSharedCategory = alt.categories.some(c => tool.categories.includes(c));
      expect(hasSharedCategory).toBe(true);
      // Kendi kendisini döndürmemeli
      expect(alt.slug).not.toBe(tool.slug);
    });
  });

  it('should respect the limit parameter', () => {
    const tool = tools[0];
    if (!tool) return;

    // Varsayılan limit 5
    let alternatives = getAlternatives(tool.slug);
    expect(alternatives.length).toBeLessThanOrEqual(5);

    // Özel limit
    alternatives = getAlternatives(tool.slug, 2);
    expect(alternatives.length).toBeLessThanOrEqual(2);
  });

  it('should return empty array for non-existent slug', () => {
    const alternatives = getAlternatives('non-existent-slug-123456');
    expect(alternatives).toEqual([]);
    expect(alternatives.length).toBe(0);
  });

  it('should sort alternatives by matchScore in descending order', () => {
    // ChatGPT'yi referans alalım (en azından kategorisi olan çok fazla tool var)
    const chatgptTool = tools.find(t => t.slug === 'chatgpt');
    if (!chatgptTool) return;

    const alternatives = getAlternatives(chatgptTool.slug, 10);

    // Check sorting
    for (let i = 0; i < alternatives.length - 1; i++) {
      const currentScore = alternatives[i].matchScore ?? 0;
      const nextScore = alternatives[i+1].matchScore ?? 0;
      expect(currentScore).toBeGreaterThanOrEqual(nextScore);
    }
  });

  it('should return an empty array if source tool exists but has no matching categories', () => {
    const dummySlug = 'test-isolated-tool-xyz';
    const dummyTool: Tool = {
      id: '999',
      slug: dummySlug,
      name: 'Isolated Tool',
      tagline: 'Test Tool',
      website: 'https://test.com',
      icon: '🧪',
      categories: ['SuperUniqueCategory12345'],
      useCases: [],
      targetUsers: [],
      pricingModel: 'free',
      hasFreeTier: true,
      startingPriceUsd: 0,
      apiAvailable: false,
      selfHostable: false,
      localRun: false,
      dockerSupport: false,
      ollamaSupport: false,
      openSource: false,
      ossHealthScore: 0,
      commitFrequency: 'inactive',
      wrapperDepthScore: 0,
      trustScore: 0,
      affiliateRisk: false,
      privacyScore: 'high',
      gdprCompliant: true,
      dataStored: false,
      trainsOnData: false,
      monthlyCostUsd: 0,
      matchScore: 0
    };

    tools.push(dummyTool);

    const alternatives = getAlternatives(dummySlug);
    expect(alternatives).toEqual([]);

    // Clean up
    const index = tools.findIndex(t => t.slug === dummySlug);
    if (index !== -1) {
      tools.splice(index, 1);
    }
  });
});
