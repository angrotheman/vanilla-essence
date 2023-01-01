import { createDarkModeSelector } from '../lib/createDarkModeSelector/index';

describe('createPickColor', () => {
  const darkModeClass = createDarkModeSelector({
    config: {
      darkMode: { type: 'class', className: '.darkModeClass' },
    },
  });

  const darkModeMedia = createDarkModeSelector({
    config: {
      darkMode: { type: 'media' },
    },
  });

  test('dark mode class', () => {
    expect(
      darkModeClass({
        alignItems: 'center',
      })
    ).toStrictEqual({
      selector: {
        '.darkModeClass &': {
          alignItems: 'center',
        },
      },
    });
  });

  test('dark mode media', () => {
    expect(
      darkModeMedia({
        alignItems: 'center',
      })
    ).toStrictEqual({
      '@media': {
        '(prefers-color-scheme: dark)': {
          alignItems: 'center',
        },
      },
    });
  });
});
