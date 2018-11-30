import React from 'react';
import PropTypes from 'prop-types';

/**
 * This table of props is automatically generated
 */
// eslint-disable-next-line
export default class DemoComponent extends React.Component {
  static propTypes = {
    /** The first name */
    firstName: PropTypes.string,
    /** The last name */
    lastName: PropTypes.string.isRequired,
  };

  static defaultProps = {
    firstName: 'root',
  };

  render() {
    const { firstName, lastName } = this.props;
    return (
      <div>
        Hello
        {' '}
        {firstName}
        {' '}
        {lastName}
      </div>
    );
  }
}
