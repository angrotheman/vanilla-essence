import {
  FlatColorKeys,
  flatColorsSettings,
} from '../sprinkles/colorProperties/flatColorsSettings';
import { InitStyleConfig } from '../types';
import { hexToRgba } from '../utils/transformValues/hexToRgba';

export const createPickColor = <C extends InitStyleConfig>({
  config,
}: {
  config: C;
}) => {
  const pickColor = (
    color: FlatColorKeys<C['colors']>,
    opacity: number = 100
  ) => {
    const convertedColors = flatColorsSettings(config.colors);

    return hexToRgba(convertedColors[color as any], opacity / 100);
  };

  return pickColor;
};
