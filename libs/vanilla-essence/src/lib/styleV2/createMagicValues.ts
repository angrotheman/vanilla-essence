import config from '../../config/default';
import { MagicValueKeys } from '../utils/types';
import { styleV2 } from './';

const { magicProps } = config;

type MagicValues = {
  [k in MagicValueKeys]: (value: number | string) => string;
};

export const createMagicValueCSSClass: MagicValues = Object.assign(
  {},
  ...Object.entries(magicProps).map(([key, values]) => {
    const typedKey = key as MagicValueKeys;

    const magicValue = (value: number | string) =>
      styleV2(
        Object.assign({}, ...values.map((cssProp) => ({ [cssProp]: value })))
      );

    return { [typedKey]: magicValue };
  })
);
