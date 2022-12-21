import { createVar, StyleRule } from '@vanilla-extract/css';
import { InitStyleConfig } from '../../types';
import { convertToRgbColors, generateOpacityValues } from './colorConversion';

const defaultColors = {
  transparent: 'transparent',
};

export const generateColorValues = <
  P extends keyof StyleRule,
  C extends InitStyleConfig
>({
  property,
  config,
}: {
  property: P;
  config: C;
}) => {
  const alphaVar = createVar();

  const convertedColors = {
    ...defaultColors,
    ...convertToRgbColors<C['colors']>({
      colors: config.colors,
      alphaVar,
    }),
  };

  const generatedOpacities = generateOpacityValues<
    typeof config['opacities'],
    typeof alphaVar
  >({
    opacityConfig: config.opacities,
    alphaVar,
  });

  const createdConfig = {
    [property]: convertedColors,
    [`${property}Opacity`]: generatedOpacities,
  } as {
    [k in P]: typeof convertedColors;
  } & {
    [k in `${P}Opacity`]: typeof generatedOpacities;
  };

  return createdConfig;
};
