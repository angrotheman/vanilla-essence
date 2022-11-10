import { CSSProperties, style } from '@vanilla-extract/css';
import { clsx } from 'clsx';
import { StyleV2Props } from './types';
import { MagicValueKeys } from './magicValues';
import { createOrReuseClass } from './createClass';

const simpleStyleV2 = (givenStyles: StyleV2Props) => {
  const classes: string[] = [];

  Object.entries(givenStyles).forEach(([prop, value]) => {
    const typedProp = prop as keyof CSSProperties | MagicValueKeys;

    if (prop === '@media') {
      classes.push(style({ [prop]: value }));
      return;
    }

    const valueClass = createOrReuseClass({
      prop: typedProp as keyof CSSProperties,
      value,
    });

    classes.push(valueClass);
  });

  return classes;
};

export const styleV2 = (givenStyles: StyleV2Props) => {
  if (Array.isArray(givenStyles)) {
    const generatedClasses: string[] = [];

    givenStyles.forEach((givenStyle) => {
      if (typeof givenStyle === 'string') {
        generatedClasses.push(givenStyle);
      } else {
        const classes = simpleStyleV2(givenStyle);
        generatedClasses.push(...classes);
      }
    });

    return clsx(generatedClasses);
  } else {
    return clsx(simpleStyleV2(givenStyles));
  }
};
