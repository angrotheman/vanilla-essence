import type { InitStyleConfig } from '../types';
import { createMagicValueCSSClasses } from '../utils/createMagicValueCSSClasses';
import { createThemeSprinkles } from '../sprinkles/createThemeSprinkles';
import { createCompleteStyle } from './createCompleteStyle';
// import { createCompleteResponsiveStyle } from './createCompleteResponsiveStyle';

export const initStyle = <C extends InitStyleConfig>(config: C) => {
  // type ResponsiveStyleProps = CustomResponsiveStyle<C>;

  // ------

  const magicValueMethods = createMagicValueCSSClasses<C['magicProps']>(
    config['magicProps']
  );

  // ------

  const completeStyle = createCompleteStyle({ config, magicValueMethods });

  /*
  const completeResponsiveStyle = createCompleteResponsiveStyle({
    config,
    magicValueMethods,
  });
  */

  const sprinkles = createThemeSprinkles({ config });

  return {
    style: completeStyle,
    // responsiveStyle: completeResponsiveStyle,
    themeSprinkles: sprinkles,
  };
};
