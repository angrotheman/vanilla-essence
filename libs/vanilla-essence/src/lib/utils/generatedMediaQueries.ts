import config from '../../config/default';

const { breakpoints } = config;

export type AvailableBreakpoints = keyof typeof breakpoints;

export enum MediaQuerySizeType {
  minWidth = 'min-width',
  maxWidth = 'max-width',
}

type MediaQueryType<
  T extends MediaQuerySizeType,
  N extends number
> = `(${T}: ${N}px)`;

export const generateTypedMediaQuery = <
  T extends MediaQuerySizeType,
  N extends number
>({
  type,
  size,
}: {
  type: T;
  size: N;
}): MediaQueryType<T, N> => {
  return `(${type}: ${size}px)`;
};

export const generatedMediaQueries: {
  [k in AvailableBreakpoints]: MediaQueryType<
    MediaQuerySizeType.minWidth,
    typeof breakpoints[k]
  >;
} = Object.assign(
  {},
  ...Object.entries(breakpoints).map(([key, minW]) => ({
    [key]: generateTypedMediaQuery({
      type: MediaQuerySizeType.minWidth,
      size: minW,
    }),
  }))
);
