import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './component/App';
import reducer from './reducer';

import '../style/app.scss';

const store = createStore(reducer,
  // FIXME Omit the line when it's on production.
  window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line no-underscore-dangle, max-len, space-infix-ops
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
