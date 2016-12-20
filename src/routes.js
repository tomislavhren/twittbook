import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Components goes here:
import App from './components/App';
import LoginPage from './components/LoginPage';
import Home from './containers/Home';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={LoginPage} />
        <Route path="home" component={Home} />
    </Route>
);
