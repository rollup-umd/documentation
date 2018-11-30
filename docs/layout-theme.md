We use [Bootstrap Styled chart](https://bootstrap-styled.github.io/bootstrap-styled), which means all the UI can be customized.

You can change the theme by wrapping any Layout with:

```js static
const theme = require('$PACKAGE_NAME/lib/theme');

export default (props) => (
  <LayoutRenderer {...props} theme={theme} />
);
```

If you want to know available theme variables or how to make a theme, 
we suggest you to read  [Bootstrap Styled documentation](https://bootstrap-styled.github.io/bootstrap-styled)
