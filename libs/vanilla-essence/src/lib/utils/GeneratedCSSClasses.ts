import { convertCSSPropToObjectKey } from './transformValues/convertCSSPropToObjectKey';
import { CombinedCssProp } from './types';

type GeneratedClasses = {
  [k: string]: string;
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
    const key = convertCSSPropToObjectKey(cssProp);

    this.#generatedClasses[key] = cssClass;
    return this;
  }

  getAllSwappedClasses() {
    return Object.keys(this.#generatedClasses).reduce((ret, key) => {
      ret[this.#generatedClasses[key]] = key;
      return ret;
    }, {});
  }
}

export const generatedClasses = new GeneratedCSSClasses();
