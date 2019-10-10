import React from 'react';
import { shallow } from 'enzyme';
import withRedux from '../withRedux';

describe('withRedux', () => {
  const mockRedux = {
    applyMiddleware: () => jest.fn(),
    createStore: jest.fn(),
    compose: jest.fn(),
  };
  const mockReactRedux = {
    Provider: ({ props, store }) => <div {...props} />, // eslint-disable-line
  };
  const reducer = (action, state) => state;

  it('should render withRedux', () => {
    const Redux = withRedux({
      redux: mockRedux,
      'react-redux': mockReactRedux,
    }, reducer)('div');
    Redux.prototype.componentWillMount = jest.fn();
    const renderedComponent = shallow(<Redux>hello</Redux>);
    expect(renderedComponent.find('Provider').length).toBe(1);
    expect(Redux.prototype.componentWillMount).toHaveBeenCalled();
  });
});
