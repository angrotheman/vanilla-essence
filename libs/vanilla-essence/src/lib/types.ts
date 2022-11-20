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
export type RemPropListConfig = Array<keyof CSSProperties>;
export type BreakpointsConfig = { [k in string]: number };

export type MagicValueMethods<K extends MagicPropsConfig> = {
  [k in keyof K]: (value: number | string) => StyleRule;
};

export interface InitStyleConfig {
  useAtomicCSS?: boolean;
  magicProps?: MagicPropsConfig;
  remPropList?: RemPropListConfig;
  breakpoints?: BreakpointsConfig;
}
