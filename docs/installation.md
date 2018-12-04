### 1. Install `$PACKAGE_NAME` and it dependencies:
       
```bash static
$ npm install $PACKAGE_NAME --save-dev
```

Or use `--save` if you are within a [layout package](#layout-package) you have created.

### 2. Create `styleguide.config.js` in root of your project.

```js static
const { createConfig } = require('$PACKAGE_NAME');

module.exports = createConfig();

```

### 3. Create documentations in `docs/` and add `.md` files

Documentation folder example:
```bash static
root/
  └── docs/
      ├── installation.md
      └── general.md
```

### 4. Create `styleguide.ext.json` in `styleguide/` folder.

Example:

```json static
{
  "sections": [
    {
      "name": "Installation",
      "content": "docs/installation.md"
    },
    {
      "name": "General",
      "content": "docs/general.md",
      "components": "src/**/*.js",
      "sections: [] // more sections
    }
  ]
}

```

### 5. Add scripts into `package.json`:

```json static
{
  "scripts": {
    "jsdoc: "jsdoc-documentation --file",
    "prestyleguide": "npm run jsdoc",
    "styleguide": "styleguidist server",
    "prestyleguide:build": "npm run jsdoc",
    "styleguide:build": "styleguidist build"
  }
}
```

- `npm run jsdoc`, will generate the jsdoc using the default location for it's script file.
- `npm run styleguide`, will generate jsdoc then react-styleguidist.
- Default location is `styleguide/jsdoc.sh`.
- You can set a different location by doing `--file=jsdoc.sh`.
- If you want to generate your jsdoc all in one file, you can use `jsdoc-documentation src docs/js/jsdoc.md`
- It is possible to use use one source file `src/index.js` to generate one markdown.
- It is possible to use a wildcard for multiple files `src/**/*.js` to generate multiples file in one markdown.
- To generate multiple markdown, you should do file per file using these commands in `styleguide/jsdoc.sh`.

### 6. Run your documentation on `localhost:6060`:

```bash static
npm run styleguide
```

> You can change port using: `NODE_PORT=7070 npm run styleguide`
