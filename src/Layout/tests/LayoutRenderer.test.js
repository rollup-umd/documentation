/**
 * Testing our LayoutRenderer component
 */
import { shallow } from 'enzyme';
import React from 'react';
import LayoutRenderer from '../LayoutRenderer';

const children = <h1>Test</h1>;

const renderComponent = (props = {}) => shallow(
  <LayoutRenderer {...props}>
    {children}
  </LayoutRenderer>
);

describe('<LayoutRenderer />', () => {
  it('should render an LayoutRenderer', () => {
    const renderedComponent = renderComponent({
      title: 'Title test',
      toc: <a>Table of content link</a>,
    });
    expect(renderedComponent.length).toBe(1);
  });
  it('should render an LayoutRenderer with children', () => {
    const renderedComponent = renderComponent({
      title: 'Title test',
      toc: <a>Table of content link</a>,
    });
    expect(renderedComponent.contains(children)).toEqual(true);
  });
});
