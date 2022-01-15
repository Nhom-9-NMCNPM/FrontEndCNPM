import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import shirtReducer from '../reduce/shirtReducer';
import dressReducer from '../reduce/dressReducer';
import userReducer from '../reduce/userReducer';
import skirtReducer from '../reduce/skirtReducer'
import trousersReducer from '../reduce/trousersReducer';
import cartReducer from '../reduce/cartReducer';
import orderReducer from '../reduce/orderReducer';
import adminReducer from '../reduce/adminReducer';
import eventReducer from '../reduce/eventReducer';
import voucherReducer from '../reduce/voucherReducer';
import voucherPremiumReducer from '../reduce/voucherPremiumReducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const configureStore = () => {
    return createStore(
        combineReducers (
            {
                Shirt: shirtReducer,
                Dress: dressReducer,
                Skirt: skirtReducer,
                Trousers: trousersReducer,
                User: userReducer,
                Cart: cartReducer,
                Order: orderReducer,
                UserList: adminReducer,
                Event: eventReducer,
                Voucher: voucherReducer,
                VoucherPremium: voucherPremiumReducer,
            }
        ),
       composeEnhancers(applyMiddleware(thunk)),
    )
}

export default configureStore;