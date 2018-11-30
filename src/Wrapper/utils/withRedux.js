import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const withRedux = ({ redux, 'react-redux': reactRedux }, reducer) => (Component) => {
  class WrapperRedux extends PureComponent {
    static propTypes = {
      children: PropTypes.node.isRequired,
    };

    state = {
      store: null,
    }

    /* eslint-disable no-underscore-dangle, function-paren-newline */
    componentWillMount() {
      const { applyMiddleware, createStore, compose } = redux;
      const middleware = [];
      const composeEnhancers = typeof window === 'object'
        && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

      const enhancer = composeEnhancers(applyMiddleware(...middleware),
        // other store enhancers if any
      );

      const store = createStore(reducer, enhancer);
      this.setState({
        store,
      });
    }
    /* eslint-enable no-underscore-dangle, function-paren-newline */

    render() {
      const { store } = this.state;
      const { Provider } = reactRedux;
      return (
        <Provider store={store}>
          <Component {...this.props} />
        </Provider>
      );
    }
  }
  return WrapperRedux;
};

export default withRedux;
