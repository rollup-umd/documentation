import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import StyleGuideRenderer from '@bootstrap-styled/rsg-components/lib/StyleGuide/StyleGuideRenderer';
import omit from 'lodash.omit';

/**
 * By default, we prefer to use this Layout which extend the one provided by `@bootstrap-styled/rsg-components` which is a copy of the original from `rsg-component`.
 *
 * This Layout includes the following features
 * - Google analytics page tracking
 *
 */
export default class LayoutRenderer extends Component {
  static propTypes = {
    /** The documentation title */
    title: PropTypes.string,
    /** @ignore */
    toc: PropTypes.node.isRequired,
    /** Google analytics ID, it will track on every page change with the Google Analytics account */
    ga: PropTypes.shape({
      id: PropTypes.string,
    }),
  };

  static defaultProps = {
    title: '@rollup-umd/documentation',
    ga: {
      id: process.env.GA_TRACKING_ID,
    },
  };

  componentWillMount() {
    const { ga } = this.props;
    if (ga.id) {
      ReactGA.initialize(ga.id, { debug: process.env.NODE_ENV === 'development' });
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }

  render() {
    const { ...rest } = omit(this.props, ['ga']);
    return (
      <StyleGuideRenderer {...rest} />
    );
  }
}
