import defineSize from '../../utils/defineSize';

describe('defineSize', () => {
  test('conversion with min and ideal', () => {
    expect(
      defineSize({
        min: 20,
        ideal: '40%',
      })
    ).toStrictEqual('max(1.25rem, 40%)');
  });

  test('conversion with max and ideal', () => {
    expect(
      defineSize({
        ideal: '50vw',
        max: 48,
      })
    ).toStrictEqual('min(3rem, 50vw)');
  });

  test('conversion with min, max and ideal', () => {
    expect(
      defineSize({
        min: 12,
        max: 24,
        ideal: '40%',
      })
    ).toStrictEqual('clamp(0.75rem, 40%, 1.5rem)');
  });

  test('conversion with nested min,max and ideal', () => {
    expect(
      defineSize({
        min: defineSize({ ideal: 320, max: '10vw' }),
        ideal: 300,
        max: defineSize({ min: '90vw', ideal: 880 }),
      })
    ).toStrictEqual('clamp(min(10vw, 20rem), 18.75rem, max(90vw, 55rem))');
  });
});
