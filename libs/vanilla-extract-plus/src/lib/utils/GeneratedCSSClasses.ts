import { CSSProp, ResponsiveCSSProp } from './types';

type GeneratedClasses = {
  [k: string]: string;
};

type CombinedCssProp = CSSProp | ResponsiveCSSProp;

const convertCSSPropToObjectKey = (cssProp: CombinedCssProp) => {
  return Object.values(cssProp).join('_');
};

export class GeneratedCSSClasses {
  #generatedClasses: GeneratedClasses;

  constructor(initialClasses: GeneratedClasses = {}) {
    this.#generatedClasses = initialClasses;
  }

  delete(cssProp: CombinedCssProp) {
    return delete this.#generatedClasses[convertCSSPropToObjectKey(cssProp)];
  }

  get(cssProp: CombinedCssProp) {
    return this.#generatedClasses[convertCSSPropToObjectKey(cssProp)];
  }

  has(cssProp: CombinedCssProp) {
    return Boolean(this.#generatedClasses[convertCSSPropToObjectKey(cssProp)]);
  }

  set(cssProp: CombinedCssProp, cssClass: string) {
    this.#generatedClasses[convertCSSPropToObjectKey(cssProp)] = cssClass;
    return this;
  }
}

export const generatedClasses = new GeneratedCSSClasses();
