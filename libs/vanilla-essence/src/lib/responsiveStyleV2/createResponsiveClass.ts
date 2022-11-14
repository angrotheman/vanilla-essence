import { ComplexStyleRule, style } from '@vanilla-extract/css';
import { convertCSSValue } from '../utils/convertCSSValue';
import { generatedClasses } from '../utils/GeneratedCSSClasses';
import { ResponsiveCSSProp } from '../utils/types';
import { createResponsiveMagicValueCSSClass } from './createResponsiveMagicValues';
import { generatedMediaQueries } from './generatedMediaQueries';

const createResponsiveClass = ({
  prop,
  value,
  breakpointKey,
}: ResponsiveCSSProp) => {
  const styleConfig: ComplexStyleRule = {
    '@media': {
      [generatedMediaQueries[breakpointKey]]: {
        [prop]: convertCSSValue({ prop, value }),
      },
    },
  };

  return style(styleConfig);
};

export const createOrReuseResponsiveClass = (config: ResponsiveCSSProp) => {
  if (config.prop in createResponsiveMagicValueCSSClass) {
    return createResponsiveMagicValueCSSClass[
      config.prop as keyof typeof createResponsiveMagicValueCSSClass
    ](config.value, config.breakpointKey);
  } else {
    if (!generatedClasses.has(config)) {
      const generatedClass = createResponsiveClass(config);

      generatedClasses.set(config, generatedClass);
    }

    return generatedClasses.get(config);
  }
};
