import {
  CSSPropertiesWithVars,
  WithQueries,
} from '@vanilla-extract/css/dist/declarations/src/types';
import { createDarkModeCondition } from '../sprinkles/colorProperties/createConditions';
import {
  DarkModeClassConfig,
  DarkModeMediaConfig,
  InitStyleConfig,
} from '../types';

/*
const a = {
  '@media': '(prefers-color-scheme: dark)',
}

const b = {
  selector: `${'.darkmode-class'} &`,
}

const myStyle = style({
  background: 'red',
  onDark({
    background: 'blue'
  }),
})

const foo = {
  selectors: {
    [`${'.darkmode-class'} &`]: {
      background: 'red',
    },
  },
  // OR
  '@media': {
    '(prefers-color-scheme: dark)': {
      background: 'blue',
    },
  },
};
*/

export const createDarkModeSelector = <C extends InitStyleConfig>({
  config,
}: {
  config: C;
}) => {
  const darkModeSelector = createDarkModeCondition(config['darkMode']);
  const [[selectorType, selectorValue]] = Object.entries(darkModeSelector);

  type MediaStyling = CSSPropertiesWithVars;
  type SelectorStyling = CSSPropertiesWithVars &
    WithQueries<CSSPropertiesWithVars>;

  type DarkModeStyles = C['darkMode'] extends DarkModeMediaConfig
    ? MediaStyling
    : C['darkMode'] extends DarkModeClassConfig
    ? SelectorStyling
    : never;

  const darkMode = (styles: DarkModeStyles) => ({
    [selectorType]: {
      [selectorValue]: styles,
    },
  });

  return darkMode;
};
