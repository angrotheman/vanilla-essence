import { CSSProperties, StyleRule } from '@vanilla-extract/css';
import { ClassNames } from '@vanilla-extract/css/dist/declarations/src/types';
import { MagicValueObject } from './magicValues';
import { AvailableBreakpoints } from './generatedMediaQueries';

export type CSSProp = {
  prop: keyof CSSProperties;
  value: string | number;
};

export type ResponsiveCSSProp = CSSProp & {
  breakpointKey: AvailableBreakpoints;
};

export type StyleRuleWithMagicValues = StyleRule & MagicValueObject;

export type StyleV2Props =
  | StyleRuleWithMagicValues
  | (StyleRuleWithMagicValues | ClassNames)[];
