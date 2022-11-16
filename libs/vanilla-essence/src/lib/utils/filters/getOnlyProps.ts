import { CSSProp } from '../types';

export const getOnlyProps = <T extends string | CSSProp>(
  cssClass: T
): cssClass is Exclude<T, string> => typeof cssClass !== 'string';
