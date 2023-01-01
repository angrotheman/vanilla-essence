import {
  DarkModeClassConfig,
  DarkModeConfig,
  DarkModeDisabledConfig,
  DarkModeMediaConfig,
} from '../../types';

type CreateDarkModeConditionReturn<K extends DarkModeConfig> =
  K extends DarkModeClassConfig
    ? { selector: `${K['className']} &` }
    : K extends DarkModeMediaConfig
    ? { '@media': '(prefers-color-scheme: dark)' }
    : never;

export const createDarkModeCondition = <K extends DarkModeConfig>(
  config: K
): CreateDarkModeConditionReturn<K> => {
  if (!config) return;

  if (config.type === 'media') {
    return {
      '@media': '(prefers-color-scheme: dark)',
    } as CreateDarkModeConditionReturn<K>;
  }

  if (config.type === 'class') {
    return {
      selector: `${config.className} &`,
    } as CreateDarkModeConditionReturn<K>;
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
        darkMode: ReturnType<typeof createDarkModeCondition<K>>;
      };

export const createConditions = <DC extends DarkModeConfig>(
  config: DC
): CreateConditionsReturn<DC> => {
  return config.type !== 'disabled'
    ? ({
        ...baseConditions,
        darkMode: createDarkModeCondition(config),
      } as CreateConditionsReturn<DC>)
    : (baseConditions as CreateConditionsReturn<DC>);
};
