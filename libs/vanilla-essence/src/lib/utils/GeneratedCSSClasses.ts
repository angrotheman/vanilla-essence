import { convertCSSPropToObjectKey } from './transformValues/convertCSSPropToObjectKey';
import { CombinedCssProp } from './types';

type GeneratedClasses = {
  [k: string]: string;
};

export class GeneratedCSSClasses {
  #generatedClasses: GeneratedClasses;
  #reverseGeneratedClasses: GeneratedClasses;

  constructor(initialClasses: GeneratedClasses = {}) {
    this.#generatedClasses = initialClasses;
    this.#reverseGeneratedClasses = {};
  }

  delete(cssProp: CombinedCssProp) {
    return delete this.#generatedClasses[convertCSSPropToObjectKey(cssProp)];
  }

  get(cssProp: CombinedCssProp) {
    return this.#generatedClasses[convertCSSPropToObjectKey(cssProp)];
  }

  getByClassName(className: string) {
    return this.#reverseGeneratedClasses[className];
  }

  has(cssProp: CombinedCssProp) {
    return Boolean(this.#generatedClasses[convertCSSPropToObjectKey(cssProp)]);
  }

  set(cssProp: CombinedCssProp, cssClass: string) {
    const key = convertCSSPropToObjectKey(cssProp);

    this.#generatedClasses[key] = cssClass;
    this.#reverseGeneratedClasses[cssClass] = key;
    return this;
  }
}

export const generatedClasses = new GeneratedCSSClasses();
