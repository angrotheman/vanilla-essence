import { styleV2 } from '../styleV2';
import { CSSProp, ResponsiveCSSProp } from './types';

type GeneratedClasses = {
  [k: string]: string;
};

type CombinedCssProp = CSSProp | ResponsiveCSSProp;

const convertCSSPropToObjectKey = (cssProp: CombinedCssProp) => {
  return Object.values(cssProp).join('||');
};

const convertObjectKeyToCSSProp = (cssClass: string) => {
  const [prop, value] = cssClass.split('||');
  return { [prop]: value } as {
    [k in CombinedCssProp['prop']]: CombinedCssProp['value'];
  };
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

  cleanUpClasses(cssClasses: Array<string>) {
    const flattedCssClasses = cssClasses.flatMap((cssClass) =>
      cssClass.split(' ')
    );

    const swappedClasses = Object.keys(this.#generatedClasses).reduce(
      (ret, key) => {
        ret[this.#generatedClasses[key]] = key;
        return ret;
      },
      {}
    );

    const convertedCSSClasses = flattedCssClasses.map((cssClass) => {
      const values = swappedClasses[cssClass];

      if (values) {
        return convertObjectKeyToCSSProp(values);
      }

      return cssClass;
    });

    const cleanedUpCSSClasses = Object.assign(
      {},
      ...convertedCSSClasses.filter((cssClass) => typeof cssClass !== 'string')
    );

    const otherCSSClasses = convertedCSSClasses.filter(
      (i) => typeof i === 'string'
    );

    return [otherCSSClasses, styleV2(cleanedUpCSSClasses)];
  }
}

export const generatedClasses = new GeneratedCSSClasses();
