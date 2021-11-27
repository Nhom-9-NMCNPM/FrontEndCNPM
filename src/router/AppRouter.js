import React from 'react';
import {Route, Switch, Router } from "react-router-dom";
import PrivateRouter from './PrivateRouter';
import { createBrowserHistory } from 'history';
// import PublicRouter from './PublicRouter';
import Home from '../components/Home';
import admin from '../admin/admin';
import Product from '../components/Product'
import User from '../components/User'
import DetailPro from '../components/DetailPro';
// import { from } from '@apollo/client';
import ProDress from '../components/Product/ProDress';
import ProShirt from '../components/Product/ProShirt';
import ProSkirt from '../components/Product/ProSkirt';
import ProTrousers from '../components/Product/ProTrousers';
import Dress from '../admin/components/Dress';
import Shirt from '../admin/components/Shirt';
import Skirt from '../admin/components/Skirt';
import Trousers from '../admin/components/Trousers';
import ManagerUser from '../admin/components/ManagerUser';
import NavHeader from '../components/HomePage/NavHeader';
import Footer from '../components/HomePage/Footer';
export const history = createBrowserHistory();
const Approuter = () => {
    return (
        <Router history={history}>
            <div>
                <Switch>
                    <Route path="/" component={Home} exact={true}/>
                    <PrivateRouter path="/table" component={admin} />
                    <Route path="/product" component={Product} /> 
                    <Route path="/account" component={User}  />  
                    <Route path="/detail/:code" component={DetailPro}  /> 
                    <Route path="/dress" component={ProDress} />
                    <Route path="/shirt" component={ProShirt} />
                    <Route path="/skirt" component={ProSkirt} />
                    <Route path="/trousers" component={ProTrousers} />
                    <PrivateRouter path="/admin-shirt" component={Shirt} />
                    <PrivateRouter path="/admin-skirt" component={Skirt} />
                    <PrivateRouter path="/admin-trousers" component={Trousers} />
                    <PrivateRouter path="/admin-dress" component={Dress} />
                    <PrivateRouter path="/admin-user" component={ManagerUser} />
                </Switch>
            </div>
        </Router>
       
)};
export default Approuter;