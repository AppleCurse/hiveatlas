import { searchTools, tools } from './tools';

describe('searchTools', () => {
  it('should return all tools when query is empty string', () => {
    const result = searchTools('');
    expect(result).toEqual(tools);
    expect(result.length).toBe(tools.length);
  });

  it('should return all tools when query is only whitespace', () => {
    const result = searchTools('   ');
    expect(result).toEqual(tools);
    expect(result.length).toBe(tools.length);
  });

  it('should return all tools when query is undefined (cast as string)', () => {
    // @ts-expect-error - testing runtime behavior for potential invalid inputs
    const result = searchTools(undefined as unknown as string);
    expect(result).toEqual(tools);
  });

  it('should return all tools when query is null (cast as string)', () => {
    // @ts-expect-error - testing runtime behavior for potential invalid inputs
    const result = searchTools(null as unknown as string);
    expect(result).toEqual(tools);
  });

  it('should perform a basic search and return results', () => {
    // Assuming 'OpenClaw' is one of the tools as seen in head output
    const query = 'OpenClaw';
    const result = searchTools(query);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].name.toLowerCase()).toContain(query.toLowerCase());
  });
});
