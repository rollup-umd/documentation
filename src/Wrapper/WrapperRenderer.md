```js
<Wrapper>This zone is wrapped</Wrapper>
```

## Create your own

You can extend any `<Wrapper />` within every projects that use $PACKAGE_NAME.

If you create one in your project under `styleguide/components/Wrapper.js`, it will be automatically picked instead of ours by our auto configuration.

For example, you can do the following to override the Wrapper to plug a redux store and internationalization:

```js static
import React from 'react';
import { combineReducers } from 'redux';
import Wrapper from '$PACKAGE_NAME/lib/Wrapper';

const messages = {
  en: {
    'dev-tools.rollup-umd.test': 'This is a dummy test string.',
  },
};

/* eslint-disable global-require */
export default (props) => (
  <Wrapper
    redux={require('redux')}
    react-redux={require('react-redux')}
    reducer={combineReducers({
      locale: () => 'en',
    })}
    react-intl={require('react-intl')}
    messages={messages.en}
    {...props}
  />
);

```

> This will wrap every JS example with the Provider and a new store,If you want to have a single store, you should use the Provider inside the LayoutRenderer.  
