If you want to add JS to the global your documentation, this is possible using `styleguide/setup.js` file.

It is automatically used during styleguide documentation startup.

For example, you can make `<Table />`, `<Tr />`, `<Td />` available in your examples by having in your `styleguide/setup.js`:

```js static
import Table from '@bootstrap-styled/v4/lib/Table';
import Tr from '@bootstrap-styled/v4/lib/Table/Tr';
import Td from '@bootstrap-styled/v4/lib/Table/Td';

global.Table = Table;
global.Tr = Tr;
global.Td = Td;
```
