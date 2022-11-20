export { createUniqueIdentifier } from './uniqueIdentifier/index';

export { initStyle } from './initStyle';

export { defineConfig } from './defineConfig';

export {
  /**
   * @description `style` method without any modification
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
