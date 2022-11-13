import { CSSProp } from './types';
import { convertPxToRem } from './transformValues/convertPxToRem';
import includes from './tsSafeMethods/includes';
import config from '../../config/default';

const { remPropList } = config;

export const convertCSSValue = ({ prop, value }: CSSProp) => {
  // should convert to rem
  if (typeof value === 'number' && includes(remPropList, prop)) {
    return convertPxToRem(value);
  }
  return value;
};
