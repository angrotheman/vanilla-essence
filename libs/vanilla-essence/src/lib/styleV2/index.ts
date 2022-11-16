import { CSSProperties, style } from '@vanilla-extract/css';
import { clsx } from 'clsx';
import { cleanUpClasses } from '../utils/cleanUpClasses';
import { StyleV2Props } from '../utils/types';
import { createOrReuseClass } from './createClass';

const createStyleClass = (givenStyles: StyleV2Props) => {
  const cssClasses: string[] = [];

  Object.entries(givenStyles).forEach(([prop, value]) => {
    const typedProp = prop as keyof CSSProperties;

    if (typeof value === 'object') {
      cssClasses.push(style({ [prop]: value }));
      return;
    } else {
      const valueClass = createOrReuseClass({
        prop: typedProp,
        value,
      });

      cssClasses.push(valueClass);
      return;
    }
  });

  return cssClasses;
};

export const styleV2 = (givenStyles: StyleV2Props): string => {
  if (Array.isArray(givenStyles)) {
    const finalClasses: string[] = [];

    givenStyles.forEach((givenStyle) => {
      if (typeof givenStyle === 'string') {
        finalClasses.push(givenStyle);
      } else {
        const classes = createStyleClass(givenStyle);
        finalClasses.push(...classes);
      }
    });

    const cleanedUpClasses = cleanUpClasses(finalClasses);

    return clsx(cleanedUpClasses);
  } else {
    return clsx(createStyleClass(givenStyles));
  }
};
