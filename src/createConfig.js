import { existsSync, readFileSync } from 'fs';
import path, {
  join,
  resolve,
  basename,
  dirname,
} from 'path';
import parse from 'parse-author';
import webpack from 'webpack';
import merge from 'webpack-merge';
import { generateCSSReferences, generateJSReferences } from 'mini-html-webpack-plugin';
import defaultLoaders from './loaders';
import { aliases } from '@expo/webpack-config/env';

/**
 * It gives a valid webpack configuration for working with react-native and expo
 * @returns {*}
 */
export function getReactNativeConfiguration() {
  return {
    resolve: {
      // auto resolves any react-native import as react-native-web
      alias: {
        react$: require.resolve('react'),
        'react-dom$': require.resolve('react-dom'),
        // 'react-art$': require.resolve('react-art'),
        // Home made fix
        './RNGestureHandlerModule': join(__dirname, 'node_modules', 'react-native-gesture-handler', 'RNGestureHandlerModule.web.js'),
        './GestureHandlerButton': join(__dirname, 'node_modules', 'react-native-gesture-handler', 'GestureHandlerButton.web.js'),
        './GestureComponents': join(__dirname, 'node_modules', 'react-native-gesture-handler', 'GestureComponents.web.js'),
        './PlatformConstants': join(__dirname, 'node_modules', 'react-native-gesture-handler', 'PlatformConstants.web.js'),
        './resolveAssetSource': join(__dirname, 'node_modules', 'expo-asset', 'build', 'resolveAssetSource.web.js'),
        './EmbeddedAssets': join(__dirname, 'node_modules', 'expo-asset', 'build', 'EmbeddedAssets.web.js'),
        './AssetSourceResolver': join(__dirname, 'node_modules', 'expo-asset', 'build', 'AssetSourceResolver.web.js'),
        './AssetRegistry': join(__dirname, 'node_modules', 'expo-asset', 'build', 'AssetRegistry.web.js'),
        // Expo add react, react-native, react-native-web, and more
        ...aliases,
      },
      extensions: ['.web.js', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules[/\\](?!react-native|react-native-paper|react-native-vector-icons|react-native-safe-area-view|react-native-gesture-handler|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?\/.*|react-navigation|@react-navigation\/.*|@unimodules\/.*|unimodules-*|sentry-expo|native-base)/,
          options: {
            plugins: [
              '@babel/proposal-class-properties',
              '@babel/proposal-object-rest-spread',
              'react-native-web',
            ],
            presets: [
              '@babel/preset-env',
              'module:metro-react-native-babel-preset',
            ],
            babelrc: false,
            configFile: false,
          },
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                hash: 'sha512',
                digest: 'hex',
                name: '[hash].[ext]',
              },
            },
          ],
        },
        {
          test: /\.ttf$/,
          loader: 'file-loader',
        },
      ],
    },
    // Most react native projects will need some extra plugin configuration.
    plugins: [
      // Add __DEV__ flag to browser example.
      new webpack.DefinePlugin({
        __DEV__: process.env,
      }),
    ],
  };
}

export const defaultOptions = {
  layout: null,
  layoutPath: 'lib/Layout/index.js',
  wrapperPath: 'lib/Wrapper/index.js',
  styleguideConfigPath: 'lib/styleguide.config.js',
  loadersConfigPath: 'lib/loaders/index.js',
  faviconConfigPath: 'lib/favicons/index.js',
  styleGuideDirPath: 'styleguide',
  extensionFile: 'styleguide.ext.json',
  setupFile: 'setup.js',
  optionsPath: 'lib/options.js',
  licensePath: 'LICENSE.md',
  locale: 'en',
  loader: Object.keys(defaultLoaders)[0],
  loaders: defaultLoaders,
  loaderInnerApp: true,
  favicon: null,
  favicons: {},
  head: null,
  disableAutoConf: false,
  themeColor: null,
  reactNative: true,
};

export const webpackMerge = merge;

