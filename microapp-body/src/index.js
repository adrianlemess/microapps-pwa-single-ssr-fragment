import React from 'react';
import ReactDOM from 'react-dom';
import RedBox from 'redbox-react';
import AppContainer from './containers/AppContainer';

// eslint-disable-next-line no-extra-boolean-cast

const idSelector = process.env.ENTRY_POINT_ID;

const ENTRY_POINT = document.querySelector(`#${idSelector}`);

// creating starting endpoint for app.
const render = () => {
  // console.log('entryPoint mapeado', __ENTRY_POINT_ID__);
  ReactDOM.render(<AppContainer />, ENTRY_POINT);
};

// this will help us understand where the problem is located once app will fall.
const renderError = error => {
  ReactDOM.render(<RedBox error={error} />, ENTRY_POINT);
};

// register serviceWorkers if available
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('./serviceWorker.js')
//     .then(registration => {
//       console.log('Excellent, registered with scope: ', registration.scope);
//     })
//     .catch(e => console.error('ERROR IN SERVICE WORKERS: ', e));
// }

// This code is excluded from production bundle
if (__DEV__) {
  // ========================================================
  // DEVELOPMENT STAGE! HOT MODULE REPLACE ACTIVATION!
  // ========================================================
  const devRender = () => {
    console.log('isDev');
    if (module.hot) {
      module.hot.accept('./containers/AppContainer', () => render());
    }

    render();
  };

  // Wrap render in try/catch
  try {
    devRender();
  } catch (error) {
    console.error(error);
    renderError(error);
  }
} else {
  // ========================================================
  // PRODUCTION GO!
  // ========================================================
  render();
}
