Layout package are useful when you want to maintain a documentation layout and/or configuration across multiple projects.

It's convenient because it just need to be installed and does not require any code change.

Updating can be done by upgrading the version of your layout package in `package.json`.

It can contains customs:

- `Layout`: the documentation layout
- `Wrapper`: the wrapper for examples
- `styleguide.config.js`: styleGuide configuration (will be merged into our configuration)
- `loaders`: Loaders injected by the package
- `theme`: The `theme` and `makeTheme` respecting the Bootstrap Styled chart. It can be used in `Layout` using `props.theme`.

None of them is required,  

