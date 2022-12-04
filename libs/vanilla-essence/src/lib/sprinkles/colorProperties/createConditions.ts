import {
  DarkModeClassConfig,
  DarkModeConfig,
  DarkModeDisabledConfig,
  DarkModeMediaConfig,
} from '../../types';

type CreateDarkModeConditionsReturn<K extends DarkModeConfig> =
  K extends DarkModeClassConfig
    ? { selector: `${K['className']} &` }
    : K extends DarkModeMediaConfig
    ? { '@media': '(prefers-color-scheme: dark)' }
    : never;

const createDarkModeConditions = <K extends DarkModeConfig>(
  config: K
): CreateDarkModeConditionsReturn<K> => {
  if (!config) return;

  if (config.type === 'media') {
    return {
      '@media': '(prefers-color-scheme: dark)',
    } as CreateDarkModeConditionsReturn<K>;
  }

  if (config.type === 'class') {
    return {
      selector: `${config.className} &`,
    } as CreateDarkModeConditionsReturn<K>;
  }
};

const baseConditions = {
  default: {},
  hover: { selector: '&:hover' },
};

type CreateConditionsReturn<K extends DarkModeConfig> =
  K extends DarkModeDisabledConfig
    ? typeof baseConditions
    : typeof baseConditions & {
        darkMode: ReturnType<typeof createDarkModeConditions<K>>;
      };

export const createConditions = <DC extends DarkModeConfig>(
  config: DC
): CreateConditionsReturn<DC> => {
  return config.type !== 'disabled'
    ? ({
        ...baseConditions,
        darkMode: createDarkModeConditions(config),
      } as CreateConditionsReturn<DC>)
    : (baseConditions as CreateConditionsReturn<DC>);
};
