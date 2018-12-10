Creating a layout package is easy

1. The package must include the string `documentation` in it's name.
2. The `package.json` [`keywords`](https://docs.npmjs.com/files/package.json#keywords) must include the key `@rollup-umd/documentation`. 
3. The file structure of your project needs to be (but every file are optional):

```bash
lib
├── styleguide.config.js
├── options.js
├── favicons
│   └── index.js
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

**`styleguide.config.js`**

It is react-styleguidist configuration that will be applied in ours.

It must return an `Object`.
 
**`options.js`**

It is $PACKAGE_NAME options that will be applied by ours after autoconfiguration, which means path for autoconfiguration cannot be reconfigured through this.

It must return an `Object`.

```js static
export default {
  themeColor: 'rgb(46, 166, 152)',
}
```

**`favicons/index.js`**

Your file must look like this:

```js static
export default {
  wave: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAC\n' +
  'HUlEQVQ4jXWRP0jVcRTFP/f+vu+9fNrDpEjBqCVoEGsocWmJ/iKZEDWEU38QEocwWsSWmmpyrIjG\n' +
  'sL9QgxThUA0O1aKDJIWYmv/ylT7z/ft9b4OK+nrvwF3uOZx7LkcogcFjJxSRFhP5VP+mb6yUTksR\n' +
  'mO0BekSkY7DpdEldUWLwyFGHWSdmtcBF4EApA3m+tzm6u/J3RSziPSKgCs7Vo/oa1QTOgeoznGvH\n' +
  'uSzOgXP8nI34mV9BymXzGp9Y2Pp017bF7ZHAdDV+FZBYPyMtQB2QDz1+ZlL96Ljciye474amdy6E\n' +
  'xsuR5N+euuo5X51YdsH/SZ0h+5YW1H8fjfgfU24s6+XFzZEHPviQ+2yNkYbhZCZ2fHi+qnY+U5ZP\n' +
  'lOV8PBqqqGCi5LKBnxyLhd++RiW5EIg3uWbIQH/ui8naiY5Y+8mMad+yBYiD/TVJf6gm6UkJs1Mx\n' +
  'XUw7TVtA2oL3eZOm66lHKQAH0Fl2VbOe6JrZUs7xbrRaJ6bLORyb1ZzfVJYrUqPFVay78PF0XpX1\n' +
  'kCtKaAyRltvllxVAu+JtGmAXBA4WGhhSuAJQb9LtV1tSsLhil4CZDZMCWPKb0s6v8QaV3jjfFW9T\n' +
  'B5IGzmxUhiYNQK+HLQCCvRW4AmQ3pEuvcEXQHNyIZkwf7ggyrWcrxlN59NS5ZO/Hov8UW74K72RD\n' +
  '5K5icwpPBAaK6aCgkgIMRcXfWvSuv/XP43wp0T84kNcr9/KNuQAAAABJRU5ErkJggg==',
};
```

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

Generally, if all you want is updating the theme, you will need to create a `Layout` in your layout package as follow:


```js static
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyleGuideRenderer from '@rollup-umd/documentation/lib/Layout';
import theme from '../theme';

export default class LayoutRenderer extends Component { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    theme, // <--- this is where you hook your theme, this way, even your own LayoutRenderer can be extended and used another theme
    ga: process.env.GA_ID,
    logoMenu: {
      logo: null,
      href: null,
      alt: 'Example of layout renderer',
    },
    logoFooter: {
      logo: null,
      href: null,
      alt: 'Example of layout renderer',
    },
  };

  static propTypes = {
    /** Our edited theme */
    theme: PropTypes.object,
    /** Google analytics configuration */
    ga: PropTypes.shape({
      /** Google analytics id */
      id: PropTypes.string,
    }),
    /** Logo to use in sidebar menu */
    logoMenu: PropTypes.shape({
      logo: PropTypes.node,
      href: PropTypes.string,
      alt: PropTypes.string,
    }),
    /** Logo to use in footer */
    logoFooter: PropTypes.shape({
      logo: PropTypes.node,
      href: PropTypes.string,
      alt: PropTypes.string,
    }),
  };

  render() {
    const { ...rest } = this.props;
    return (
      <StyleGuideRenderer {...rest} />
    );
  }
}

```
