import { ComplexStyleRule } from '@vanilla-extract/css';
import {
  generateTypedMediaQuery,
  MediaQuerySizeType,
} from '../utils/generatedMediaQueries';
import { createComplexStyleRule } from '../createComplexStyleRule';
import {
  CustomComplexStyle,
  CustomResponsiveStyle,
  InitStyleConfig,
  MagicValueMethods,
} from '../types';

export const createResponsiveStyleRule = <
  CRS extends CustomResponsiveStyle<C>,
  C extends InitStyleConfig
>({
  givenResponsiveStyle,
  config,
  magicValueMethods,
}: {
  givenResponsiveStyle: CRS;
  config: C;
  magicValueMethods: MagicValueMethods<C['magicProps']>;
}) => {
  const givenStyleRule: ComplexStyleRule = [];

  const givenStylesKeys = Object.keys(givenResponsiveStyle) as Array<
    keyof C['breakpoints']
  >;

  givenStylesKeys.forEach((breakpointKey) => {
    if (breakpointKey === 'default') {
      if (givenResponsiveStyle['default']) {
        givenStyleRule.push(
          ...createComplexStyleRule({
            givenStyle: givenResponsiveStyle['default'],
            config,
            magicValueMethods,
          })
        );
      }
    } else {
      const givenStyle: CustomComplexStyle<unknown> = {
        '@media': {
          [generateTypedMediaQuery({
            size: config.breakpoints[
              breakpointKey as keyof typeof config.breakpoints
            ],
            type: MediaQuerySizeType.minWidth,
          })]: givenResponsiveStyle[breakpointKey],
        },
      };

      givenStyleRule.push(
        ...createComplexStyleRule({
          givenStyle,
          config,
          magicValueMethods,
        })
      );
    }
  });

  return givenStyleRule;
};
