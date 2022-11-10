import { breakpoints } from './responsiveStyleV2';

export type AvailableBreakpoints = keyof typeof breakpoints;

export const generatedMediaQueries: {
  [k in AvailableBreakpoints]: `(min-width: ${typeof breakpoints[k]}px)`;
} = Object.assign(
  {},
  ...Object.entries(breakpoints).map(([key, minW]) => ({
    [key]: `screen and (min-width: ${minW}px)`,
  }))
);
