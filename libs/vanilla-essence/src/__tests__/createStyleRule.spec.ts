import { createComplexStyleRule } from '../lib/initStyle/createComplexStyleRule';
import { defineConfig } from '../lib/utils/_defineConfig';
import { CustomComplexStyle } from '../lib/initStyle/types';
import { createMagicValueCSSClasses } from '../lib/initStyle/createMagicValueCSSClasses';

describe('createStyleRule', () => {
  const styleConfig = defineConfig({
    magicProps: {
      paddingX: ['paddingLeft', 'paddingRight'],
    },
    remPropList: ['fontSize'],
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
});

// convert singleStyleRuleConverter method -> and check if value is a object -> run singleStyleRuleConverter for value
