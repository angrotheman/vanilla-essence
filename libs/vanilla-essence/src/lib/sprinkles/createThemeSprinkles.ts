import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import { InitStyleConfig } from '../types';
import { createColorProperties } from './colorProperties/createColorProperies';

export const createThemeSprinkles = <C extends InitStyleConfig>({
  config,
}: {
  config: C;
}) => {
  return createSprinkles(defineProperties(createColorProperties({ config })));
};

// font families
//
