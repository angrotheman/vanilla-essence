import defaultConfig from '../config/default';
import { createPickColor } from '../lib/createPickColor/index';

describe('createPickColor', () => {
  const pickColor = createPickColor({
    config: defaultConfig,
  });

  test('base conversion', () => {
    expect(pickColor('blue-50', 50)).toEqual('rgb(239 246 255 / 0.5)');
  });
  test('DEFAULT value conversion', () => {
    expect(pickColor('tahiti', 75)).toEqual('rgb(6 182 212 / 0.75)');
  });
});
