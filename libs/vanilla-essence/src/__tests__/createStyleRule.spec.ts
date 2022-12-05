import { createComplexStyleRule } from '../lib/createComplexStyleRule';
import { defineConfig } from '../lib/defineConfig';
import { CustomComplexStyle } from '../lib/types';
import { createMagicValueCSSClasses } from '../lib/utils/createMagicValueCSSClasses';

describe('createStyleRule', () => {
  const styleConfig = defineConfig({
    magicProps: {
      paddingX: ['paddingLeft', 'paddingRight'],
    },
    remPropList: ['fontSize'],
    breakpoints: {
      sm: 640,
      md: 768,
    },
  });

  const styleTemplate = (styleRule: CustomComplexStyle<typeof styleConfig>) =>
    createComplexStyleRule({
      config: styleConfig,
      givenStyle: styleRule,
      magicValueMethods: createMagicValueCSSClasses(styleConfig['magicProps']),
    });

  test('styleRule which has magicValues and rem conversion', () => {
    expect(
      styleTemplate({
        fontSize: 16,
        paddingTop: 16,
        paddingX: 12,
      })
    ).toStrictEqual([
      {
        fontSize: '1rem',
        paddingTop: 16,
        paddingLeft: 12,
        paddingRight: 12,
      },
    ]);
  });

  test('styleRule can handle array values', () => {
    expect(
      styleTemplate({
        fontSize: ['14vmin', 12],
        ':hover': {
          fontSize: 24,
        },
      })
    ).toStrictEqual([
      { fontSize: ['14vmin', 12], ':hover': { fontSize: '1.5rem' } },
    ]);
  });

  test('styleRule can handle responsive styles', () => {
    expect(
      styleTemplate({
        background: 'red',
        fontSize: 12,
        paddingX: 12,
        '@responsive': {
          sm: {
            background: 'green',
            fontSize: 16,
            paddingX: 14,
          },
        },
      })
    ).toStrictEqual([
      {
        background: 'red',
        fontSize: '0.75rem',
        paddingLeft: 12,
        paddingRight: 12,
        '@media': {
          '(min-width: 640px)': {
            background: 'green',
            fontSize: '1rem',
            paddingLeft: 14,
            paddingRight: 14,
          },
        },
      },
    ]);
  });

  test('styleRule can handle multiple responsive styles', () => {
    expect(
      styleTemplate({
        background: 'red',
        fontSize: 12,
        paddingX: 12,
        '@responsive': {
          sm: {
            background: 'green',
            fontSize: 16,
            paddingX: 14,
          },
          md: {
            background: 'yellow',
          },
        },
      })
    ).toStrictEqual([
      {
        background: 'red',
        fontSize: '0.75rem',
        paddingLeft: 12,
        paddingRight: 12,
        '@media': {
          '(min-width: 640px)': {
            background: 'green',
            fontSize: '1rem',
            paddingLeft: 14,
            paddingRight: 14,
          },
          '(min-width: 768px)': {
            background: 'yellow',
          },
        },
      },
    ]);
  });
});
