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
import getSkirt from './query/getSkirt'
import getTrousers from './query/getTrousers';
import 'slick-slider';
import GetData from './query/GetData';
const loadData = async () => {
  await getSkirt(store.dispatch)
  await getShirt(store.dispatch);
  await getDress(store.dispatch);
  await getTrousers(store.dispatch);
}
const store = configureStore();

const jsx =( 
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);

const jsx2 = (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <GetData />
    </Provider>
  </ApolloProvider>
)
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
};
ReactDOM.render(jsx2, document.getElementById('root'));
firebase.auth().onAuthStateChanged(function(user){
  if(user){console.log(user);
    store.dispatch(startSetLogin({name: user.displayName, email: user.email})).then((response) => {
      // loadData();
      renderApp();
     // history.push('/home')
    })
    
  }else{
    store.dispatch(logout());
    // loadData();
    renderApp();
    //history.push('/home')
  }
}) 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
