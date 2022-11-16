import { CSSProperties, StyleRule } from '@vanilla-extract/css';
import { ClassNames } from '@vanilla-extract/css/dist/declarations/src/types';
import { AvailableBreakpoints } from '../responsiveStyleV2/generatedMediaQueries';
import config from '../../config/default';

const { magicProps } = config;

export type CSSProp = {
  prop: keyof CSSProperties;
  value: string | number;
};

export type ResponsiveCSSProp = CSSProp & {
  breakpointKey: AvailableBreakpoints;
};

export type CombinedCssProp = CSSProp | ResponsiveCSSProp;

export type MagicValueKeys = keyof typeof magicProps;

export type MagicValueObject = { [k in MagicValueKeys]?: number | string };

export type StyleRuleWithMagicValues = StyleRule & MagicValueObject;

export type StyleV2Props =
  | StyleRuleWithMagicValues
  | (StyleRuleWithMagicValues | ClassNames)[];
