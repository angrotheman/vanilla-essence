import { CombinedCssProp } from '../types';

export const convertCSSPropToObjectKey = (cssProp: CombinedCssProp) => {
  return Object.values(cssProp)
    .flatMap((i) => i)
    .join('||');
};
