import { createMagicValueCSSClasses } from '../lib/initStyle/createMagicValueCSSClasses';
import { createComplexStyleRule } from '../lib/initStyle/createStyleRule';

describe('createStyleRule', () => {
  const styleTemplate = (styleRule) =>
    createComplexStyleRule({
      givenStyle: styleRule,
      config: {
        remPropList: ['fontSize'],
      },
      magicValueMethods: createMagicValueCSSClasses({
        paddingX: ['paddingLeft', 'paddingRight'],
      }),
    });

  test('styleRule which has magicValues and rem conversion', () => {
    expect(
      styleTemplate({
        fontSize: 16,
        paddingTop: 16,
        paddingX: 12,
      })
    ).toStrictEqual([
      { fontSize: '1rem', paddingTop: 16, paddingLeft: 12, paddingRight: 12 },
    ]);
  });

  test('styleRule can handle array values', () => {
    expect(
      styleTemplate({
        fontSize: ['14vmin', 12],
        ':hover': {
          fontSize: 24, // should also a rem val
        },
      })
    ).toStrictEqual([{ fontSize: ['14vmin', 12], ':hover': { fontSize: 24 } }]);
  });
});

// convert singleStyleRuleConverter method -> and check if value is a object -> run singleStyleRuleConverter for value
