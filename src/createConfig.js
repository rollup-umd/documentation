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

export const defaultOptions = {
  layout: '',
  layoutPath: 'lib/Layout/index.js',
  wrapperPath: 'lib/Wrapper/index.js',
  styleguideConfigPath: 'lib/styleguide.config.js',
  loadersConfigPath: 'lib/loaders/index.js',
  styleGuideDirPath: 'styleguide',
  extensionFile: 'styleguide.ext.json',
  setupFile: 'setup.js',
  licensePath: 'LICENSE.md',
  locale: 'en',
  loader: Object.keys(defaultLoaders)[0],
  loaders: defaultLoaders,
  loaderInnerApp: false,
  favicon: null,
  head: null,
  disableAutoConf: false,
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
 * @returns {{finalStyleGuidePath: {}, finalWrapperPath: {}, finalConfigExtension: {}}}
 */
function retrieveComponentsApiPath(defaultStyleGuidePath, defaultWrapperPath, pkg, thisPkg, base, opts) {
  let finalStyleGuidePath = defaultStyleGuidePath;
  let finalWrapperPath = defaultWrapperPath;
  let finalConfigExtension = {};
  let finalLoadersExtension = {};

  // get them dynamically, it must include documentation in the name, and be in devDependencies or dependencies
  if (!opts.disableAutoConf) {
    [pkg.dependencies, pkg.devDependencies].forEach((o) => {
      Object.keys(o).forEach((dep) => {
        if (dep.includes('documentation') && !dep.includes(thisPkg.name)) {
          if (existsSync(join(base, 'node_modules', dep, opts.layoutPath))) {
            finalStyleGuidePath = join(base, 'node_modules', dep, opts.layoutPath); // eslint-disable-line global-require
          }
          if (existsSync(join(base, 'node_modules', dep, opts.wrapperPath))) {
            finalWrapperPath = join(base, 'node_modules', dep, opts.wrapperPath); // eslint-disable-line global-require
          }
          if (existsSync(join(base, 'node_modules', dep, opts.styleguideConfigPath))) {
            finalConfigExtension = require(join(base, 'node_modules', dep, opts.styleguideConfigPath)).default; // eslint-disable-line global-require
          }
          if (existsSync(join(base, 'node_modules', dep, opts.loadersConfigPath))) {
            finalLoadersExtension = require(join(base, 'node_modules', dep, opts.loadersConfigPath)).default; // eslint-disable-line global-require
          }
        }
      });
    });
  }

  // get them from on options
  if (existsSync(join(base, 'node_modules', opts.layout))) {
    if (existsSync(join(base, 'node_modules', opts.layout, opts.layoutPath))) {
      finalStyleGuidePath = join(base, 'node_modules', opts.layout, opts.layoutPath); // eslint-disable-line global-require
    }
    if (existsSync(join(base, 'node_modules', opts.layout, opts.wrapperPath))) {
      finalWrapperPath = join(base, 'node_modules', opts.layout, opts.wrapperPath); // eslint-disable-line global-require
    }
    if (existsSync(join(base, 'node_modules', opts.layout, opts.styleguideConfigPath))) {
      finalConfigExtension = require(join(base, 'node_modules', opts.layout, opts.styleguideConfigPath)).default; // eslint-disable-line global-require
    }
    if (existsSync(join(base, 'node_modules', opts.layout, opts.loadersConfigPath))) {
      finalLoadersExtension = require(join(base, 'node_modules', opts.layout, opts.loadersConfigPath)).default; // eslint-disable-line global-require
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
  };
}

/**
 * @public
 * @description You need to import `createConfig` into your styleguidist configuration file (generally `styleguide.config.js`).
 * All options are optional, and can be autoconfigured by installing a [layout package](#layout-package-create).
 * @param {Object} config for react-styleguidist user configuration, it will be used to override our default styleguide configuration.
 * @param {Object} options for $PACKAGE_NAME features
 * @param {string} [options.layout=''] options.layout - Name of the layout package
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
 * @param {Object} [options.loaders={ wave: '<!-- content of wave loader >' }] options.loaders - object available for use (if layout package is installed, they will be automatically added during autoconfiguration)
 * @param {boolean} [options.loaderInnerApp=false] options.loaderInnerApp - If set to false, the loader will be injected in the main html outside of the react application context
 * @param {string} [options.favicon=null] options.favicon - Favicon href url
 * @param {string} [options.head=null] options.head - This will be injected at the end of <head /> tag
 * @param {boolean} [options.disableAutoConf=false] option.disableAutoConf - Disable auto configuration of layout package
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
  const opts = { ...defaultOptions, ...options };
  const cwd = process.cwd();

  const base = existsSync(join(cwd, 'package.json')) ? join(cwd) : join(__dirname, '..');
  const extension = existsSync(join(base, opts.styleGuideDirPath, opts.extensionFile)) ? require(path.join(base, opts.styleGuideDirPath, opts.extensionFile)) : {}; // eslint-disable-line global-require

  // just for generating it's own documentation, we need it.
  const thisPkgPath = join(base, 'package.json');
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
  const defaultStyleGuidePath = join(base, 'src/Layout');
  const defaultWrapperPath = join(base, 'src/Wrapper');

  // External layout selection
  const {
    finalStyleGuidePath,
    finalWrapperPath,
    finalConfigExtension,
    finalLoadersExtension,
  } = retrieveComponentsApiPath(defaultStyleGuidePath, defaultWrapperPath, pkg, thisPkg, base, opts);

  // Prepare to apply custom conf
  const {
    webpackConfig: finalWebpackConfig,
    styleguideComponents: finalStyleguideComponents,
    require: finalRequireConfig,
    ...finalConfig
  } = finalConfigExtension;

  // Prepare spinners
  const loaders = {
    ...opts.loaders,
    ...(finalLoadersExtension || {}),
  };

  let { loader } = opts;
  if (Object.keys(finalLoadersExtension).length && opts.loader === defaultOptions.loader) {
    loader = Object.keys(finalLoadersExtension)[0]; // eslint-disable-line
  }

  // webpack
  const webpackConfig = webpackMerge({
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map',
        exclude: [
          'node_modules/**/*.js',
        ],
      }),
    ],
    resolve: {
      alias: {
        $PACKAGE_NAME: resolve(base),
        [pkg.name]: resolve(base),
      },
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
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        },
        {
          test: /\.(ttf|otf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
          include: /node_modules/,
          use: [{
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
              publicPath: 'fonts',
            },
          }],
        },
      ],
    },
  }, finalWebpackConfig || {}, userWebpackConfig || {});

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
      ...requireConfig,
      ...finalRequireConfig || [],
      ...userRequireConfig || [],
    ],
    styleguideDir: 'public',
    components: 'src/components/**/[A-Z]*.js',
    previewDelay: 500,
    skipComponentsWithoutExample: false,
    exampleMode: 'collapse',
    usageMode: 'expand',
    showSidebar: true,
    styles: {},
    title: pkg.name,
    verbose: false,
    version: pkg.version,
    getComponentPathLine(componentPath) {
      let name = basename(componentPath, '.js');
      const dir = name === 'index' ? dirname(componentPath) : `${dirname(componentPath)}/${name}`;
      name = name === 'index' ? basename(dir) : name;
      return `import ${name} from '${pkg.name}/${dir.replace(/^src\//, 'lib/')}';`;
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
        ${pkg.private === false ? '<meta name="robots" content="nofollow"/>' : '<meta name="robots" content="noindex, nofollow"/>'/* false means release in private, true means never released */}
        ${pkg.name !== thisPkg.name ? `<meta name="rollup-documentation-version" content="${thisPkg.version}">\n<meta name="version" content="${pkg.version}">` : `<meta name="version" content="${pkg.version}">`}
        ${opts.favicon ? `<link rel="icon" type="image/x-icon" href="${opts.favicon}">` : ''}
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
