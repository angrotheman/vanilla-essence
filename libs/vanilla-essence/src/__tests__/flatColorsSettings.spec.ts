import { flatColorsSettings } from '../lib/sprinkles/colorProperties/flatColorsSettings';

describe('flatColorsSettings', () => {
  test('base colors', () => {
    expect(
      flatColorsSettings({
        red: '#red-val',
        green: {
          200: '#green-200-val',
          300: '#green-300-val',
          DEFAULT: '#green-default-val',
        },
      })
    ).toStrictEqual({
      red: '#red-val',
      green: '#green-default-val',
      'green-200': '#green-200-val',
      'green-300': '#green-300-val',
    });
  });
});
