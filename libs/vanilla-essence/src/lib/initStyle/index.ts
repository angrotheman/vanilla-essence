import type {
  CustomComplexStyle,
  CustomResponsiveStyle,
  InitStyleConfig,
} from '../types';
import { createMagicValueCSSClasses } from '../utils/createMagicValueCSSClasses';
import { createComplexStyleRule } from '../createComplexStyleRule';
import { style as vanillaStyle } from '@vanilla-extract/css';
import { createResponsiveStyleRule } from '../createResponsiveStyleRule';
import { createThemeSprinkles } from '../sprinkles/createThemeSprinkles';

export const initStyle = <C extends InitStyleConfig>(config: C) => {
  type StyleProps = CustomComplexStyle<C>;
  type ResponsiveStyleProps = CustomResponsiveStyle<C>;

  // ------

  const magicValueMethods = createMagicValueCSSClasses<C['magicProps']>(
    config['magicProps']
  );

  // ------

  const completeStyle = (givenStyle: StyleProps) =>
    vanillaStyle(
      createComplexStyleRule({
        givenStyle,
        config,
        magicValueMethods,
      })
    );

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

  const sprinkles = createThemeSprinkles({ config });

  return {
    style: completeStyle,
    responsiveStyle: completeResponsiveStyle,
    themeSprinkles: sprinkles,
  };
};
