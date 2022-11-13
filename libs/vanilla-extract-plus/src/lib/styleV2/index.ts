import { CSSProperties, style } from '@vanilla-extract/css';
import { clsx } from 'clsx';
import { StyleV2Props } from '../utils/types';
import { createOrReuseClass } from './createClass';

const createStyleClass = (givenStyles: StyleV2Props) => {
  const cssClasses: string[] = [];

  Object.entries(givenStyles).forEach(([prop, value]) => {
    const typedProp = prop as keyof CSSProperties;

    if (prop === '@media' || prop === 'selectors') {
      // TODO: should also use the `createOrReuseClass` method
      cssClasses.push(style({ [prop]: value }));
      return;
    }

    const valueClass = createOrReuseClass({
      prop: typedProp,
      value,
    });

    cssClasses.push(valueClass);
  });

  return cssClasses;
};

export const styleV2 = (givenStyles: StyleV2Props) => {
  if (Array.isArray(givenStyles)) {
    const generatedClasses: string[] = [];

    givenStyles.forEach((givenStyle) => {
      if (typeof givenStyle === 'string') {
        generatedClasses.push(givenStyle);
      } else {
        const classes = createStyleClass(givenStyle);
        generatedClasses.push(...classes);
      }
    });

    return clsx(generatedClasses);
  } else {
    return clsx(createStyleClass(givenStyles));
  }
};
