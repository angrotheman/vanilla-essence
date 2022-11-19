import { ClassNames } from '@vanilla-extract/css/dist/declarations/src/types';
import { getOnlyProps } from '../utils/filters/getOnlyProps';
import { getOnlyStrings } from '../utils/filters/getOnlyStrings';
import { simplifyCssClasses } from '../utils/simplifyCssClasses';
import { CustomStyleRule } from './types';

const flatArrayItems = <CSR extends CustomStyleRule>(
  styles: (CSR | ClassNames)[]
) => {
  const flattedStyles = styles.flat() as Array<CSR | string>;

  const styleRules = flattedStyles.filter<CSR>(getOnlyProps);
  const classNames = flattedStyles.filter(getOnlyStrings);

  const flattedClassNames = simplifyCssClasses(classNames);

  return {
    classNames: flattedClassNames,
    styleRules,
  };
};

export const cleanUpGivenStyle = <CSR extends CustomStyleRule>(
  cssClasses: CSR | (CSR | ClassNames)[]
) => {
  if (Array.isArray(cssClasses)) {
    return flatArrayItems(cssClasses);
  } else {
    return flatArrayItems([cssClasses]);
  }
};
