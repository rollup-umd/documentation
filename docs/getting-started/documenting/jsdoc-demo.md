This is how we have generated the [createConfig](#configuration) documentation:

```js static
/**
 * @public
 * @description You need to import `createConfig`  into your styleguidist configuration file (generally `styleguide.config.js`).
 * All options are optional, and can be autoconfigured by installing a [layout package](#layout-package-create).
 * @param {Object} config for react-styleguidist user configuration, it will be used to override our default styleguide configuration.
 * @param {Object} options for $PACKAGE_NAME features
 * @param {string} [options.layout=''] options.layout - Name of the layout package
 * @param {string} [options.layoutPath=lib/Layout] options.layoutPath - Location of the Layout component within the layout package
 * @param {string} [options.wrapperPath=lib/Wrapper] options.wrapperPath [options.wrapperPath=lib/Wrapper] - Location of the Wrapper component within the layout package
 * @param {string} [options.selectionConfigPath=lib/styleguide.config.js] options.selectionConfigPath - Location of the styleguide.config.js within the layout package
 * @param {string} [options.styleGuideDirPath=styleguide] options.styleGuideDirPath - Location of the styleguide configuration directory within your project
 * @param {string} [options.extensionFile=styleguide.ext.json] options.extensionFile - Name of the styleguide configuration extension within your project
 * @param {string} [options.setupFile=setup.js] options.setupFile - Name of the setup file within your project
 * @param {string} [options.licensePath=LICENSE.md] options.licensePath - Location of the license within your project
 * @param {string} [options.locale=en] options.locale - Locale used for the documentation
 * @param {string} [options.loader=wave] options.loader - Loader to be used for the documentation
 * @param {Object} [options.loaders={ wave: '<!-- content of wave loader >' }] options.loaders - object available for use (if layout package is installed, they will be automatically added during autoconfiguration)
 * @param {boolean} [options.loaderInnerApp=true] options.loaderInnerApp - If set to false, the loader will be injected in the main html outside of the react application context
 * @param {string} [options.favicon=null] options.favicon - Favicon href url
 * @param {string} [options.head=null] options.head - This will be injected at the end of `<head />` tag
 * @example
 * // Choose manually a layout package and expand example by default
 * const { createConfig } = require('$PACKAGE_NAME');
 * const styleguideConfig = { exampleMode: 'expand' };
 * const options = { layout: '@bootstrap-styled/documentation' };
 * const config = createConfig(styleguideConfig, options);
 * // this is a working and compatible react-styleguidist configuration
 * module.exports = config;
 * @returns {Object} react-styleguidist [configuration](https://react-styleguidist.js.org/docs/configuration.html) configuration object
 */
export function createConfig(config = {}, options = {}) {}
```
