import {
  CustomComplexStyle,
  InitStyleConfig,
  MagicValueMethods,
} from '../types';
import { style as vanillaStyle } from '@vanilla-extract/css';
import { createComplexStyleRule } from '../createComplexStyleRule';

export const createCompleteStyle = <C extends InitStyleConfig>({
  config,
  magicValueMethods,
}: {
  config: C;
  magicValueMethods: MagicValueMethods<C['magicProps']>;
}) => {
  type StyleProps = CustomComplexStyle<C>;

  const completeStyle = (givenStyle: StyleProps) =>
    vanillaStyle(
      createComplexStyleRule({
        givenStyle,
        config,
        magicValueMethods,
      })
    );

  return completeStyle;
};
