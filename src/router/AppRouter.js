import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import { createBrowserHistory } from "history";
// import PublicRouter from './PublicRouter';
import Home from "../components/Home";
import admin from "../admin/admin";
import Product from "../components/Product";
import User from "../components/User";
import DetailPro from "../components/DetailPro";
import ProDress from "../components/Product/ProDress";
import ProShirt from "../components/Product/ProShirt";
import ProSkirt from "../components/Product/ProSkirt";
import ProTrousers from "../components/Product/ProTrousers";
import Dress from "../admin/components/Dress";
import Shirt from "../admin/components/Shirt";
import Skirt from "../admin/components/Skirt";
import Trousers from "../admin/components/Trousers";
import Cart from "../components/Checkout/Cart";
import Checkout from "../components/Checkout/Checkout";
import Order from "../admin/components/Order";
import ManagerUser from "../admin/components/ManagerUser";
import Voucher from "../admin/components/Voucher";
export const history = createBrowserHistory();
const Approuter = () => {
    return (
        <Router history={history}>
            <div>
                <Switch>
                    <Route path="/" component={Home} exact={true}/>
                    <Route path="/product" component={Product} /> 
                    <Route path="/account" component={User}  />  
                    <Route path="/detail/:code" component={DetailPro}  /> 
                    <Route path="/dress" component={ProDress} />
                    <Route path="/shirt" component={ProShirt} />
                    <Route path="/skirt" component={ProSkirt} />
                    <Route path="/trousers" component={ProTrousers} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/checkout" component={Checkout} />
                    <PrivateRouter path="/admin-shirt" component={Shirt} />
                    <PrivateRouter path="/admin-skirt" component={Skirt} />
                    <PrivateRouter
                        path="/admin-trousers"
                        component={Trousers}
                    />
                    <PrivateRouter path="/admin-dress" component={Dress} />
                    <PrivateRouter path="/admin-order" component={Order} />
                    <PrivateRouter path="/admin-voucher" component={Voucher} />
                    <PrivateRouter path="/admin-user" component={ManagerUser} />
                </Switch>
            </div>
        </Router>
    );
};
export default Approuter;
