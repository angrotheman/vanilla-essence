import { createMagicValueCSSClasses } from '../lib/utils/createMagicValueCSSClasses';
import { createResponsiveStyleRule } from '../lib/createResponsiveStyleRule/index';
import { CustomResponsiveStyle } from '../lib/types';
import { defineConfig } from '../lib/defineConfig';

describe('createResponsiveStyleRule', () => {
  const responsiveConfig = defineConfig({
    magicProps: {
      paddingX: ['paddingLeft', 'paddingRight'],
      marginX: ['marginLeft', 'marginRight'],
    },
    remPropList: '*',
    breakpoints: {
      sm: 640,
      md: 768,
    },
  });

  const responsiveStyleTemplate = (
    styleRule: CustomResponsiveStyle<typeof responsiveConfig>
  ) =>
    createResponsiveStyleRule({
      config: responsiveConfig,
      givenResponsiveStyle: styleRule,
      magicValueMethods: createMagicValueCSSClasses(
        responsiveConfig['magicProps']
      ),
    });

  test('responsiveStyleRule which has only default settings with magicValues and rem conversion', () => {
    expect(
      responsiveStyleTemplate({
        default: {
          fontSize: 16,
          marginX: 20,
        },
      })
    ).toStrictEqual([
      {
        fontSize: '1rem',
        marginLeft: '1.25rem',
        marginRight: '1.25rem',
      },
    ]);
  });

  test('responsiveStyleRule which has one responsive and default settings with magicValues and rem conversion', () => {
    expect(
      responsiveStyleTemplate({
        default: {
          fontSize: 16,
          marginX: 20,
        },
        sm: {
          fontSize: 20,
          marginTop: 20,
          marginX: 40,
          marginBottom: ['20vh', 40],
        },
      })
    ).toStrictEqual([
      {
        fontSize: '1rem',
        marginLeft: '1.25rem',
        marginRight: '1.25rem',
      },
      {
        '@media': {
          '(min-width: 640px)': {
            fontSize: '1.25rem',
            marginTop: '1.25rem',
            marginLeft: '2.5rem',
            marginRight: '2.5rem',
            marginBottom: ['20vh', 40],
          },
        },
      },
    ]);
  });

  test('responsiveStyleRule which has multiple responsive states with magicValues and rem conversion', () => {
    expect(
      responsiveStyleTemplate({
        default: {
          fontSize: 16,
          marginX: 20,
        },
        sm: {
          fontSize: 20,
          marginTop: 20,
          marginX: 40,
        },
        md: {
          fontSize: 24,
          paddingX: 20,
        },
      })
    ).toStrictEqual([
      {
        fontSize: '1rem',
        marginLeft: '1.25rem',
        marginRight: '1.25rem',
      },
      {
        '@media': {
          '(min-width: 640px)': {
            fontSize: '1.25rem',
            marginTop: '1.25rem',
            marginLeft: '2.5rem',
            marginRight: '2.5rem',
          },
        },
      },
      {
        '@media': {
          '(min-width: 768px)': {
            fontSize: '1.5rem',
            paddingLeft: '1.25rem',
            paddingRight: '1.25rem',
          },
        },
      },
    ]);
  });
});
