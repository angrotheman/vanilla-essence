import { generatedClasses } from './GeneratedCSSClasses';
import { convertObjectKeyToCSSProp } from './transformValues/convertObjectKeyToCSSProp';
import { clsx } from 'clsx';
import { getOnlyProps } from './filters/getOnlyProps';
import { getOnlyStrings } from './filters/getOnlyStrings';
import { simplifyCssClasses } from './simplifyCssClasses';
import { CombinedCssProp, ResponsiveCSSProp } from './types';
import {
  responsiveStyleV2,
  ResponsiveStyleV2Props,
} from '../responsiveStyleV2';

export const cleanUpClasses = (cssClasses: Array<string>) => {
  const flattedCssClasses = simplifyCssClasses(cssClasses);

  const convertedCSSClasses = flattedCssClasses.map((cssClass) => {
    const value = generatedClasses.getByClassName(cssClass);

    if (value) {
      return convertObjectKeyToCSSProp(value);
    }

    return cssClass;
  }) as Array<CombinedCssProp | string>;

  const cssPropValues = convertedCSSClasses.filter(getOnlyProps);
  const cssStringValues = convertedCSSClasses.filter(getOnlyStrings);

  const finalResponsiveStyle: ResponsiveStyleV2Props = {};

  Object.values(cssPropValues).forEach((singleStyle) => {
    const breakpointKey = (singleStyle as ResponsiveCSSProp).breakpointKey;

    if (breakpointKey) {
      if (!finalResponsiveStyle[breakpointKey]) {
        finalResponsiveStyle[breakpointKey] = {};
      }

      // as is necessary, otherwise it will throw an error
      finalResponsiveStyle[breakpointKey][singleStyle.prop as 'background'] =
        singleStyle.value;
    } else {
      if (!finalResponsiveStyle['default']) {
        finalResponsiveStyle['default'] = {};
      }

      finalResponsiveStyle['default'][singleStyle.prop] = singleStyle.value;
    }
  });

  const finalClasses = clsx([
    cssStringValues,
    responsiveStyleV2(finalResponsiveStyle),
  ]);

  return finalClasses;
};
