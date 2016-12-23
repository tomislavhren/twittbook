import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import App from './components/App';
import reducers from './reducers';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';

injectTapEventPlugin();
const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);

render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
