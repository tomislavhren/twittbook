import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import { AUTH_USER } from './constants/action_types';

injectTapEventPlugin();
const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({
    type: AUTH_USER
  });
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
