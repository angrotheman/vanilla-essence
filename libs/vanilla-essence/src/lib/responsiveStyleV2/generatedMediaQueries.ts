import config from '../../config/default';

const { breakpoints } = config;

export type AvailableBreakpoints = keyof typeof breakpoints;

enum Feature {
  minWidth = 'min-width',
  maxWidth = 'max-width',
}

type MediaQueryType<T extends Feature, N extends number> = `(${T}: ${N}px)`;

const generateTypedMediaQuery = <T extends Feature, N extends number>({
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
    Feature.minWidth,
    typeof breakpoints[k]
  >;
} = Object.assign(
  {},
  ...Object.entries(breakpoints).map(([key, minW]) => ({
    [key]: generateTypedMediaQuery({ type: Feature.minWidth, size: minW }),
  }))
);
