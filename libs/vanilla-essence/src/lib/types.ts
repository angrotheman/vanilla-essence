import { CSSProperties } from '@vanilla-extract/css';
import {
  ClassNames,
  FeatureQueries,
  StyleRule,
  StyleWithSelectors,
} from '@vanilla-extract/css/dist/declarations/src/types';

export type MagicPropsRule<C extends MagicPropsConfig> = {
  [k in keyof C]?: number | string;
};

export type CustomStyleRule = Record<string, unknown>;
export type CustomComplexStyle<C extends InitStyleConfig> =
  | (StyleRule & MagicPropsRule<C['magicProps']>)
  | Array<(StyleRule & MagicPropsRule<C['magicProps']>) | ClassNames>;

export type CustomResponsiveStyle<C extends InitStyleConfig> = {
  default?: CustomComplexStyle<C>;
} & {
  [k in keyof C['breakpoints']]?: StyleWithSelectors &
    FeatureQueries<StyleWithSelectors> &
    MagicPropsRule<C['magicProps']>;
};

export type MagicPropsConfig = { [k in string]: Array<keyof CSSProperties> };
export type RemPropListConfig = Array<keyof CSSProperties> | '*';
export type BreakpointsConfig = Readonly<{ [k in string]: number }>;

export type MagicValueMethods<K extends MagicPropsConfig> = {
  [k in keyof K]: (value: number | string) => StyleRule;
};

export type DarkModeMediaConfig = {
  type: 'media';
};

export type DarkModeClassConfig = {
  type: 'class';
  className: string;
};

export type DarkModeDisabledConfig = {
  type: 'disabled';
};

export type DarkModeConfig =
  | DarkModeClassConfig
  | DarkModeMediaConfig
  | DarkModeDisabledConfig;

export type FontFamilyConfig = {
  [k in string]: string;
};

export type FontWeightConfig = {
  [k in string]: number | string;
};

export type OpacityConfig = {
  [k in string]: number;
};

/**
 * all colors need to be hex values
 */
export type ColorsConfig = {
  [k in string]: string;
};

export interface InitStyleConfig {
  // useAtomicCSS?: boolean;
  darkMode?: DarkModeConfig;
  magicProps?: MagicPropsConfig;
  remPropList?: RemPropListConfig;
  breakpoints?: BreakpointsConfig;
  colors?: ColorsConfig;
  opacities?: OpacityConfig;
  fontFamilies?: FontFamilyConfig;
  fontWeights?: FontWeightConfig;
}
