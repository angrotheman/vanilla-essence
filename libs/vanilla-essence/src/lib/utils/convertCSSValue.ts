import { CSSProp } from './types';
import { convertPxToRem } from './transformValues/convertPxToRem';
import includes from './tsSafeMethods/includes';
import config from '../../config/default';

const { remPropList } = config;

export const convertCSSValue = ({ prop, value }: CSSProp) => {
  // never should be improved, but seems this method is depricated
  if (typeof value === 'number' && includes(remPropList as never, prop)) {
    return convertPxToRem(value);
  }
  return value;
};
