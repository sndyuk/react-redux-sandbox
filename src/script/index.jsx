import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { Router, Route, browserHistory } from 'react-router';

import App from './component/App';
import todos from './duck/todoWidget';
import visibilityFilter from './duck/visibilityFilterWidget';
import State from './state';

import '../style/app.scss';

const preloadedState = State(window.preloadedState);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle, max-len, space-infix-ops

const store = createStore(
  combineReducers({
    todos,
    visibilityFilter
  }),
  preloadedState,
  composeEnhancers(applyMiddleware(thunkMiddleware))
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
