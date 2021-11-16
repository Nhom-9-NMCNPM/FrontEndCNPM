import React from 'react';
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import PrivateRouter from './PrivateRouter';
import { createBrowserHistory } from 'history';
// import PublicRoute from './PublicRoute';
import Product from '../components/Product/Product'
import NavProduct from '../components/Product/NavProduct';
import Product2Left from '../components/Product/Product2Left';
import Product2Right from '../components/Product/Product2Right';
import Product4 from '../components/Product/Product4';
import { from } from '@apollo/client';
export const history = createBrowserHistory();
const Approuter = () => (
        <Router history={history}>
            <div>
                <Switch>
                    <Route path="/" component={Product} exact={true}/>          
                </Switch>
            </div>
        </Router>
       
);
export default Approuter;