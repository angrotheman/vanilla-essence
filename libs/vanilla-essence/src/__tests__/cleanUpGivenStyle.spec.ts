import { cleanUpGivenStyle } from '../lib/utils/cleanUpGivenStyle';

describe('cleanUpGivenStyle', () => {
  test('base example', () => {
    expect(cleanUpGivenStyle(['a b', 'c', ['d']])).toStrictEqual({
      classNames: ['a', 'b', 'c', 'd'],
      styleRules: [],
    });
  });

  test('remove to deep arrays', () => {
    expect(cleanUpGivenStyle(['a b', 'c', ['a'], [['d']]])).toStrictEqual({
      classNames: ['a', 'b', 'c', 'a'],
      styleRules: [],
    });
  });

  test('only one styleRule', () => {
    expect(
      cleanUpGivenStyle({ paddingX: 20, background: 'red', border: 20 })
    ).toStrictEqual({
      classNames: [],
      styleRules: [{ paddingX: 20, background: 'red', border: 20 }],
    });
  });

  test('styleRule with className', () => {
    expect(cleanUpGivenStyle(['foo', { padding: 20 }])).toStrictEqual({
      classNames: ['foo'],
      styleRules: [{ padding: 20 }],
    });
  });

  test('styleRule with array of multiple classes in one string and single class string', () => {
    expect(
      cleanUpGivenStyle([
        'foo',
        ['class-a class-b'],
        {
          margin: 20,
        },
      ])
    ).toStrictEqual({
      classNames: ['foo', 'class-a', 'class-b'],
      styleRules: [{ margin: 20 }],
    });
  });
});
