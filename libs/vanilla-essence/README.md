# Vanilla Essence

This library is based on [Vanilla Extract](https://vanilla-extract.style/), and adds key features of [Tailwind CSS](https://tailwindcss.com/) and [Stylex](https://www.youtube.com/watch?v=ur-sGzUWId4).

First read the documentation of [Vanilla Extract](https://vanilla-extract.style/). It works exactly the same, only now with a few more advantages.

If you currently use [Vanilla Extract](https://vanilla-extract.style/), you can simply swap the library, configure it and update your imports and everything should run fine.

## Configure Vanilla Essence:

To use `Vanilla Essence`, you must create a config-file and call the `initStyle` method. This file must be a `.css.ts` file, otherwise it will not work. This method then provides you with a perfectly typed custom `style` and `responsiveStyle` method.
You can place the file anywhere you want. A good option is to create a file named `style.config.css.ts` in the globals `style` folder of your application.

The easiest way to set everything up is as follows:

```js
import { initStyle } from '@antoniogross/vanilla-essence';
import defaultConfig from '@antoniogross/vanilla-essence/src/config/default';

export const { style, responsiveStyle, themeSprinkles } =
  initStyle(defaultConfig);
```

---

## Key Differences to Vanilla Extract´s `style` API are:

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

- **Rem Conversion:** It automatically converts a numeric value to a rem value. By default enabled for: `fontSize, letterSpacing, lineHeight`.

  - **(You can customize these settings in `config.remPropList`). You can enable the conversion for any valiue with '\*'.**

- **Magic Values:** It adds _"Magic Values"_. You may already know this from the sprinkles API. There it is called `shorthands`. By default available is: `paddingX, paddingY, marginX, marginY`. You can just use it inside the `style` API.

  - **(You can customize these settings in `config.magicProps`).**

- **`responsiveStyle` API:** This allows for extremely fast implementation of Responsive Styling. By default it uses the same breakpoints as you know from [Tailwind CSS](https://tailwindcss.com/docs/responsive-design).
  - **(You can customize these settings in `config.breakpoints`).**

```js
const responsiveClass = responsiveStyle({
  default: {
    backgroundColor: 'grey',
    paddingX: 12,
  },
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

You can define your colors in the same way as in [Tailwind CSS](https://tailwindcss.com/docs/responsive-design). The colors must be hex values. These values are then automatically converted to RGB values, which gives you the possibility to change the opacity when using these colors. Defined colors will be available as `backgroundColor`, `color` and `borderColor`.

```js
const themeStyle = themeSprinkles({
  backgroundColor: 'gray-700',
  backgroundColorOpacity: 50,
});
```

- **(You can customize these settings in `config.colors` and `config.opacities`).**

---

### Preflight CSS / Reset CSS

It is now very easy to reset the CSS. Just import `'@antoniogross/vanilla-essence/src/css/preflight.css'` and everything is done. The file is mostly based on [Tailwind's preflight file](https://unpkg.com/tailwindcss@3.2.4/src/css/preflight.css).

---

### Known, currently necessary workarounds

- Sometimes it can help to create an `initResponsiveStyle` if the media query order of the CSS output is not correct. This style should be placed at the top of the application and does not need to be used anywhere. Especially when using `atomicCss`

```js
const initResponsiveStyle = responsiveStyle({
  sm: { display: 'block' },
  md: { display: 'block' },
  lg: { display: 'block' },
  xl: { display: 'block' },
  '2xl': { display: 'block' },
});
```
