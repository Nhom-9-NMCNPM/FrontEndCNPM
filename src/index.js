import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppRouter, {history} from './router/AppRouter';
import client from './client/client';
import {ApolloProvider} from '@apollo/client';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import getShirt from './query/getShirt';
import getDress from './query/getDress';
import {firebase} from './firebase/firebase';
import {startSetLogin, logout, stopLogin} from './actions/user';

const store = configureStore();
getShirt(store.dispatch);
//getDress(store.dispatch);
const jsx =( 
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);


let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
};

firebase.auth().onAuthStateChanged(function(user){
  if(user){console.log(user);
    store.dispatch(startSetLogin({name: user.displayName, email: user.email})).then((response) => {
      renderApp();
      history.push('/')
    })
    
  }else{
    store.dispatch(logout());
    renderApp();
  }
}) 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
