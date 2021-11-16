import React from 'react';
import {Route, Switch, Router } from "react-router-dom";
// import PrivateRouter from './PrivateRouter';
import { createBrowserHistory } from 'history';
// import PublicRoute from './PublicRoute';
import Home from '../component/Home';
import admin from '../admin/admin';
export const history = createBrowserHistory();
const Approuter = () => (
        <Router history={history}>
            <div>
                <Switch>
                    <Route path="/home" component={Home} exact={true}/>
                    <Route path="/table" component={admin} exact={true}/>
                </Switch>
            </div>
        </Router>
);
export default Approuter;