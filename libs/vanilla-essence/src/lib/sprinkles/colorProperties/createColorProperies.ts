import { InitStyleConfig } from '../../types';
import { createConditions } from './createConditions';
import { generateColorValues } from './generateColorValues';

export const createColorProperties = <C extends InitStyleConfig>({
  config,
}: {
  config: C;
}) => {
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

  const conditions = createConditions(config.darkMode as C['darkMode']);

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
