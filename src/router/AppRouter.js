import React from 'react';
import {Route, Switch, Router } from "react-router-dom";
// import PrivateRouter from './PrivateRouter';
import { createBrowserHistory } from 'history';
// import PublicRoute from './PublicRoute';
import Home from '../components/Home';
import admin from '../admin/admin';
import Product from '../components/Product'
import User from '../components/User'
import DetailPro from '../components/DetailPro';
import Dress from '../admin/components/Dress';
// import { from } from '@apollo/client';
import ProDress from '../components/Product/ProDress';
import ProShirt from '../components/Product/ProShirt';
import ProSkirt from '../components/Product/ProSkirt';
import ProTrousers from '../components/Product/ProTrousers';
export const history = createBrowserHistory();
const Approuter = () => (
        <Router history={history}>
            <div>
                <Switch>
                    <Route path="/" component={Home} exact={true}/>
                    <Route path="/table" component={admin} />
                    <Route path="/product" component={Product} /> 
                    <Route path="/account" component={User}  />  
                    <Route path="/detail/:code" component={DetailPro}  /> 
                    <Route path="/dress" component={ProDress} />
                    <Route path="/shirt" component={ProShirt} />
                    <Route path="/skirt" component={ProSkirt} />
                    <Route path="/trousers" component={ProTrousers} />
                </Switch>
            </div>
        </Router>
       
);
export default Approuter;