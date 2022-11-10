import { CSSProp, ResponsiveCSSProp } from './types';
import { ComplexStyleRule, CSSProperties, style } from '@vanilla-extract/css';
import { generatedMediaQueries } from './generatedMediaQueries';
import { magicValues, responsiveMagicValues } from './magicValues';
import { GeneratedCSSClasses } from './GeneratedCSSClasses';
import { convertPxToRem } from './transformValues/convertPxToRem';

const generatedClasses = new GeneratedCSSClasses();

const convertValue = ({ prop, value }: CSSProp) => {
  // should convert to rem
  const propList: Array<keyof CSSProperties> = [
    'fontSize',
    'letterSpacing',
    'lineHeight',
  ];

  if (typeof value === 'number' && propList.includes(prop)) {
    return convertPxToRem(value);
  }
  return value;
};

const createClass = ({ prop, value }: CSSProp) => {
  return style({ [prop]: convertValue({ prop, value }) });
};

const createResponsiveClass = ({
  prop,
  value,
  breakpointKey,
}: ResponsiveCSSProp) => {
  let styleConfig: ComplexStyleRule = {};

  styleConfig = {
    '@media': {
      [generatedMediaQueries[breakpointKey]]: {
        [prop]: convertValue({ prop, value }),
      },
    },
  };

  return style(styleConfig);
};

export const createOrReuseResponsiveClass = (config: ResponsiveCSSProp) => {
  if (config.prop in magicValues) {
    return responsiveMagicValues[config.prop as keyof typeof magicValues](
      config.value,
      config.breakpointKey
    );
  } else {
    if (!generatedClasses.has(config)) {
      const generatedClass = createResponsiveClass(config);

      generatedClasses.set(config, generatedClass);
    }

    return generatedClasses.get(config);
  }
};

export const createOrReuseClass = (config: CSSProp) => {
  if (config.prop in magicValues) {
    return magicValues[config.prop as keyof typeof magicValues](config.value);
  } else {
    if (!generatedClasses.has(config)) {
      const generatedClass = createClass(config);

      generatedClasses.set(config, generatedClass);
    }

    return generatedClasses.get(config);
  }
};
