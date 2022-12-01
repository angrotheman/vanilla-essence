import hexRgb from 'hex-rgb';
import { fallbackVar, createVar, StyleRule } from '@vanilla-extract/css';
import { ColorsConfig, OpacityConfig } from '../../types';

type AlphaVar = ReturnType<typeof createVar>;

export const convertToCssColors = <CC extends ColorsConfig>({
  colors,
  alphaVar,
}: {
  colors: CC;
  alphaVar?: AlphaVar;
}): {
  [k in keyof CC]: `rgb(${string})`;
} =>
  Object.assign(
    {},
    ...Object.entries(colors).map(([key, color]) => {
      const { red, green, blue, alpha } = hexRgb(color);

      const convertedColor = `rgb(${red} ${green} ${blue} / ${
        alphaVar ? fallbackVar(alphaVar, `${alpha}`) : alpha
      })`;

      return {
        [key]: convertedColor,
      };
    })
  );

export const generateOpacityValues = <
  T extends OpacityConfig,
  A extends AlphaVar
>({
  alphaVar,
  opacityConfig,
}: {
  alphaVar: A;
  opacityConfig: T;
}): {
  [o in keyof T]: {
    vars: {
      [k in A]: `${T[string]}`;
    };
  };
} =>
  Object.assign(
    {},
    ...Object.entries(opacityConfig).map(([key, opacity]) => {
      return {
        [key]: {
          vars: { [alphaVar]: `${opacity}` },
        },
      };
    })
  );

/*
export const generateOpacityValues = <
  T extends OpacityConfig,
  A extends AlphaVar
>({
  alphaVar,
  opacityArray,
}: {
  alphaVar: A;
  opacityArray: Readonly<T>;
}): {
  [N in T[number]]: {
    vars: {
      [k in A]: `${N}`;
    };
  };
} =>
  Object.assign(
    {},
    ...opacityArray.map((opacity) => {
      return {
        [opacity]: {
          vars: { [alphaVar]: `${opacity}` },
        },
      };
    })
  );
  
  const testColors = convertToCssColors({
    colors: {
      red: '#ff0000',
    },
    alphaVar: 'var(--alpha-var)',
  });
  
  const testOpacities = generateOpacityValues({
    opacityConfig: { 10: 0.1 },
    alphaVar: 'var(--alpha-var)',
  });
  
  const testOpacities1 = generateOpacityValues({
    opacityConfig: { 10: 0.1 } as const,
    alphaVar: 'var(--alpha-var)',
  });
  
  */
