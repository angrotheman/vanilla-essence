export const simplifyCssClasses = (cssClasses: Array<string>) =>
  cssClasses.flatMap((cssClass) => cssClass.split(' '));
