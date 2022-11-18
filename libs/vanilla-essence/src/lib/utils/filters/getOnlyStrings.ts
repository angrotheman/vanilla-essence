export const getOnlyStrings = <T extends string>(
  cssClass: T
): cssClass is Extract<T, string> => typeof cssClass === 'string';
