import { convertCSSPropToObjectKey } from '../lib/utils/transformValues/convertCSSPropToObjectKey';
import { convertObjectKeyToCSSProp } from '../lib/utils/transformValues/convertObjectKeyToCSSProp';

describe('class conversion', () => {
  test('convert css prop', () => {
    expect(
      convertCSSPropToObjectKey({
        prop: 'backgroundColor',
        value: 20,
      })
    ).toBe('backgroundColor||20');
  });

  test('convert responsive css prop', () => {
    expect(
      convertCSSPropToObjectKey({
        breakpointKey: 'sm',
        prop: 'backgroundColor',
        value: 20,
      })
    ).toBe('sm||backgroundColor||20');
  });

  test('convert css prop and revert it', () => {
    expect(
      convertObjectKeyToCSSProp(
        convertCSSPropToObjectKey({
          prop: 'backgroundColor',
          value: 20,
        })
      )
    ).toMatchObject({
      prop: 'backgroundColor',
      value: 20,
    });
  });

  test('convert responsive css prop and revert it', () => {
    expect(
      convertObjectKeyToCSSProp(
        convertCSSPropToObjectKey({
          breakpointKey: 'sm',
          prop: 'backgroundColor',
          value: 20,
        })
      )
    ).toMatchObject({
      breakpointKey: 'sm',
      prop: 'backgroundColor',
      value: 20,
    });
  });
});
