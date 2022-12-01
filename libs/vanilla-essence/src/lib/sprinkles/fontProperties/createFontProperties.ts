import { InitStyleConfig } from '../../types';

export const createFontProperties = <C extends InitStyleConfig>({
  config,
}: {
  config: C;
}) => {
  return {
    properties: {
      fontFamily: config.fontFamilies as C['fontFamilies'],
      fontWeight: config.fontWeights as C['fontWeights'],
    },
  };
};
