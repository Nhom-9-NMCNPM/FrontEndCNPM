import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import shirtReducer from '../reduce/shirtReducer';
import dressReducer from '../reduce/dressReducer';
import userReducer from '../reduce/userReducer';
import skirtReducer from '../reduce/skirtReducer'
import trousersReducer from '../reduce/trousersReducer';
import cartReducer from '../reduce/cartReducer';
import orderReducer from '../reduce/orderReducer';
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
            }
        ),
       composeEnhancers(applyMiddleware(thunk)),
    )
}

export default configureStore;