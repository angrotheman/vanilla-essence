import { CSSProperties } from '@vanilla-extract/css';
import {
  ClassNames,
  FeatureQueries,
  StyleRule,
  StyleWithSelectors,
} from '@vanilla-extract/css/dist/declarations/src/types';

export type StyleValue = string | number;

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type MagicPropsRule<C extends MagicPropsConfig> = {
  [k in keyof C]?: StyleValue;
};

export type MagicUtilsRule<C extends MagicUtilsConfig> = {
  [k in keyof C]?: StyleValue;
};

export type CustomStyleRule = Record<string, unknown>;

type SingleComplexStyleRule<C extends InitStyleConfig> = StyleRule &
  MagicPropsRule<C['magicProps']> &
  MagicUtilsRule<C['magicUtils']> & {
    '@responsive'?: Omit<CustomResponsiveStyle<C>, 'default'>;
  };

export type CustomComplexStyle<C extends InitStyleConfig> =
  | SingleComplexStyleRule<C>
  | Array<SingleComplexStyleRule<C> | ClassNames>;

export type CustomResponsiveStyle<C extends InitStyleConfig> = {
  default?: CustomComplexStyle<C>;
} & {
  [k in keyof C['breakpoints']]?: StyleWithSelectors &
    FeatureQueries<StyleWithSelectors> &
    MagicPropsRule<C['magicProps']> &
    MagicUtilsRule<C['magicUtils']>;
};

export type MagicPropsConfig = { [k in string]: Array<keyof CSSProperties> };
export type MagicUtilsConfig = {
  [k in string]: (val: StyleValue) => StyleRule;
};
export type RemPropListConfig = Array<keyof CSSProperties> | '*';
export type BreakpointsConfig = Readonly<{ [k in string]: number }>;

export type MagicValueMethods<K extends MagicPropsConfig> = {
  [k in keyof K]: (value: StyleValue) => StyleRule;
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

export type HEX_VAL = `#${string}`;

/**
 * all colors need to be hex values
 */
export type ColorsConfig = {
  [K in string]:
    | HEX_VAL
    | {
        [IK in string]: HEX_VAL;
      };
};

export interface InitStyleConfig {
  // useAtomicCSS?: boolean;
  darkMode?: DarkModeConfig;
  magicProps?: MagicPropsConfig;
  magicUtils?: MagicUtilsConfig;
  remPropList?: RemPropListConfig;
  breakpoints?: BreakpointsConfig;
  colors?: ColorsConfig;
  opacities?: OpacityConfig;
  fontFamilies?: FontFamilyConfig;
  fontWeights?: FontWeightConfig;
}
