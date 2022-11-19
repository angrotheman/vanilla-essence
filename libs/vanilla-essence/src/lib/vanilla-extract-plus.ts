export { styleV2 as style } from './styleV2';
export { responsiveStyleV2 as responsiveStyle } from './responsiveStyleV2';
export { createUniqueIdentifier } from './uniqueIdentifier/index';

export { initStyle } from './initStyle';

export {
  /**
   * `style` method without any modification
   */
  style as vanillaStyle,
  createVar,
  fallbackVar,
  createTheme,
  createThemeContract,
  fontFace,
  globalFontFace,
  globalStyle,
  keyframes,
  globalKeyframes,
  assignVars,
  createContainer,
  createGlobalTheme,
  createGlobalThemeContract,
  styleVariants,
} from '@vanilla-extract/css';
