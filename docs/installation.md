### 1. Install `$PACKAGE_NAME` and it dependencies:
       
```bash static
$ npm install $PACKAGE_NAME --save-dev
```

Or use `--save` if you are within a [layout package](#layout-package) you have created.

### 2. Create `styleguide.config.js` in root of your project.

```js static
const { createConfig } = require('$PACKAGE_NAME/lib/styleguide.config.js');

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
    "styleguide": "styleguidist server",
    "styleguide:build": "styleguidist build"
  }
}
```

* `npm run jsdoc` will generate the jsdoc using the default location for it's script file, 
you can set a different location by doing `--file=jsdoc.sh`.
* If you want to generate your jsdoc all in one file, you can use `jsdoc-documentation src docs/js/jsdoc.md`


### 6. Run your documentation on `localhost:6060`:

```bash static
npm run styleguide
```

> You can change port using: `NODE_PORT=7070 npm run styleguide`
