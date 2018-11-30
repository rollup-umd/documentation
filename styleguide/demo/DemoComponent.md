
For example this will generate a documentation:

```js static
import React from 'react';
import PropTypes from 'prop-types';

/**
 * DemoComponent can get it's doc generated 
 */
export default DemoComponent extends React.Component {
  static propTypes = {
    /** The firstName */
    firstName: PropTypes.string,
    /** The lastName */
    lastName: PropTypes.string.isRequired,
  };
  
  static defaultProps = {
    firstName: 'root',
  };
  
  render() {
    const { firstName, lastName } = this.props;
    return (
      <div>Hello {firstName} {lastName}</div>
    );
  }
}
```

Demo:

```js
<DemoComponent firstName="foo" lastName="bar" />
```