/**
 * @private
 * @name retrieveComponentsApiPath
 * This will decide what styleguide
 * @param defaultStyleGuidePath
 * @param defaultWrapperPath
 * @param pkg
 * @param thisPkg
 * @param base
 * @param opts
 * @returns {{finalStyleGuidePath: {}, finalWrapperPath: {}, finalConfigExtension: {}, finalFaviconExtension: {}, finalOptionsExtension: {}}}
 */
function retrieveComponentsApiPath(defaultStyleGuidePath, defaultWrapperPath, pkg, thisPkg, base, opts) {
  let finalStyleGuidePath = defaultStyleGuidePath;
  let finalWrapperPath = defaultWrapperPath;
  let finalConfigExtension = {};
  let finalLoadersExtension = {};
  let finalFaviconExtension = {};
  let finalOptionsExtension = {};

  // get them dynamically, it must include documentation in the name, and be in devDependencies or dependencies
  let found = false;
  if (!opts.disableAutoConf) {
    [pkg.dependencies || {}, pkg.devDependencies || {}].forEach((o) => {
      Object.keys(o).forEach((dep) => {
        if (dep.includes('documentation') && !dep.includes(thisPkg.name)) {
          const { keywords } = require(join(base, 'node_modules', dep, 'package.json')); // eslint-disable-line
          if (keywords && keywords.indexOf(thisPkg.name) !== -1) {
            if (existsSync(join(base, 'node_modules', dep, opts.layoutPath))) {
              finalStyleGuidePath = join(base, 'node_modules', dep, opts.layoutPath); // eslint-disable-line global-require
              found = dep;
            }
            if (existsSync(join(base, 'node_modules', dep, opts.wrapperPath))) {
              finalWrapperPath = join(base, 'node_modules', dep, opts.wrapperPath); // eslint-disable-line global-require
              found = dep;
            }
            if (existsSync(join(base, 'node_modules', dep, opts.styleguideConfigPath))) {
              finalConfigExtension = require(join(base, 'node_modules', dep, opts.styleguideConfigPath)); // eslint-disable-line global-require
              found = dep;
            }
            if (existsSync(join(base, 'node_modules', dep, opts.loadersConfigPath))) {
              finalLoadersExtension = require(join(base, 'node_modules', dep, opts.loadersConfigPath)); // eslint-disable-line global-require
              found = dep;
            }
            if (existsSync(join(base, 'node_modules', dep, opts.faviconConfigPath))) {
              finalFaviconExtension = require(join(base, 'node_modules', dep, opts.faviconConfigPath)); // eslint-disable-line global-require
              found = dep;
            }
            if (existsSync(join(base, 'node_modules', dep, opts.optionsPath))) {
              finalOptionsExtension = require(join(base, 'node_modules', dep, opts.optionsPath)); // eslint-disable-line global-require
              found = dep;
            }
          }
        }
      });
      if (found) {
        console.log(`Auto configuration with ${found}`); // eslint-disable-line no-console
      }
    });
  }

  // get them from on options
  if (!found && opts.layout && existsSync(join(base, 'node_modules', opts.layout))) {
    if (existsSync(join(base, 'node_modules', opts.layout, opts.layoutPath))) {
      finalStyleGuidePath = join(base, 'node_modules', opts.layout, opts.layoutPath); // eslint-disable-line global-require
      found = true;
    }
    if (existsSync(join(base, 'node_modules', opts.layout, opts.wrapperPath))) {
      finalWrapperPath = join(base, 'node_modules', opts.layout, opts.wrapperPath); // eslint-disable-line global-require
      found = true;
    }
    if (existsSync(join(base, 'node_modules', opts.layout, opts.styleguideConfigPath))) {
      finalConfigExtension = require(join(base, 'node_modules', opts.layout, opts.styleguideConfigPath)); // eslint-disable-line global-require
      found = true;
    }
    if (existsSync(join(base, 'node_modules', opts.layout, opts.loadersConfigPath))) {
      finalLoadersExtension = require(join(base, 'node_modules', opts.layout, opts.loadersConfigPath)); // eslint-disable-line global-require
      found = true;
    }
    if (existsSync(join(base, 'node_modules', opts.layout, opts.faviconConfigPath))) {
      finalFaviconExtension = require(join(base, 'node_modules', opts.layout, opts.faviconConfigPath)); // eslint-disable-line global-require
      found = true;
    }
    if (existsSync(join(base, 'node_modules', opts.layout, opts.optionsPath))) {
      finalOptionsExtension = require(join(base, 'node_modules', opts.layout, opts.optionsPath)); // eslint-disable-line global-require
      found = true;
    }
    if (!found) {
      console.log(`We cannot find the layout for package ${opts.layout}, it must be installed.`); // eslint-disable-line no-console
    }
  }

  // finally get local one
  if (existsSync(join(base, 'styleguide/components'))) {
    if (existsSync(join(base, 'styleguide/components/Layout.js'))) {
      finalStyleGuidePath = join(base, 'styleguide/components/Layout.js'); // eslint-disable-line global-require
    }
    if (existsSync(join(base, 'styleguide/components/Wrapper.js'))) {
      finalWrapperPath = join(base, 'styleguide/components/Wrapper.js'); // eslint-disable-line global-require
    }
  }

  return {
    finalStyleGuidePath,
    finalWrapperPath,
    finalConfigExtension,
    finalLoadersExtension,
    finalFaviconExtension,
    finalOptionsExtension,
  };
}

