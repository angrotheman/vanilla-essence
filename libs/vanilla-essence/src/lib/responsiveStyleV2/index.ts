import {
  ComplexStyleRule,
  FeatureQueries,
  StyleWithSelectors,
} from '@vanilla-extract/css/dist/declarations/src/types';
import { styleV2 } from '../styleV2';
import { CSSProperties } from '@vanilla-extract/css';
import { AvailableBreakpoints } from './generatedMediaQueries';
import { createOrReuseResponsiveClass } from './createResponsiveClass';
import { MagicValueObject, StyleV2Props } from '../utils/types';
import { clsx } from 'clsx';

type ResponsiveStyleV2Key = 'default' | AvailableBreakpoints;

export type ResponsiveStyleV2Props = {
  default?: StyleV2Props;
} & {
  [k in AvailableBreakpoints]?: StyleWithSelectors &
    FeatureQueries<StyleWithSelectors> &
    MagicValueObject;
};

export const responsiveStyleV2 = (givenStyles: ResponsiveStyleV2Props) => {
  const givenStyleRule: ComplexStyleRule = [];

  const givenStylesKeys = Object.keys(givenStyles) as ResponsiveStyleV2Key[];

  givenStylesKeys.forEach((breakpointKey) => {
    if (breakpointKey === 'default') {
      if (givenStyles['default']) {
        givenStyleRule.push(styleV2(givenStyles['default']));
      }
    } else {
      const values = givenStyles[breakpointKey];

      Object.entries(values ?? {}).forEach(([prop, value]) => {
        givenStyleRule.push(
          createOrReuseResponsiveClass({
            breakpointKey,
            prop: prop as keyof CSSProperties,
            value,
          })
        );
      });
    }
  });

  return clsx(givenStyleRule);
};
