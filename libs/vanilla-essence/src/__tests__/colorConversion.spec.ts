import {
  convertToRgbColors,
  generateOpacityValues,
} from '../lib/sprinkles/colorProperties/colorConversion';

jest.mock('hex-rgb', () => {
  return {
    default: () => ({ red: 1, green: 1, blue: 1, alpha: 1 }),
  };
});

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
      blue: 'rgb(1 1 1 / var(--alpha-var, 1))',
      red: 'rgb(1 1 1 / var(--alpha-var, 1))',
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