/**
 * @public
 * @description You need to import `createConfig` into your styleguidist configuration file (generally `styleguide.config.js`).
 * All options are optional, and can be autoconfigured by installing a [layout package](#layout-package-create).
 * @param {Object} config for react-styleguidist user configuration, it will be used to override our default styleguide configuration.
 * @param {Object} options for $PACKAGE_NAME features
 * @param {string} [options.layout=null] options.layout - Name of the layout package
 * @param {string} [options.layoutPath=lib/Layout] options.layoutPath - Location of the Layout component within the layout package
 * @param {string} [options.wrapperPath=lib/Wrapper] options.wrapperPath - Location of the Wrapper component within the layout package
 * @param {string} [options.styleguideConfigPath=lib/styleguide.config.js] options.styleguideConfigPath - Location of the styleguide.config.js within the layout package
 * @param {string} [options.loadersConfigPath=lib/loaders] options.loadersConfigPath - Location of the loaders within the layout package
 * @param {string} [options.styleGuideDirPath=styleguide] options.styleGuideDirPath - Location of the styleguide configuration directory within your project
 * @param {string} [options.extensionFile=styleguide.ext.json] options.extensionFile - Name of the styleguide configuration extension within your project
 * @param {string} [options.setupFile=setup.js] options.setupFile - Name of the setup file within your project
 * @param {string} [options.licensePath=LICENSE.md] options.licensePath - Location of the license within your project
 * @param {string} [options.locale=en] options.locale - Locale used for the documentation
 * @param {string} [options.loader=wave] options.loader - Loader to be used for the documentation
 * @param {string} [options.optionsPath=lib/options.js] options.optionsPath - Object of options that will be hooked and used for generating the configuration. This options **can't** contains options related to path and autoconfigrauton, it can **only** exploit features that happen after.
 * @param {Object} [options.loaders={ wave: '<!-- content of wave loader >' }] options.loaders - object available for use (if layout package is installed, they will be automatically added during autoconfiguration)
 * @param {boolean} [options.loaderInnerApp=true] options.loaderInnerApp - If set to false, the loader will be injected in the main html outside of the react application context
 * @param {string} [options.favicon=null] options.favicon - favicon name
 * @param {string} [options.favicons={}] options.favicons - Object with favicon name and href value for favicon
 * @param {string} [options.head=null] options.head - This will be injected at the end of `<head />` tag
 * @param {boolean} [options.disableAutoConf=false] option.disableAutoConf - Disable auto configuration of layout package
 * @param {string} [options.themeColor=null] option.themeColor - This will add a meta with name `theme-color` and content using color in opts.themeColor
 * @paran {boolean} [options.reactNative=true] options.reactNative - Configure webpack to work with react-native and expo
 * @example
 * // Choose manually a layout package and expand example by default
 * const { createConfig } = require('$PACKAGE_NAME');
 * const styleguideConfig = { exampleMode: 'expand' };
 * const options = { layout: '@bootstrap-styled/documentation' };
 * const config = createConfig(styleguideConfig, options);
 * // this is a working and compatible react-styleguidist configuration
 * module.exports = config;
 * @returns {Object} react-styleguidist configuration
 */
