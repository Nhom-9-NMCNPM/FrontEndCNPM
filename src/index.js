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
import getVoucher from './query/getVoucher';
import 'slick-slider';
import GetData from './query/GetData';
import getOrder from './query/getOrder';
import getUser from './query/getUser';



const store = configureStore();
getUser(store.dispatch);
// const loadData = () => {
 
//   getSkirt(store.dispatch)
//   getShirt(store.dispatch);
//   getDress(store.dispatch);
//   getTrousers(store.dispatch);
getOrder(store.dispatch)
// }
// const fetchData = new Promise((resolve, reject) => {
//   loadData();
// })

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
//loadData();

ReactDOM.render(jsx2, document.getElementById('root'));

firebase.auth().onAuthStateChanged(function(user){
  if(user){console.log(user);
    store.dispatch(startSetLogin({name: user.displayName, email: user.email})).then((response) => {
      //window.location.reload();
      renderApp();
     history.push('/')
    })
    
  }else{
    store.dispatch(logout());
    setTimeout(renderApp, 3000)
    history.push('/')
  }
}) 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
