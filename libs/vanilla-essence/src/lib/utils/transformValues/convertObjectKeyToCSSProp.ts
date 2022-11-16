import { CombinedCssProp, CSSProp, ResponsiveCSSProp } from '../types';

export const convertObjectKeyToCSSProp = (
  cssClass: string
): CombinedCssProp => {
  const styleSettings = cssClass.split('||');

  if (styleSettings.length === 2) {
    const [prop, value] = styleSettings;

    return { prop, value: !isNaN(Number(value)) ? Number(value) : value } as {
      prop: CSSProp['prop'];
      value: CSSProp['value'];
    };
  } else if (styleSettings.length === 3) {
    const [breakpointKey, prop, value] = styleSettings;

    return {
      breakpointKey,
      prop,
      value: !isNaN(Number(value)) ? Number(value) : value,
    } as {
      breakpointKey: ResponsiveCSSProp['breakpointKey'];
      prop: ResponsiveCSSProp['prop'];
      value: ResponsiveCSSProp['value'];
    };
  } else {
    throw new Error('something is not right here');
  }
};
