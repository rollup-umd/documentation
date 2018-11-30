/**
 * Testing our Wrapper component
 */
import { shallow } from 'enzyme';
import React from 'react';
import Wrapper from '../WrapperRenderer';

const children = <h1>Test</h1>;

const renderComponent = (props = {}) => shallow(
  <Wrapper {...props}>
    {children}
  </Wrapper>
);

describe('<Wrapper />', () => {
  it('should render an Wrapper', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.length).toBe(1);
  });
});
