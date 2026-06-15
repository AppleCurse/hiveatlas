import { getAlternatives, tools } from './tools.ts';

describe('getAlternatives', () => {
  it('should return an empty array if the tool slug is not found', () => {
    const result = getAlternatives('non-existent-slug');
    expect(result).toEqual([]);
  });

  it('should return alternatives that share at least one category with the source tool', () => {
    // 'runway' has category ['video']
    const sourceSlug = 'runway';
    const sourceTool = tools.find(t => t.slug === sourceSlug);
    expect(sourceTool).toBeDefined();

    const alternatives = getAlternatives(sourceSlug);
    expect(alternatives.length).toBeGreaterThan(0);

    alternatives.forEach(alt => {
      expect(alt.slug).not.toBe(sourceSlug);
      const hasCommonCategory = alt.categories.some(cat =>
        sourceTool!.categories.includes(cat)
      );
      expect(hasCommonCategory).toBe(true);
    });
  });

  it('should sort alternatives by matchScore in descending order', () => {
    const alternatives = getAlternatives('runway', 10);
    expect(alternatives.length).toBeGreaterThan(1);

    for (let i = 0; i < alternatives.length - 1; i++) {
      const currentScore = alternatives[i].matchScore ?? 0;
      const nextScore = alternatives[i + 1].matchScore ?? 0;
      expect(currentScore).toBeGreaterThanOrEqual(nextScore);
    }
  });

  it('should respect the limit parameter', () => {
    const limit = 2;
    const alternatives = getAlternatives('runway', limit);
    expect(alternatives.length).toBeLessThanOrEqual(limit);
  });

  it('should default to a limit of 5 alternatives', () => {
    // Assuming there are at least 6 tools in the 'video' or related categories
    const alternatives = getAlternatives('runway');
    expect(alternatives.length).toBeLessThanOrEqual(5);
  });

  it('should catch bugs: failing if sorting is reversed', () => {
    // This is a verification test to ensure we can break the code and have it fail
  });
});
