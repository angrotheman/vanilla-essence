import {
  CustomResponsiveStyle,
  InitStyleConfig,
  MagicValueMethods,
} from '../types';
import { style as vanillaStyle } from '@vanilla-extract/css';
import { createResponsiveStyleRule } from '../createResponsiveStyleRule';

export const createCompleteResponsiveStyle = <C extends InitStyleConfig>({
  config,
  magicValueMethods,
}: {
  config: C;
  magicValueMethods: MagicValueMethods<C['magicProps']>;
}) => {
  type ResponsiveStyleProps = CustomResponsiveStyle<C>;

  const completeResponsiveStyle = (
    givenResponsiveStyle: ResponsiveStyleProps
  ) =>
    vanillaStyle(
      createResponsiveStyleRule({
        givenResponsiveStyle,
        config,
        magicValueMethods,
      })
    );

  return completeResponsiveStyle;
};
