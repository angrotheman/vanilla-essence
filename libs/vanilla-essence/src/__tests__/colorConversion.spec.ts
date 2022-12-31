import {
  convertToRgbColors,
  generateOpacityValues,
} from '../lib/sprinkles/colorProperties/colorConversion';

describe('convertToCssColors', () => {
  test('simple conversion', () => {
    expect(
      convertToRgbColors({
        colors: {
          blue: '#4183c4',
          red: '#ff0000',
        },
        alphaVar: 'var(--alpha-var)',
      })
    ).toStrictEqual({
      blue: 'rgb(65 131 196 / var(--alpha-var))',
      red: 'rgb(255 0 0 / var(--alpha-var))',
    });
  });
});

describe('generateOpacityValues', () => {
  test('simple conversion', () => {
    expect(
      generateOpacityValues({
        opacityConfig: {
          10: 0.1,
          100: 1,
        },
        alphaVar: 'var(--alpha-var)',
      })
    ).toStrictEqual({
      10: {
        vars: {
          'var(--alpha-var)': '0.1',
        },
      },
      100: {
        vars: {
          'var(--alpha-var)': '1',
        },
      },
    });
  });
});
