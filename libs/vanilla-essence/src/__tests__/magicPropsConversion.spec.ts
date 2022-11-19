import { createMagicValueCSSClasses } from '../lib/initStyle/createMagicValueCSSClasses';
import { convertMagicProps } from '../lib/initStyle/convertMagicProps';

describe('createMagicValueCSSClasses', () => {
  const magicValueMethods = createMagicValueCSSClasses({
    paddingX: ['paddingLeft', 'paddingRight'],
    marginY: ['marginTop', 'marginBottom'],
  });

  test('works with numeric value', () => {
    expect(magicValueMethods.paddingX(20)).toStrictEqual({
      paddingLeft: 20,
      paddingRight: 20,
    });
  });

  test('works with a string value', () => {
    expect(magicValueMethods.marginY('1rem')).toStrictEqual({
      marginTop: '1rem',
      marginBottom: '1rem',
    });
  });
});

describe('convertMagicProps', () => {
  const magicValueMethods = createMagicValueCSSClasses({
    paddingX: ['paddingLeft', 'paddingRight'],
    marginY: ['marginTop', 'marginBottom'],
  });

  test('converts everything correct', () => {
    expect(
      convertMagicProps({
        magicValueMethods,
        styleRule: { background: 'red', paddingX: 20 },
      })
    ).toStrictEqual({
      background: 'red',
      paddingLeft: 20,
      paddingRight: 20,
    });
  });
});
