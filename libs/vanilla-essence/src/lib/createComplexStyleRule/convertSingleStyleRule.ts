import {
  CustomResponsiveStyle,
  CustomStyleRule,
  InitStyleConfig,
} from '../types';
import { CSSProperties, StyleRule } from '@vanilla-extract/css';
import { convertPxToRem } from '../utils/transformValues/convertPxToRem';
import { createResponsiveStyleRule } from '../createResponsiveStyleRule/index';

const forbiddenRemValues: Array<keyof CSSProperties> = [
  'animationIterationCount',
  'borderImageOutset',
  'borderImageSlice',
  'borderImageWidth',
  'boxFlex',
  'boxFlexGroup',
  'boxOrdinalGroup',
  'columnCount',
  'flex',
  'flexGrow',
  'flexShrink',
  'fontWeight',
  'gridRowEnd',
  'gridRowStart',
  'gridColumnEnd',
  'gridColumnStart',
  'lineClamp',
  'WebkitLineClamp',
  // 'lineHeight',
  'opacity',
  'order',
  'orphans',
  'tabSize',
  'widows',
  'zIndex',
  'zoom',
  'fillOpacity',
  'floodOpacity',
  'stopOpacity',
  'strokeDasharray',
  'strokeDashoffset',
  'strokeMiterlimit',
  'strokeOpacity',
  'strokeWidth',
  'scale',
];

export const convertSingleStyleRule = <
  CSR extends CustomStyleRule,
  C extends InitStyleConfig
>({
  styleRule,
  config,
  magicValueMethods,
}: {
  styleRule: CSR;
  config: C;
  magicValueMethods: {
    [k in keyof C['magicProps']]: (value: number | string) => StyleRule;
  };
}) => {
  /**
   * complete styleRule with all pseudo elements and selectors
   */
  let convertedStyleRule = { ...styleRule };

  Object.entries(styleRule).forEach(([prop, val]) => {
    /**
     * single styleRule which can be a pseudo or selector styling
     */
    let convertedVal = val;

    if (typeof convertedVal === 'object' && !Array.isArray(val)) {
      convertedVal = convertSingleStyleRule({
        styleRule: val as CustomStyleRule,
        config,
        magicValueMethods,
      });
    }

    // rem conversion
    if (
      (config.remPropList === '*'
        ? !forbiddenRemValues.includes(prop as keyof CSSProperties)
        : config.remPropList.includes(prop as keyof CSSProperties)) &&
      typeof val === 'number'
    ) {
      convertedVal = convertPxToRem(val);
    }

    // magicProps conversion
    if (
      Object.keys(config.magicProps).includes(prop) &&
      (typeof val === 'number' || typeof val === 'string') &&
      magicValueMethods[prop]
    ) {
      const convertedMagicValues = convertSingleStyleRule({
        styleRule: magicValueMethods[prop](val) as CustomStyleRule,
        config,
        magicValueMethods,
      });

      delete convertedStyleRule[prop];
      convertedStyleRule = {
        ...convertedStyleRule,
        ...convertedMagicValues,
      };
      return;
    }

    // responsive converter
    if (prop === '@responsive') {
      const convertedResponsiveRule = createResponsiveStyleRule({
        config,
        magicValueMethods,
        givenResponsiveStyle: convertedVal as CustomResponsiveStyle<C>,
      });

      const simplifiedResponsiveRule = Object.assign(
        {},
        ...convertedResponsiveRule.map((i) => i['@media'])
      );

      delete convertedStyleRule['@responsive'];
      convertedStyleRule = {
        ...convertedStyleRule,
        '@media': {
          ...simplifiedResponsiveRule,
        },
      };

      return;
    }

    // add `content: ''` by default
    const pseudoElements = [':before', '::before', ':after', '::after'];
    if (pseudoElements.includes(prop) && typeof convertedVal === 'object') {
      convertedVal = {
        content: '',
        ...convertedVal,
      };
    }

    (convertedStyleRule as CustomStyleRule)[prop] = convertedVal;
  });

  return convertedStyleRule;
};
