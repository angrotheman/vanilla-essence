export const getOnlyProps = <T>(
  cssClass: T
): cssClass is Exclude<T, string | Array<unknown>> =>
  typeof cssClass !== 'string' && !Array.isArray(cssClass);
