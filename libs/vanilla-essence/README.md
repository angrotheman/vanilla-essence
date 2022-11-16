# Vanilla Essence

This library is based on [Vanilla Extract](https://vanilla-extract.style/), and adds key features of [Tailwind CSS](https://tailwindcss.com/) and [Stylex](https://www.youtube.com/watch?v=ur-sGzUWId4).

First read the documentation of [Vanilla Extract](https://vanilla-extract.style/). It works exactly the same, only now with a few more advantages.

If you currently use [Vanilla Extract](https://vanilla-extract.style/), you can simply swap the library and everything should run fine.

## Key Differences to Vanilla Extract are:

- A CSS class is created for each CSS property. This way the last class always wins and it is extremely easy to override stylings. Also, the size of the bundled file is smaller because there are no repetitions. _(currently this is not available for pseudo-classes)_.

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

- It automatically converts any numeric value to a rem value. (currently enabled for: `fontSize, letterSpacing, lineHeight`).
- It adds _"Magic Values"_. You may already know this from the sprinkles API. There it is called `shorthands`. Currently available is: `paddingX, paddingY, marginX, marginY`. You can just use it inside the `style` API.
- It provides a new `responsiveStyle` API. Currently it uses the same breakpoints as you know from [Tailwind CSS](https://tailwindcss.com/docs/responsive-design).

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
  xl: {},
  '2xl': {},
});
```

- It provides a new `createUniqueIdentifier` method which is useful when you need to use `globalStyle` to style a child element of a css class.

```js
const identifier = createUniqueIdentifier();

const a = style([identifier, { color: 'red' }]);
const b = globalStyle(`${identifier} svg`, {
  width: '100%',
});
```

---

### Known, currently necessary workarounds

- Sometimes it can help to create an `initResponsiveStyle` if the media query order of the CSS output is not correct. This style should be placed at the top of the application and does not need to be used anywhere.

```js
const initResponsiveStyle = responsiveStyle({
  sm: { display: 'block' },
  md: { display: 'block' },
  lg: { display: 'block' },
  xl: { display: 'block' },
  '2xl': { display: 'block' },
});
```
