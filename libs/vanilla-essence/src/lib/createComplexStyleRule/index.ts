import { cleanUpGivenStyle } from '../utils/cleanUpGivenStyle';
import {
  CustomComplexStyle,
  InitStyleConfig,
  MagicValueMethods,
} from '../types';
import { convertSingleStyleRule } from './convertSingleStyleRule';

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
    convertSingleStyleRule({ styleRule, config, magicValueMethods })
  );

  /*
  if (config.useAtomicCSS) {
    return ['atomic-will-come'];
  }
  */

  return [...classNames, ...convertedStyleRules];
};
