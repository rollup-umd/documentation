import React from 'react';
import { shallow } from 'enzyme';
import withIntl from '../withIntl';

describe('withIntl', () => {
  const mockReactIntl = {
    IntlProvider: ({ props, locale, messages }) => <div {...props} />, // eslint-disable-line
  };
  const locale = 'en';
  const messages = {};
  it('should render withIntl', () => {
    const Intl = withIntl({ 'react-intl': mockReactIntl }, locale, messages)('div');
    const renderedComponent = shallow(<Intl />);
    expect(renderedComponent.find('IntlProvider').length).toBe(1);
  });
});
