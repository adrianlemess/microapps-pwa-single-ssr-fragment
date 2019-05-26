import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';

// eslint-disable-next-line no-extra-boolean-cast

const appHTML = ReactDOM.renderToString(<AppContainer />);

module.exports = appHTML;
