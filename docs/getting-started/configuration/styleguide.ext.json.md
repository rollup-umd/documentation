You must create your extension file in `styleguide/styleguide.ext.json`.

It should contains:

- [sections](https://react-styleguidist.js.org/docs/configuration.html#sections): The documentation menu.
- [ignore](https://react-styleguidist.js.org/docs/configuration.html#ignore): File to be ignored by components scanning.
- [ribbon](https://react-styleguidist.js.org/docs/configuration.html#ribbon): The documentation ribbon.
 

## sections

Sections represent pages in our documentation, they can be nested.

- Use `content` to use a markdown file:

```json
{
  "name": "Installation",
  "content": "docs/installation.md"
}
```

- Use `description` if you don't need to write a lot of stuff:

```json
{
  "name": "Installation",
  "description": "npm install --save $PACKAGE_NAME"
}
```

- Use `components` to locate react components to be automatically generated

```json
{
  "name": "UI components",
  "components": [
    "src/components/**/*.js"
  ]
}
```

- Use `sections` to create sub sections

```json
{
  "name": "Parent section",
  "sections": [
    {
      "name": "Child section"
    },
    {
      "name": "Second child section"
    }
  ]
}
```

## ignore

Ignore components to be documented using a glob pattern:

```json
{
  "ignore": [
    "src/**/*.spec.js"
  ]
}
```

## ribbon

Use the ribbon to display an url to GitHub

```json
{
  "ribbon": {
    "url": "https://github.com/rollup-umd/documentation.git",
    "text": "Fork us on GitHub"
  } 
}
```
