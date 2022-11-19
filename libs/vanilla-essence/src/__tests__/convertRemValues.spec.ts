import { convertToRemValues } from '../lib/initStyle/convertToRemValues';

describe('convertRemValues', () => {
  test('convert number to rem', () => {
    expect(
      convertToRemValues({
        styleRule: { fontSize: 12 },
        remPropList: ['fontSize'],
      })
    ).toStrictEqual({ fontSize: '0.75rem' });
  });

  test('don´t convert number to rem', () => {
    expect(
      convertToRemValues({
        styleRule: { fontSize: 12 },
        remPropList: [],
      })
    ).toStrictEqual({ fontSize: 12 });
  });
});
