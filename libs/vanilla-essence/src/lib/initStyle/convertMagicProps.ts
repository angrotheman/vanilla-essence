import { StyleRule } from '@vanilla-extract/css';
import includes from '../utils/tsSafeMethods/includes';
import { createMagicValueCSSClasses } from './createMagicValueCSSClasses';

export const convertMagicProps = <
  T extends StyleRule,
  M extends ReturnType<typeof createMagicValueCSSClasses>
>({
  styleRule,
  magicValueMethods,
}: {
  styleRule: T;
  magicValueMethods: M;
}): StyleRule => {
  const magicPropsKeys = Object.keys(magicValueMethods);
  let copiedStyleRule = { ...styleRule };

  Object.entries(copiedStyleRule)
    .filter(([styleProp]) => includes(magicPropsKeys, styleProp))
    .forEach(([styleProp, value]) => {
      copiedStyleRule = {
        ...copiedStyleRule,
        ...magicValueMethods[styleProp](value as string | number),
      };
      delete copiedStyleRule[styleProp];
    });

  return copiedStyleRule;
};
