import { InitStyleConfig } from '../../types';
import { generateColorValues } from './generateColorValues';

export const createColorProperties = <C extends InitStyleConfig>({
  config,
}: {
  config: C;
}) => {
  // config.colors
  // config.opacities
  // config.darkMode

  return {
    properties: Object.assign(
      {},
      generateColorValues<'backgroundColor', C>({
        config,
        property: 'backgroundColor',
      }),
      generateColorValues<'borderColor', C>({
        config,
        property: 'borderColor',
      }),
      generateColorValues<'color', C>({
        config,
        property: 'color',
      })
    ),
    conditions: {
      default: {},
      hover: { selector: '&:hover' },
      // onDark: { selector: onDark },
      // onDarkHover: { selector: `${darkThemeClass} &:hover` },
    },
    defaultCondition: 'default',
  };
};

/*
const fo = createColorProperties({
  config: {
    opacities: { 10: 0.1 },
    colors: {
      red: '#ff0000',
    },
  },
});
*/

// convert colors to rgb and usable with opacity
// check if values are hex
// add darkmode

// maybe use css.ts file insied of package and it can be a normal ts config file?
