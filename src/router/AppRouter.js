import React from 'react';
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import PrivateRouter from './PrivateRouter';
import { createBrowserHistory } from 'history';
// import PublicRoute from './PublicRoute';
import MyBox from '../components/MyBox';
import Water from '../components/Water';
import Combo from '../components/ComBo';
import Pizza from '../components/Pizza';
import Page404 from '../components/Page404';
import Order from '../components/Order';
export const history = createBrowserHistory();
const Approuter = () => (
        <Router history={history}>
            <div>
                <Switch>
                    <Route path="/" component={MyBox} exact={true}/>
                    <Route path="/water" component={Water} />
                    <Route path="/combo" component={Combo} />
                    <Route path="/pizza" component={Pizza} />
                    <PrivateRouter path="/order" component={Order} />
                    <Route component={Page404} />
                </Switch>
            </div>
        </Router>
);
export default Approuter;