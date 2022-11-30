import { getOnlyStrings } from '../lib/utils/filters/getOnlyStrings';
import { CustomStyleRule } from '../lib/types';
import { getOnlyProps } from '../lib/utils/filters/getOnlyProps';

type ClassesArray = Array<string | CustomStyleRule>;

const classes1: ClassesArray = ['a', { prop: 'background', value: 'red' }];

const classes2: ClassesArray = [
  'a',
  { prop: 'background', value: 'red' },
  'b c',
  { prop: 'color', value: 'green' },
  { prop: 'border', value: 'none' },
];

describe('getOnlyStrings filter', () => {
  test('base classes', () => {
    expect(classes1.filter(getOnlyStrings)).toStrictEqual([classes1[0]]);
  });

  test('more complex classes', () => {
    expect(classes2.filter(getOnlyStrings)).toStrictEqual([
      classes2[0],
      classes2[2],
    ]);
  });
});

describe('getOnlyProps filter', () => {
  test('base classes', () => {
    expect(classes1.filter(getOnlyProps)).toStrictEqual([classes1[1]]);
  });

  test('more complex classes', () => {
    expect(classes2.filter(getOnlyProps)).toStrictEqual([
      classes2[1],
      classes2[3],
      classes2[4],
    ]);
  });
});
