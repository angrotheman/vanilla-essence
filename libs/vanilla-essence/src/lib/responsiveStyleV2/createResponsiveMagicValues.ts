import { MagicValueKeys } from '../utils/types';
import { AvailableBreakpoints } from './generatedMediaQueries';
import config from '../../config/default';
import { responsiveStyleV2 } from './index';

const { magicProps } = config;

type ResponsiveMagicValues = {
  [k in MagicValueKeys]: (
    value: number | string,
    breakpointKey: AvailableBreakpoints
  ) => string;
};

export const createResponsiveMagicValueCSSClass: ResponsiveMagicValues =
  Object.assign(
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
            ...values.map((cssProp: string) => ({ [cssProp]: value }))
          ),
        });

      return { [typedKey]: magicValue };
    })
  );
