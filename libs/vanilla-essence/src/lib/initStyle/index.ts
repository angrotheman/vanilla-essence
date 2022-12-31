import type { InitStyleConfig } from '../types';
import { createThemeSprinkles } from '../sprinkles/createThemeSprinkles';
import { createCompleteStyle } from './createCompleteStyle';

export const initStyle = <C extends InitStyleConfig>(config: C) => {
  const completeStyle = createCompleteStyle({ config });

  const sprinkles = createThemeSprinkles({ config });

  return {
    style: completeStyle,
    themeSprinkles: sprinkles,
  };
};
