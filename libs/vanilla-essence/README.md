# Vanilla Essence

Vanilla Essence is a library that builds upon [Vanilla Extract](https://vanilla-extract.style/) and includes key features of [Tailwind CSS](https://tailwindcss.com/) and [Stylex](https://www.youtube.com/watch?v=ur-sGzUWId4). If you currently use Vanilla Extract, you can easily switch to Vanilla Essence by updating your library and imports.

## Getting Started:

To use `Vanilla Essence`, you must create a config-file and call the `initStyle` method. This method provides you with a typed modified `style` and `themeSprinkles` method.
You can place the file anywhere you want, but a good option is to create a file named `style.config.css.ts` in the globals `style` folder of your application. This file must be a `.css.ts` file, otherwise it will not work.

The easiest way to set everything up is as follows:

```js
import { initStyle } from '@antoniogross/vanilla-essence';
import defaultConfig from '@antoniogross/vanilla-essence/src/config/default';

export const { style, themeSprinkles, pickColor } = initStyle(defaultConfig);
```

---

## Vanilla Essence includes several key differences from Vanilla Extract's style API:

<!--
- **(currently this is not finally implemented!)** **Atomic CSS:** A CSS class is created for each CSS property. This way the last class always wins and it is extremely easy to override stylings. Also, the size of the bundled file is smaller because there are no repetitions. _(currently this is not available for pseudo-classes)_.

```js
const bgRed = style({
  backgroundColor: 'red',
});
const bgBlue = style({
  backgroundColor: 'blue',
});

const combinedClass = style([bgBlue, bgRed]);

const combinedClass2 = style([
  combinedClass,
  {
    background: 'green',
  },
]);
```
-->

- **Rem Conversion:** This automatically converts numeric values to rem values for properties such as fontSize, letterSpacing, and lineHeight. _These settings can be customized in `config.remPropList` and it can be enabled for any value using "\*"_.

- **Magic Values:** This adds custom css properties such as `paddingX`, `paddingY`, `marginX`, and `marginY`. You may already know this from the sprinkles API. There it is called `shorthands`. _These settings can be customized in `config.magicProps`_.

- **Pseudo-elements:** This automatically adds `content: ''` when the modifiers `before` and `after` are used. Of course, only if it is not specified with a different value.

- **`responsive` API:** This allows for easy implementation of responsive styling using the same breakpoints as [Tailwind CSS](https://tailwindcss.com/docs/responsive-design). _These settings can be customized in `config.breakpoints`_.

```js
const responsiveClass = style({
  backgroundColor: 'grey',
  paddingX: 12,
  '@responsive': {
    sm: {
      backgroundColor: 'red',
    },
    md: {
      backgroundColor: 'blue',
      paddingX: 16,
    },
    lg: {
      backgroundColor: 'green',
      paddingX: 20,
    },
  },
});
```

<!--
- **`createUniqueIdentifier` method:** This method is useful when you need to use `globalStyle` to style a child element of a css class.

```js
const identifier = createUniqueIdentifier();

const a = style([identifier, { color: 'red' }]);
const b = globalStyle(`${identifier} svg`, {
  width: '100%',
});
```
-->

---

## `themeSprinkles` API:

The `themeSprinkles` API allows you to define your own colors and font-family/font-weight settings using the same syntax as in Tailwind CSS. The colors must be specified using hexadecimal values, which will be automatically converted to RGB values. This allows you to adjust the opacity when using these colors in your design. The defined colors will be available as `backgroundColor`, `color`, and `borderColor`. _These settings can be customized in `config.colors`, `config.opacities`, `config.fontFamilies` and `config.fontWeights`)._ Colors can be configured exactly as in [Tailwind CSS](https://tailwindcss.com/docs/customizing-colors#using-custom-colors). Also the Color object syntax with a `DEFAULT` key will work.

Dark mode is enabled by default based on the operating system preference, but you can also use a custom class to enable it. Additionally, dark mode can be disabled by setting the type to `disabled`.

```js
const themeStyle = themeSprinkles({
  backgroundColor: 'gray-700',
  backgroundColorOpacity: {
    default: 50,
    darkMode: 25,
  },
});
```

The `config.opacities`, `config.fontFamilies`, and `config.fontWeights` settings determine the available options for colors, font families, and font weights in your design. Dark mode settings can be customized in `config.darkmode`.

---

## `pickColor` method:

Sometimes `themesSprinkles` is not enough to define a color at a specific point. This method makes it easy to access color outside of `themeSprinkles`. This can be useful in situations where you need to style a pseudo-element or apply a color in a way that is not covered by the themesSprinkles object.

You can use the pickColor method to access any color available in the themesSprinkles object. Simply pass the name of the color as the first argument, and the desired opacity as the second argument. The method will return a string representing the requested color with the specified opacity applied.

```js
import { style, pickColor } from './style.config.css';

const block = style({
  boxShadow: `0 10px 10px ${pickColor('tahiti-light', 50)}`,
});
```

---

### useful methods:

This library provides useful methods to improve readability and type safety.

- **`defineSize`**: To create the css functions `clamp`, `min`, `max` or `minmax` more easily.

  ```js
  import { style } from './style.config.css';
  import { defineSize } from '@antoniogross/vanilla-essence';

  const title = style({
    fontSize: defineSize({
      min: 12,
      max: 36,
      ideal: '40vw',
    }),
  });
  ```

---

### Preflight CSS / Reset CSS:

To reset your CSS, simply import the `@antoniogross/vanilla-essence/src/css/preflight.css` file. This file is based on [Tailwind's preflight file](https://unpkg.com/tailwindcss@3.2.4/src/css/preflight.css).

---

### Known, currently necessary workarounds:

- If you are having issues with the media query order in the CSS output, you can try creating an `initResponsiveStyle` at the top of your application. This style does not need to be used anywhere, and can help fix incorrect media query order. Here is an example of how to create an `initResponsiveStyle`:

```js
const initResponsiveStyle = style({
  '@responsive': {
    sm: { display: 'block' },
    md: { display: 'block' },
    lg: { display: 'block' },
    xl: { display: 'block' },
    '2xl': { display: 'block' },
  },
});
```
