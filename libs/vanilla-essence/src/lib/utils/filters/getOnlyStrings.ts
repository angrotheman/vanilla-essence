import { CSSProp } from '../types';

export const getOnlyStrings = <T extends string | CSSProp>(
  cssClass: T
): cssClass is Exclude<T, CSSProp> => typeof cssClass === 'string';