export function createConfig(config = {}, options = {}) {
  const {
    webpackConfig: userWebpackConfig,
    require: userRequireConfig,
    styleguideComponents: userStyleguideComponents,
    ...userConfig
  } = config;
  let opts = { ...defaultOptions, ...options };
  const cwd = process.cwd();

  const base = existsSync(join(cwd, 'package.json')) ? join(cwd) : join(__dirname, '..');
  const extension = existsSync(join(base, opts.styleGuideDirPath, opts.extensionFile)) ? require(path.join(base, opts.styleGuideDirPath, opts.extensionFile)) : {}; // eslint-disable-line global-require

  // just for generating it's own documentation, we need it.
  const thisPkgPath = join(__dirname, '../package.json');
  const thisPkg = existsSync(thisPkgPath) ? require(thisPkgPath) : {}; // eslint-disable-line global-require

  // retrieve info
  const pkg = require(join(base, 'package.json')); // eslint-disable-line global-require
  const licensePath = existsSync(join(base, opts.licensePath)) ? join(base, opts.licensePath) : join(base, opts.licensePath);
  const license = existsSync(licensePath) ? readFileSync(licensePath, { encoding: 'utf8' }).split('\n')[0] : console.log(`${opts.licensePath} is missing!`); // eslint-disable-line prefer-destructuring, no-console

  // use setup file,
  const requireConfig = [];
  if (existsSync(resolve(base, opts.styleGuideDirPath, opts.setupFile))) {
    requireConfig.push(resolve(base, opts.styleGuideDirPath, opts.setupFile));
  }

  // Local Layout and Wrapper in case no selection
  const defaultStyleGuidePath = existsSync(join(__dirname, '../src/Layout')) ? join(__dirname, '../src/Layout') : join(__dirname, '../lib/Layout');
  const defaultWrapperPath = existsSync(join(__dirname, '../src/Wrapper')) ? join(__dirname, '../src/Wrapper') : join(__dirname, '../lib/Wrapper');

  // External layout selection
  const {
    finalStyleGuidePath,
    finalWrapperPath,
    finalConfigExtension,
    finalLoadersExtension,
    finalFaviconExtension,
    finalOptionsExtension,
  } = retrieveComponentsApiPath(defaultStyleGuidePath, defaultWrapperPath, pkg, thisPkg, base, opts);

  // Prepare to apply custom conf
  const {
    webpackConfig: finalWebpackConfig,
    styleguideComponents: finalStyleguideComponents,
    require: finalRequireConfig,
    ...finalConfig
  } = finalConfigExtension;

  // merge options
  opts = {
    ...opts,
    ...finalOptionsExtension,
  };

  // Prepare loaders
  const loaders = {
    ...opts.loaders,
    ...(finalLoadersExtension || {}),
  };

  let { loader } = opts;
  if (Object.keys(finalLoadersExtension || {}).length && opts.loader === defaultOptions.loader) {
    loader = Object.keys(finalLoadersExtension)[0]; // eslint-disable-line
  }

  // Prepare favicons
  const favicons = {
    ...opts.favicons,
    ...(finalFaviconExtension || {}),
  };

  let { favicon } = opts;
  if (Object.keys(finalFaviconExtension || {}).length && opts.favicon === defaultOptions.favicon) {
    favicon = Object.keys(finalFaviconExtension)[0]; // eslint-disable-line
  }

  // Module aliases
  const moduleAliases = {
    $PACKAGE_NAME: resolve(base),
    [pkg.name]: resolve(base),
  };

  // webpack
  const webpackConfig = webpackMerge({
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map',
        exclude: [
          'node_modules/**/*.js',
        ],
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.GA_TRACKING_ID': JSON.stringify(process.env.GA_TRACKING_ID),
      }),
    ],
    resolve: {
      alias: moduleAliases,
    },
    module: {
      rules: [
        // Babel loader, will use your project’s .babelrc
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          include: [
            resolve(join(cwd, 'src')),
            resolve(join(cwd, opts.styleGuideDirPath)),
          ],
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                // Inline files smaller than 10 kB
                limit: 10 * 1024,
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  enabled: false,
                  // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                  // Try enabling it in your environment by switching the config to:
                  // enabled: true,
                  // progressive: true,
                },
                gifsicle: {
                  interlaced: false,
                },
                optipng: {
                  optimizationLevel: 7,
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4,
                },
              },
            },
          ],
        },
        {
          test: /\.(mp4|webm)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        },
      ],
    },
  }, finalWebpackConfig || {}, opts.reactNative ? getReactNativeConfiguration() : {}, userWebpackConfig || {});

  const styleguideComponents = {
    ...{
      // API components
      StyleGuideRenderer: finalStyleGuidePath,
      Wrapper: finalWrapperPath,
      // rsg-components
      ArgumentRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Argument/ArgumentRenderer.js'),
      ArgumentsRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Arguments/ArgumentsRenderer.js'),
      CodeRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Code/CodeRenderer.js'),
      ComponentsRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Components/ComponentsRenderer.js'),
      ComponentsList: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/ComponentsList/ComponentsList.js'),
      ComponentsListRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/ComponentsList/ComponentsListRenderer.js'),
      Editor: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Editor/Editor.js'),
      EditorLoaderRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Editor/EditorLoaderRenderer.js'),
      ErrorRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Error/ErrorRenderer.js'),
      ExamplePlaceholderRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/ExamplePlaceholder/ExamplePlaceholderRenderer.js'),
      ExamplesRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Examples/ExamplesRenderer.js'),
      HeadingRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Heading/HeadingRenderer.js'),
      LinkRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Link/LinkRenderer.js'),
      LogoRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Logo/LogoRenderer.js'),
      Markdown: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Markdown'),
      Blockquote: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Markdown/Blockquote'),
      BlockquoteRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Markdown/Blockquote/BlockquoteRenderer.js'),
      Checkbox: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Markdown/Checkbox'),
      CheckboxRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Markdown/Checkbox/CheckboxRenderer.js'),
      Hr: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Markdown/Hr'),
      HrRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Markdown/Hr/HrRenderer.js'),
      JsDoc: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/JsDoc'),
      List: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Markdown/List'),
      ListRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Markdown/List/ListRenderer.js'),
      MarkdownHeading: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Markdown/MarkdownHeading'),
      MarkdownHeadingRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Markdown/MarkdownHeading/MarkdownHeadingRenderer.js'),
      Pre: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Markdown/Pre'),
      PreRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Markdown/Pre/PreRenderer.js'),
      TableHeadRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Markdown/Table/TableHeadRenderer.js'),
      TableBodyRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Markdown/Table/TableBodyRenderer.js'),
      TableRowRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Markdown/Table/TableRowRenderer.js'),
      TableCellRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Markdown/Table/TableCellRenderer.js'),
      MessageRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Message/MessageRenderer.js'),
      MethodsRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Methods/MethodsRenderer.js'),
      NameRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Name/NameRenderer.js'),
      ParaRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Para/ParaRenderer.js'),
      PathlineRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Pathline/PathlineRenderer.js'),
      PlaygroundRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Playground/PlaygroundRenderer.js'),
      PlaygroundErrorRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/PlaygroundError/PlaygroundErrorRenderer.js'),
      ReactComponentRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/ReactComponent/ReactComponentRenderer.js'),
      RibbonRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Ribbon/RibbonRenderer.js'),
      SectionRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Section/SectionRenderer.js'),
      SectionHeadingRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/SectionHeading/SectionHeadingRenderer.js'),
      SectionsRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Sections/SectionsRenderer.js'),
      slots: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/slots'),
      TabButtonRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/TabButton/TabButtonRenderer.js'),
      TableRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Table/TableRenderer.js'),
      TableOfContents: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/TableOfContents/TableOfContents'),
      TableOfContentsRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/TableOfContents/TableOfContentsRenderer.js'),
      TextRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Text/TextRenderer.js'),
      ToolbarButtonRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/ToolbarButton/ToolbarButtonRenderer.js'),
      TypeRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Type/TypeRenderer.js'),
      Usage: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Usage/Usage.js'),
      VersionRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Version/VersionRenderer.js'),
      WelcomeRenderer: join(base, 'node_modules/@bootstrap-styled/rsg-components/lib/Welcome/WelcomeRenderer.js'),
      ...(finalStyleguideComponents || {}),
      ...(userStyleguideComponents || {}),
    },
  };

  return {
    serverPort: process.env.NODE_PORT ? parseInt(process.env.NODE_PORT, 10) : 6060, // eslint-disable-line radix
    require: [
      '@babel/polyfill',
      ...requireConfig,
      ...finalRequireConfig || [],
      ...userRequireConfig || [],
    ],
    styleguideDir: 'public',
    components: [
      'src/components/**/[A-Z]*.js',
      'src/components/**/[A-Z]*/index.js',
    ],
    previewDelay: 500,
    skipComponentsWithoutExample: false,
    exampleMode: 'expand',
    usageMode: 'expand',
    showSidebar: true,
    styles: {},
    title: pkg.name,
    verbose: false,
    version: pkg.version,
    getComponentPathLine(componentPath) {
      let name = '';
      let ext = '';
      let key = null;
      if (/.js$/.test(componentPath)) {
        name = basename(componentPath, '.js');
      } else if (/.svg$/.test(componentPath)) {
        // we can import svg as react component using @svgr/webpack
        name = basename(componentPath, '.svg');
        key = 'ReactComponent';
        ext = '.svg';
      }
      const dir = name === 'index' ? dirname(componentPath) : `${dirname(componentPath)}/${name}`;
      name = name === 'index' ? basename(dir) : name;
      const es6import = key ? `{ ${key} as ${name[0].toUpperCase()}${name.slice(1)} }` : name;
      return `import ${es6import} from '${pkg.name}/${dir.replace(/^src\//, 'lib/')}${ext}';`;
    },
    // this is useful for markdown generated with documentationjs
    updateExample(props) {
      const { settings, lang } = props;
      if (lang === 'javascript') {
        settings.static = true;
      }
      return props;
    },
    template: ({
      css,
      js,
      title,
      publicPath,
    }) => `<!DOCTYPE html>
    <html lang="${opts.locale}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${pkg.description}">
        ${pkg.keywords && pkg.keywords.length > 0 ? `<meta name="keywords" content="${pkg.keywords.join(',')}">` : ''}
        <meta name="author" content="${parse(pkg.author).name}">
        ${license ? `<meta name="copyright" content="${license}" />` : ''}
        ${pkg.contributor && pkg.contributor.length > 0 ? `<meta name="contributor" content="${pkg.contributor.map((c) => parse(c).name).join(',')}">` : ''}
        ${pkg.private === undefined ? '<meta name="robots" content="index,follow"/>' : ''/* undefined means the package is public */}
        ${pkg.private === false ? '<meta name="robots" content="nofollow"/>' : ''/* false means release in private */}
        ${pkg.private === true ? '<meta name="robots" content="noindex, nofollow"/>' : ''/* true means never released */}
        ${pkg.name !== thisPkg.name ? `<meta name="${thisPkg.name}-version" content="${thisPkg.version}">\n<meta name="version" content="${pkg.version}">` : `<meta name="version" content="${pkg.version}">`}
        ${favicon ? `<link rel="icon" type="image/x-icon" href="${favicons[favicon]}">` : ''}
        ${opts.themeColor ? `<meta name="theme-color" content="${opts.themeColor}" />` : ''}
        ${opts.head ? opts.head : ''}
        <title>${title}</title>
        ${generateCSSReferences(css, publicPath)}
      </head>
      <body>
      ${!opts.loaderInnerApp ? loaders[loader] : ''}
      <div id="rsg-root">${opts.loaderInnerApp ? loaders[loader] : ''}</div>
      ${generateJSReferences(js, publicPath)}
      </body>
    </html>`,
    styleguideComponents,
    webpackConfig,
    ...finalConfig, // the configuration found in layout package
    ...extension, // the extension file found in the documentation project
    ...userConfig, // the user styleguide configuration override, without webpackConfig, require and styleguideComponents which are already merged
  };
}
