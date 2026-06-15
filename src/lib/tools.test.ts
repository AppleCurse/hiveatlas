import { getAlternatives, Tool, tools } from './tools';

describe('getAlternatives', () => {
  const mockTools: Partial<Tool>[] = [
    {
      id: '1',
      slug: 'tool-1',
      name: 'Tool 1',
      categories: ['cat1'],
      matchScore: 10,
    },
    {
      id: '2',
      slug: 'tool-2',
      name: 'Tool 2',
      categories: ['cat1', 'cat2'],
      matchScore: 20,
    },
    {
      id: '3',
      slug: 'tool-3',
      name: 'Tool 3',
      categories: ['cat2'],
      matchScore: 5,
    },
    {
      id: '4',
      slug: 'tool-4',
      name: 'Tool 4',
      categories: ['cat1'],
      matchScore: 15,
    },
  ];

  const toolList = mockTools as Tool[];

  it('should return empty array if slug is not found', () => {
    const result = getAlternatives('non-existent', 5, toolList);
    expect(result).toEqual([]);
  });

  it('should return empty array if no alternatives are found', () => {
    const uniqueTool: Tool[] = [
      {
        id: 'unique',
        slug: 'unique-tool',
        categories: ['unique-cat'],
      } as Tool
    ];
    const result = getAlternatives('unique-tool', 5, uniqueTool);
    expect(result).toEqual([]);
  });

  it('should return matching tools in the same category, excluding the source tool', () => {
    const result = getAlternatives('tool-1', 5, toolList);
    expect(result.length).toBe(2);
    expect(result.find(t => t.slug === 'tool-1')).toBeUndefined();
    expect(result.map(t => t.slug)).toContain('tool-2');
    expect(result.map(t => t.slug)).toContain('tool-4');
  });

  it('should sort alternatives by matchScore in descending order', () => {
    const result = getAlternatives('tool-1', 5, toolList);
    expect(result[0].slug).toBe('tool-2'); // matchScore 20
    expect(result[1].slug).toBe('tool-4'); // matchScore 15
  });

  it('should respect the limit parameter', () => {
    const result = getAlternatives('tool-1', 1, toolList);
    expect(result.length).toBe(1);
    expect(result[0].slug).toBe('tool-2');
  });

  it('should return tools from any overlapping category', () => {
    const result = getAlternatives('tool-2', 5, toolList);
    // tool-2 has ['cat1', 'cat2']
    // tool-1 has ['cat1'] -> match
    // tool-3 has ['cat2'] -> match
    // tool-4 has ['cat1'] -> match
    expect(result.length).toBe(3);
    expect(result.map(t => t.slug)).toContain('tool-1');
    expect(result.map(t => t.slug)).toContain('tool-3');
    expect(result.map(t => t.slug)).toContain('tool-4');
  });

  it('should use default tools if toolList is not provided (smoke test)', () => {
    // This assumes there are some tools in the actual tools array
    const firstTool = tools[0];
    if (firstTool) {
      const result = getAlternatives(firstTool.slug);
      // We just want to make sure it doesn't crash and returns an array
      expect(Array.isArray(result)).toBe(true);
    }
  });
});
