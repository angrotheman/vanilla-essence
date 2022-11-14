import { CSSProp } from '../utils/types';
import { style } from '@vanilla-extract/css';
import { generatedClasses } from '../utils/GeneratedCSSClasses';
import { convertCSSValue } from '../utils/convertCSSValue';
import { createMagicValueCSSClass } from './createMagicValues';

const createClass = ({ prop, value }: CSSProp) => {
  return style({ [prop]: convertCSSValue({ prop, value }) });
};

export const createOrReuseClass = (config: CSSProp) => {
  if (config.prop in createMagicValueCSSClass) {
    return createMagicValueCSSClass[
      config.prop as keyof typeof createMagicValueCSSClass
    ](config.value);
  } else {
    if (!generatedClasses.has(config)) {
      const generatedClass = createClass(config);

      generatedClasses.set(config, generatedClass);
    }

    return generatedClasses.get(config);
  }
};
