import {
  ComplexStyleRule,
  FeatureQueries,
  StyleWithSelectors,
} from '@vanilla-extract/css/dist/declarations/src/types';
import { MagicValueObject } from './magicValues';
import { styleV2 } from './styleV2';
import { CSSProperties } from '@vanilla-extract/css';
import { createOrReuseResponsiveClass } from './createClass';

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

type ResponsiveStyleV2Keys = 'default' | keyof typeof breakpoints;

type ResponsiveStyleV2Props = {
  [k in ResponsiveStyleV2Keys]?: StyleWithSelectors &
    FeatureQueries<StyleWithSelectors> &
    MagicValueObject;
};

export const responsiveStyleV2 = (givenStyles: ResponsiveStyleV2Props) => {
  const givenStyleRule: ComplexStyleRule = [];

  const givenStylesKeys = Object.keys(givenStyles) as Array<
    keyof typeof givenStyles
  >;

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

  return styleV2(givenStyleRule);
};
