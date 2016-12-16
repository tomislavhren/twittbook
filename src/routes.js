import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Components goes here:
import App from './components/App';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={App} />
        <Route path="home" >

        </Route>
    </Route>
);
