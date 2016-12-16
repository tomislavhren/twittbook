import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import App from './components/App';
import reducers from './reducers';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, hashHistory } from 'react-router';
import routes from './routes';

injectTapEventPlugin();
const createStoreWithMiddleware = applyMiddleware()(createStore);

render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
