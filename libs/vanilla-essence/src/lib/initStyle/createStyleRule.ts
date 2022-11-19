import { cleanUpGivenStyle } from './cleanUpGivenStyle';
import { convertMagicProps } from './convertMagicProps';
import { convertToRemValues } from './convertToRemValues';
import { createMagicValueCSSClasses } from './createMagicValueCSSClasses';
import { CustomComplexStyle, CustomStyleRule, InitStyleConfig } from './types';

const convertStyleRule = <
  CSR extends CustomStyleRule,
  C extends InitStyleConfig
>({
  styleRule,
  config,
  magicValueMethods,
}: {
  styleRule: CSR;
  config: C;
  magicValueMethods: ReturnType<typeof createMagicValueCSSClasses>;
}) => {
  /*
  let copiedStyleRule = { ...styleRule };

  const test = Object.entries(copiedStyleRule).forEach(([prop, val]) => {

  });
  */

  const convertedMagicProps = convertMagicProps({
    styleRule,
    magicValueMethods,
  });

  const convertedRemValues = convertToRemValues({
    remPropList: config.remPropList,
    styleRule: convertedMagicProps,
  });

  return convertedRemValues;
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
  magicValueMethods: ReturnType<typeof createMagicValueCSSClasses>;
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
