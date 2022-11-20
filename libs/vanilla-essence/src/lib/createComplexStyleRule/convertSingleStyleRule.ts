import { CustomStyleRule, InitStyleConfig } from '../types';
import { CSSProperties, StyleRule } from '@vanilla-extract/css';
import { convertPxToRem } from '../utils/transformValues/convertPxToRem';

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
  let convertedStyleRule = { ...styleRule };

  Object.entries(styleRule).forEach(([prop, val]) => {
    let convertedVal = val;

    if (typeof val === 'object' && !Array.isArray(val)) {
      convertedVal = convertSingleStyleRule({
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
