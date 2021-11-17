import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import shirtReducer from '../reduce/shirtReducer';
import dressReducer from '../reduce/dressReducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const configureStore = () => {
    return createStore(
        combineReducers (
            {
                Shirt: shirtReducer,
                Dress: dressReducer,
            }
        ),
       composeEnhancers(applyMiddleware(thunk)),
    )
}

export default configureStore;