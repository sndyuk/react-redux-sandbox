import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import App from './component/App';
import todos from './duck/todoWidget';
import visibilityFilter from './duck/visibilityFilterWidget';
import State from './state';

import '../style/app.scss';

const preloadedState = State(window.preloadedState);

const store = createStore(
  combineReducers({
    todos,
    visibilityFilter
  }),
  preloadedState,
  // FIXME Omit the line when it's on production.
  window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line no-underscore-dangle, max-len, space-infix-ops
);

browserHistory.listen((location) => {
  console.log(`DEBUG: Navigate to ${location}`);
});

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
