import { convertPxToRem } from '../utils/transformValues/convertPxToRem';
import { cleanUpGivenStyle } from './cleanUpGivenStyle';
import {
  CustomComplexStyle,
  CustomStyleRule,
  InitStyleConfig,
  MagicValueMethods,
} from './types';
import { CSSProperties, StyleRule } from '@vanilla-extract/css';

export const convertStyleRule = <
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
  let convertedStyleRule = { ...styleRule };

  Object.entries(styleRule).forEach(([prop, val]) => {
    let convertedVal = val;

    if (typeof val === 'object' && !Array.isArray(val)) {
      convertedVal = convertStyleRule({
        styleRule: val as CustomStyleRule,
        config,
        magicValueMethods,
      });
    }

    // rem conversion
    if (
      config.remPropList.includes(prop as keyof CSSProperties) &&
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
      const convertedMagicValues = magicValueMethods[prop](val);

      delete convertedStyleRule[prop];
      convertedStyleRule = {
        ...convertedStyleRule,
        ...convertedMagicValues,
      };
      return;
    }

    (convertedStyleRule as CustomStyleRule)[prop] = convertedVal;
  });

  return convertedStyleRule;
};

export const createComplexStyleRule = <
  CSR extends CustomComplexStyle<C>,
  C extends InitStyleConfig
>({
  givenStyle,
  config,
  magicValueMethods,
}: {
  givenStyle: CSR;
  config: C;
  magicValueMethods: MagicValueMethods<C['magicProps']>;
}) => {
  const { classNames, styleRules } = cleanUpGivenStyle(givenStyle);

  const convertedStyleRules = styleRules.map((styleRule) =>
    convertStyleRule({ styleRule, config, magicValueMethods })
  );

  if (config.useAtomicCSS) {
    return ['atomic-will-come'];
  }

  return [...classNames, ...convertedStyleRules];
};
