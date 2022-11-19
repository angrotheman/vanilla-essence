import { CSSProperties } from '@vanilla-extract/css';
import {
  ClassNames,
  StyleRule,
} from '@vanilla-extract/css/dist/declarations/src/types';

export type MagicPropsRule<C extends MagicPropsConfig> = {
  [k in keyof C]?: number | string;
};

export type CustomStyleRule = Record<string, unknown>;
export type CustomComplexStyle<C extends InitStyleConfig> =
  | (StyleRule & MagicPropsRule<C['magicProps']>)
  | ((StyleRule & MagicPropsRule<C['magicProps']>) | ClassNames)[];

export type MagicPropsConfig = { [k in string]: Array<keyof CSSProperties> };
export type RemPropListConfig = Array<keyof CSSProperties>;
export type BreakpointsConfig = { [k in string]: number };

export type InitStyleConfig = {
  useAtomicCSS?: boolean;
  magicProps?: MagicPropsConfig;
  remPropList?: RemPropListConfig;
  breakpoints?: BreakpointsConfig;
};

// type BetterBreakpointsConfig<C extends { [k in string]: number }> = C;
// type usingBreakpointsConfig = Test<{ md: 2 }>;
