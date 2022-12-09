type HEX_VAL = `#${string}`;

type Props = {
  [K in string]:
    | HEX_VAL
    | {
        [IK in string]: HEX_VAL;
      };
};

type KeyOf<P> = Extract<keyof P, string | number>;

type ConvertChildKey<
  K extends string | number,
  P extends string
> = K extends 'DEFAULT' ? P : `${P}-${K}`;

type FlatColorKeys<P extends Props> = {
  [K in keyof P]: P[K] extends Props
    ? ConvertChildKey<KeyOf<P[K]>, K extends string ? K : never>
    : K;
}[keyof P];

type FlatColorsSettingsT<T extends Props> = Record<FlatColorKeys<T>, HEX_VAL>;
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export const flatColorsSettings = <P extends Props>(
  colors: P
): Expand<FlatColorsSettingsT<P>> =>
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
