import { InitStyleConfig } from '../../types';
import { generateColorValues } from './generateColorValues';

export const createColorProperties = <C extends InitStyleConfig>({
  config,
}: {
  config: C;
}) => {
  // config.darkMode

  const properties = {
    ...generateColorValues<'backgroundColor', C>({
      property: 'backgroundColor',
      config,
    }),
    ...generateColorValues<'borderColor', C>({
      property: 'borderColor',
      config,
    }),
    ...generateColorValues<'color', C>({
      property: 'color',
      config,
    }),
  };

  const conditions = {
    default: {},
    hover: { selector: '&:hover' },
    // onDark: { selector: onDark },
    // onDarkHover: { selector: `${darkThemeClass} &:hover` },
  };

  const defaultCondition = 'default' as const;

  return {
    properties,
    conditions,
    defaultCondition,
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
