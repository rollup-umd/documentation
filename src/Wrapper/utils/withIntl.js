import React from 'react';

const withIntl = ({ 'react-intl': reactIntl }, locale, messages) => (Component) => (props) => (
  <reactIntl.IntlProvider locale={locale} messages={messages}>
    <Component {...props} />
  </reactIntl.IntlProvider>
);

export default withIntl;
