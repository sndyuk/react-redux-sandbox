import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import 'rxjs';

import App from './component/App';
import todos from './duck/todoWidget';
import visibilityFilter from './duck/visibilityFilterWidget';
import historyTag from './duck/historyTagWidget';
import isPinging, { pingEpic } from './duck/pingWidget';
import State from './state';

import '../style/app.scss';

const preloadedState = State(window.preloadedState);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle, max-len, space-infix-ops

const epicMiddleware = createEpicMiddleware(pingEpic);

const store = createStore(
  combineReducers({
    todos,
    visibilityFilter,
    historyTag,
    isPinging,
    routing: routerReducer
  }),
  preloadedState,
  composeEnhancers(applyMiddleware(
    epicMiddleware,
    routerMiddleware(browserHistory),
    thunkMiddleware))
);

const history = syncHistoryWithStore(browserHistory, store);

history.listen((location) => {
  console.log(`DEBUG: Navigate to ${location}`);
});

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
