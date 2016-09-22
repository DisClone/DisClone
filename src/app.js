import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
import { saveState} from "./localstorage";
require('./styles/app.scss');

//imports & initializing store
import { Provider, connect } from "react-redux";
import configureStore from './store';
import {loadUser} from './actions/userAction';
import throttle from "lodash/throttle";

// const store = configureStore();
const store = configureStore();

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

// console.log('This is my store', store.getState());
//importing Routes
import { Router, Route, IndexRoute, browserHistory, hashHistory, DefaultRoute } from "react-router";
import routes from './routes';

//connect
export default store;

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}>
    </Router>
  </Provider>,
  document.getElementById('disclone'));
