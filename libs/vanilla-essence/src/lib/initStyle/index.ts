import type { InitStyleConfig } from '../types';
import { createThemeSprinkles } from '../sprinkles/createThemeSprinkles';
import { createCompleteStyle } from './createCompleteStyle';
import { createPickColor } from '../createPickColor/index';
import { createDarkModeSelector } from '../createDarkModeSelector';

export const initStyle = <C extends InitStyleConfig>(config: C) => {
  const completeStyle = createCompleteStyle({ config });

  const pickColor = createPickColor({ config });
  const darkMode = createDarkModeSelector({ config });

  const sprinkles = createThemeSprinkles({ config });

  return {
    style: completeStyle,
    pickColor: pickColor,
    onDarkMode: darkMode,
    themeSprinkles: sprinkles,
  };
};
