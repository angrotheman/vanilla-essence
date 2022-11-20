import { StyleRule } from '@vanilla-extract/css';
import { MagicPropsConfig } from '../types';

export const createMagicValueCSSClasses = <T extends MagicPropsConfig>(
  magicValuesConfig: T
): {
  [k in keyof T]: (value: number | string) => StyleRule;
} => {
  return Object.assign(
    {},
    ...Object.entries(magicValuesConfig ?? {}).map(([key, values]) => {
      const magicValue = (value: number | string) =>
        Object.assign({}, ...values.map((cssProp) => ({ [cssProp]: value })));

      return { [key]: magicValue };
    })
  );
};
