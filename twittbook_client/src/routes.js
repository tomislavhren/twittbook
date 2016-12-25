import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Components goes here:
import App from './components/App';
import LoginPage from './components/LoginPage';
import Home from './containers/Home';
import UserProfile from './containers/UserProfile';
import RequireAuth from './utils/Require_auth';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={LoginPage} />
        <Route path="home" component={RequireAuth(Home)} />
        <Route path="user" component={RequireAuth(UserProfile)} />
    </Route>
);
