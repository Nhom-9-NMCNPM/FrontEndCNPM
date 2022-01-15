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
import DetailAcc from "../components/DetailAcc";
import ProDress from "../components/Product/ProDress";
import ProShirt from "../components/Product/ProShirt";
import ProSkirt from "../components/Product/ProSkirt";
import ProTrousers from "../components/Product/ProTrousers";
import Dress from "../admin/components/Dress";
import Shirt from "../admin/components/Shirt";
import Skirt from "../admin/components/Skirt";
import Trousers from "../admin/components/Trousers";
import Accessory from "../admin/components/Accessory";
import Cart from "../components/Checkout/Cart";
import Checkout from "../components/Checkout/Checkout";
import Order from "../admin/components/Order";
import ManagerUser from "../admin/components/ManagerUser";
import PageError from "../components/PageError"
import Voucher from "../admin/components/Voucher";
import Event from "../admin/components/Event";
import ProAccessory from "../components/Product/ProAccessory"
import ProductOffline from "../admin/ProductOffline";
import { connect } from "react-redux";
export const history = createBrowserHistory();
const Approuter = ({user}) => {
    return (
        <Router history={history}>
            <div>
                <Switch>
                    <Route path="/" component={Home} exact={true}/>
                    <Route path="/product" component={Product} /> 
                    <Route path="/account" component={User}  />  
                    <Route path="/detail/:code" component={DetailPro}  />
                    <Route path="/detail-acc/:code" component={DetailAcc}  />
                    <Route path="/dress" component={ProDress} />
                    <Route path="/shirt" component={ProShirt} />
                    <Route path="/skirt" component={ProSkirt} />
                    <Route path="/trousers" component={ProTrousers} />
                    <Route path="/accessory" component={ProAccessory} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/checkout" component={Checkout} />
                    {user.admin && <PrivateRouter path="/admin-shirt" component={Shirt} />}
                    {user.admin && <PrivateRouter path="/admin-skirt" component={Skirt} />}
                    {user.admin && <PrivateRouter path="/admin-trousers" component={Trousers}/>}
                    {user.admin && <PrivateRouter path="/admin-dress" component={Dress} />}
                    <PrivateRouter path="/admin-order" component={Order} />
                    <PrivateRouter path="/admin-accessory" component={Accessory} />
                    {user.admin && <PrivateRouter path="/admin-voucher" component={Voucher} />}
                    <PrivateRouter path="/admin-user" component={ManagerUser} />
                    {user.admin && <PrivateRouter path="/admin-event" component={Event} />}
                    <PrivateRouter path="/admin-offline-product" component={ProductOffline} />
                    <Route component={PageError} />
                </Switch>
            </div>
        </Router>
    );
};
const mapStateToProps = (state) => {
    return {
        user: state.User,
    }
}
export default connect(mapStateToProps)(Approuter);
