For react component created with [styled-components](https://www.styled-components.com/) you must use **@component** annotation before the export:

```js static
import styled from 'styled-components';
/** @component */
export default styled.div`
  border: 1px solid #333;
`;
```

Demo:

```js
<DemoStyledComponent>Hello world</DemoStyledComponent>
```
