import { ColorsConfig, HEX_VAL } from '../../types';

type KeyOf<P> = Extract<keyof P, string | number>;

type ConvertChildKey<
  K extends string | number,
  P extends string
> = K extends 'DEFAULT' ? P : `${P}-${K}`;

export type FlatColorKeys<P extends ColorsConfig> = {
  [K in keyof P]: P[K] extends ColorsConfig
    ? ConvertChildKey<KeyOf<P[K]>, K extends string ? K : never>
    : K;
}[keyof P];

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

type FlatColorsSettingsReturn<T extends ColorsConfig> = Expand<
  Record<FlatColorKeys<T>, HEX_VAL>
>;

export const flatColorsSettings = <P extends ColorsConfig>(
  colors: P
): FlatColorsSettingsReturn<P> =>
  Object.assign(
    {},
    ...Object.entries(colors ?? {}).flatMap(([color, values]) =>
      typeof values == 'object'
        ? Object.entries(flatColorsSettings(values)).map(
            ([colorKey, hexVal]) => ({
              [color + (colorKey === 'DEFAULT' ? '' : `-${colorKey}`)]: hexVal,
            })
          )
        : [{ [`${color}`]: values }]
    )
  );

/*
const fooi = flatColorsSettings({
  red: '#red-val',
  green: {
    200: '#green-200-val',
    DEFAULT: '#green-default-val',
    300: '#green-300-val',
  },
});

type testi = FlatColorsSettingsT<{
  red: '#red-val';
  green: {
    200: '#green-200-val';
    300: '#green-300-val';
    DEFAULT: '#default-color';
  };
  blue: {
    300: '#sddsf';
  };
}>;
*/
