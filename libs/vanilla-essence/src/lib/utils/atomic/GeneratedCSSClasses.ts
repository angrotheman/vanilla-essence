import { CustomStyleRule } from '../../types';
import { convertCSSPropToObjectKey } from './convertCSSPropToObjectKey';

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

  delete(cssProp: CustomStyleRule) {
    return delete this.#generatedClasses[convertCSSPropToObjectKey(cssProp)];
  }

  get(cssProp: CustomStyleRule) {
    return this.#generatedClasses[convertCSSPropToObjectKey(cssProp)];
  }

  getByClassName(className: string) {
    return this.#reverseGeneratedClasses[className];
  }

  has(cssProp: CustomStyleRule) {
    return Boolean(this.#generatedClasses[convertCSSPropToObjectKey(cssProp)]);
  }

  set(cssProp: CustomStyleRule, cssClass: string) {
    const key = convertCSSPropToObjectKey(cssProp);

    this.#generatedClasses[key] = cssClass;
    this.#reverseGeneratedClasses[cssClass] = key;
    return this;
  }
}

export const generatedClasses = new GeneratedCSSClasses();
