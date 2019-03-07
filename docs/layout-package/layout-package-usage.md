## Manual configuration

You can select a package using `options.layout` in [createConfig](#create-config).

```js static
// Choose manually a layout package and expand example by default
const { createConfig } = require('$PACKAGE_NAME');
const styleguideConfig = { exampleMode: 'expand' };
// set the name of the layout package in options
const options = { layout: '@bootstrap-styled/documentation' };
const config = createConfig(styleguideConfig, options);
// this is a working and compatible react-styleguidist configuration
module.exports = config;
```

## Auto Configuration 

If a layout package is installed in your `devDependencies` or `dependencies`, it will be automatically found and use upon startup.

It does not need any code change, this bring benefits:

- If you wan't a different layout package, you just need to remove it and install another, it will be automatically picked.
- If you need to upgrade the layout version, you just need to upgrade the version in your `package.json` and type `npm install`.

## Using your loaders

If you have created `loaders`, you can use it by passing to [createConfig](#create-config)
the `options.loader`.

Loaders are automatically loaded when using auto configuration or manual configuration 
## Override layout from layout package

You can override both, `Layout` and `Wrapper`, just create in your project:

- `styleguide/components/Layout.js`: override or extend any `Layout`.
- `styleguide/components/Wrapper.js`: override or extend any `Wrapper`.

It will be automatically picked up. 

The downside is when this should be applied to multiple project, updating become more complex.

If you need to override in a single project it's fine, otherwise you should create another layout package. 

### Modifying webpack config

If you are not still not satisfied with the webpack configuration, you can override it during [createConfig](#create-config)
using `config.webpackConfig`, it will merged on top of the general config.
