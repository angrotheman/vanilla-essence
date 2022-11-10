import { styleV2 } from './styleV2';
import { responsiveStyleV2 } from './responsiveStyleV2';
import { AvailableBreakpoints } from './generatedMediaQueries';

const magicProps = {
  paddingX: ['paddingLeft', 'paddingRight'],
  paddingY: ['paddingTop', 'paddingBottom'],
  marginX: ['marginLeft', 'marginRight'],
  marginY: ['marginTop', 'marginBottom'],
};

export type MagicValueKeys = keyof typeof magicProps;

export type MagicValueObject = { [k in MagicValueKeys]?: number | string };

type MagicValues = {
  [k in MagicValueKeys]: (value: number | string) => string;
};

export const magicValues: MagicValues = Object.assign(
  {},
  ...Object.entries(magicProps).map(([key, values]) => {
    const typedKey = key as MagicValueKeys;

    const magicValue = (value: number | string) =>
      styleV2(
        Object.assign({}, ...values.map((cssProp) => ({ [cssProp]: value })))
      );

    return { [typedKey]: magicValue };
  })
);

type ResponsiveMagicValues = {
  [k in MagicValueKeys]: (
    value: number | string,
    breakpointKey: AvailableBreakpoints
  ) => string;
};

export const responsiveMagicValues: ResponsiveMagicValues = Object.assign(
  {},
  ...Object.entries(magicProps).map(([key, values]) => {
    const typedKey = key as MagicValueKeys;

    const magicValue = (
      value: number | string,
      breakpointKey: AvailableBreakpoints
    ) =>
      responsiveStyleV2({
        [breakpointKey]: Object.assign(
          {},
          ...values.map((cssProp) => ({ [cssProp]: value }))
        ),
      });

    return { [typedKey]: magicValue };
  })
);
