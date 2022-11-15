# Vanilla Essence

This library is based on [Vanilla Extract](https://vanilla-extract.style/), and adds key features of [Tailwind CSS](https://tailwindcss.com/) and [Stylex](https://www.youtube.com/watch?v=ur-sGzUWId4).

First read the documentation of [Vanilla Extract](https://vanilla-extract.style/). It works exactly the same, only now with a few more advantages.

If you currently use [Vanilla Extract](https://vanilla-extract.style/), you can simply swap the library and everything should run fine.

## Key Differences to Vanilla Extract are:

- A CSS class is created for each CSS property. This way the last class always wins and it is extremely easy to override the styling. You will also have a smaller bundled file size due to no repetitions. (currently this is not available for responsive styling).
- It automatically converts any numeric value to a rem value. (currently enabled for: `fontSize, letterSpacing, lineHeight`).
- It adds _"Magic Values"_. You may already know this from the sprinkles API. There it is called `shorthands`. Currently available is: `paddingX, paddingY, marginX, marginY`. You can just use it inside the `style` API.
- It provides a new `responsiveStyle` API.
- It provides a new `createUniqueIdentifier` method which is useful when you need to use `globalStyle` to style a child element of a css class.

  ```js
  const identifier = createUniqueIdentifier();

  const a = style([identifier, { color: 'red' }]);
  const b = globalStyle(`${identifier} svg`, {
    width: '100%',
  });
  ```
