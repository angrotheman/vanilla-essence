import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import { InitStyleConfig } from '../types';
import { createColorProperties } from './colorProperties/createColorProperies';
import { createFontProperties } from './fontProperties/createFontProperties';

export const createThemeSprinkles = <C extends InitStyleConfig>({
  config,
}: {
  config: C;
}) => {
  const colorProperties = createColorProperties({ config });
  const fontProperties = createFontProperties({ config });

  return createSprinkles(
    defineProperties(colorProperties),
    defineProperties(fontProperties)
  );
};

/*
const testSprinkles = createThemeSprinkles({
  config: {
    fontFamilies: {
      sans: 'sans-serif',
    },
    fontWeights: {
      bold: 500,
    },
    colors: {
      red: '#ff0000',
    },
    opacities: {
      10: 0.1,
      30: 0.3,
    },
  },
});

const foo = testSprinkles({
  backgroundColor: { default: 'red', hover: 'red' },
  backgroundColorOpacity: { default: 10, hover: 30 },
  borderColor: 'red',
  fontFamily: 'sans',
  fontWeight: 'bold',
});
*/
