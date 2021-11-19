import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import shirtReducer from '../reduce/shirtReducer';
import dressReducer from '../reduce/dressReducer';
import userReducer from '../reduce/userReducer';
import skirtReducer from '../reduce/skirtReducer'
import trousersReducer from '../reduce/trousersReducer';
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
            }
        ),
       composeEnhancers(applyMiddleware(thunk)),
    )
}

export default configureStore;