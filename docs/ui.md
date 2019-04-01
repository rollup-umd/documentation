This package plugs all the UI components:

- [@bootstrap-styled/rsg-components](https://bootstrap-styled.github.io/rsg-components/), except their Layout and Wrapper.
- Layout 
- Wrapper.

You can use the last two in different ways:

- Directly, that's the default configuration.
- Extending, just wrap it into another react component.
- Using layout package, just wrap it into another react component.

If you create a layout package, you don't have to use our Layout and extension.

You can start from scratch or from the components present in [@bootstrap-styled/rsg-components](https://bootstrap-styled.github.io/rsg-components/).

## Layout extension

- [Layout](#layout): It is the **react-styleguidist** layout.
  - Include [Google Analytics](https://analytics.google.com/analytics/web/) page tracking.
  - All the original `<Layout />` feature from [@bootstrap-styled/rsg-components](https://bootstrap-styled.github.io/rsg-components/).
  
## Wrapper extension

- [Wrapper](#wrapper): It is the **react-styleguidist** javascript wrapper used for rendering each example.
  - Quick configuration for  [react-redux](https://redux.js.org/basics/usagewithreact) 
  - Quick configuration for [react-intl](https://github.com/yahoo/react-intl).

> They replace the `Layout` and `Wrapper` from [@bootstrap-styled/rsg-components](https://bootstrap-styled.github.io/rsg-components/) package by default.
> You can still use them by doing `npm install --save @bootstrap-styled/rsg-components` and by setting the `options.layout` to `@bootstrap-styled/rsg-components`.

```js
import { Button } from '@bootstrap-styled/v4';
<Button>console.log(merge).toString()</Button>
```
