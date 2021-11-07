import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import cartReducer from '../reduce/cartReducer';
import userReducer from '../reduce/userReducer';
import pizzaReducer from '../reduce/pizzaReducer';
import waterReducer from '../reduce/waterReducer';
import comboReducer from '../reduce/comboReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const configureStore = () => {
    return createStore(
        combineReducers (
            {
                combo: comboReducer,
                water: waterReducer,
                pizza: pizzaReducer,
                cart: cartReducer,
                user: userReducer,
            }
        ),
       composeEnhancers(applyMiddleware(thunk)),
    )
}

export default configureStore;