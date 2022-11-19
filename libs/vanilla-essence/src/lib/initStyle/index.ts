import type {
  CustomComplexStyle,
  CustomResponsiveStyle,
  InitStyleConfig,
} from './types';
import { createMagicValueCSSClasses } from './createMagicValueCSSClasses';
import { createComplexStyleRule } from './createComplexStyleRule';
import { style as vanillaStyle } from '@vanilla-extract/css';
import { createResponsiveStyleRule } from './createResponsiveStyleRule';

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

  return {
    style: completeStyle,
    responsiveStyle: completeResponsiveStyle,
  };
};

// maybe save order of styles (does it make sense?????)
// convert magicProps and rem sizes
// maybe use generatedCssClasses class inside of initStyle and not as a reference
// if atomic css and longhands --> check that values are no numbers anymore / or maybe style can do that internally??
// add responsive css
