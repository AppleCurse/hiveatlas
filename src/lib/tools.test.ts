import { searchTools } from './tools';

describe('searchTools', () => {
    it('returns tools based on query', () => {
        expect(searchTools('ai')).toBeDefined();
    });
});
