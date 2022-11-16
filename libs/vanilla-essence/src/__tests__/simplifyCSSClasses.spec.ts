import { simplifyCssClasses } from '../lib/utils/simplifyCssClasses';

describe('simplifyCSSClasses', () => {
  test('array with simple classes', () => {
    expect(simplifyCssClasses(['a', 'b'])).toStrictEqual(['a', 'b']);
  });

  test('array with multiple classes in one string', () => {
    expect(simplifyCssClasses(['a', 'b c', 'd'])).toStrictEqual([
      'a',
      'b',
      'c',
      'd',
    ]);
  });
});
