import { CustomStyleRule } from '../../types';

export const convertCSSPropToObjectKey = (cssProp: CustomStyleRule) => {
  return Object.values(cssProp)
    .flatMap((i) => i)
    .join('||');
};
