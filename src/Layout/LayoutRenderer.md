## Create your own


You can extend any `LayoutRenderer` within every projects that use $PACKAGE_NAME.

If you create one in your project under `styleguide/components/Layout.js`, it will be automatically picked instead of ours by our auto configuration.

For example, you can do the following to override the Layout to plug a `logo`.

```js static
const LayoutRendererOriginal = require('$PACKAGE_NAME/lib/Layout');
const logo = require('./yourLogo');
export default (props) => <LayoutRendererOriginal {...props} logo={logo} />
```

This will wrap your website into the layout, react styleguidist know what needs to be passed in order to work.

 
