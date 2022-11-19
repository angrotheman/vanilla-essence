import { CSSProperties } from '@vanilla-extract/css';
import { ClassNames } from '@vanilla-extract/css/dist/declarations/src/types';

export type CustomStyleRule = Record<string, unknown>;
export type CustomComplexStyle<CSR = CustomStyleRule> =
  | CSR
  | (CSR | ClassNames)[];

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
