Creating a layout package is easy

1. The package must include the string `documentation` in it's name.
2. The `package.json` [`keywords`](https://docs.npmjs.com/files/package.json#keywords) must include the key `@rollup-umd/documentation`. 
3. The file structure of your project needs to be (but every file are optional):

```bash
lib
├── styleguide.config.js
├── Layout
│   ├── index.js
├── loaders
│   ├── wave.js
│   └── index.js
├── theme
│   └── index.js
└── Wrapper
    └── index.js
```

> If you don't respect this file structure, you can use [`createConfig`](#create-config) options to set the new file structure.

**`loaders/index.js`**

Your file must look like this:

```js static
import wave from './wave';
export default {
  wave,
};
```

With `wave.js` containing the html/css string to be injected in the html template.

**`theme/index.js`**

This file should export:

```js static
export const theme = {};
export default makeTheme;
```

If you don't know what is a `makeTheme` or a `theme`, you should read [Bootstrap Styled documentation](https://bootstrap-styled.github.com/bootstrap-styled).

If you don't know how theme work, please read the [theme](#layout-theme) section of this documentation.
