import { StyleRule } from '@vanilla-extract/css';
import { convertPxToRem } from '../utils/transformValues/convertPxToRem';
import { RemPropListConfig } from './types';

export const convertToRemValues = <
  T extends StyleRule,
  R extends RemPropListConfig
>({
  styleRule,
  remPropList,
}: {
  styleRule: T;
  remPropList: R;
}) => {
  const copiedStyleRule = { ...styleRule };

  remPropList.forEach((remKey) => {
    if (
      copiedStyleRule[remKey] &&
      typeof copiedStyleRule[remKey] === 'number'
    ) {
      copiedStyleRule[remKey as string] = convertPxToRem(
        copiedStyleRule[remKey as string]
      );
    }
  });

  return copiedStyleRule;
};
