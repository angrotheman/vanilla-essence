import type { CustomComplexStyle, InitStyleConfig } from './types';
import { createMagicValueCSSClasses } from './createMagicValueCSSClasses';
import { createComplexStyleRule } from './createStyleRule';
import { style as vanillaStyle } from '@vanilla-extract/css';

export const initStyle = <C extends InitStyleConfig>(config: C) => {
  type StyleProps = CustomComplexStyle<C>;

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

  return {
    style: completeStyle,
    // responsiveStyle
  };
};

/*
const { style } = initStyle({
  useAtomicCSS: true,
  magicProps: {
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
  },
  remPropList: ['fontSize', 'letterSpacing', 'lineHeight'],
  breakpoints: {
    sm: 640, // maybe this should be the whole media rule for better customization
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
});

// -----------------

style({
  marginTop: 20,
  paddingX: 20,
  fontSize: 20,
});
*/

// maybe save order of styles (does it make sense?????)
// convert magicProps and rem sizes
// maybe use generatedCssClasses class inside of initStyle and not as a reference
// if atomic css and longhands --> check that values are no numbers anymore / or maybe style can do that internally??
// add responsive css
