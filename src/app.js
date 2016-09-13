import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
require('./styles/app.scss');

//imports & initializing store
import { Provider, connect } from "react-redux";
import configureStore from './store';
import {loadUser} from './actions/userAction';

const store = configureStore();
store.dispatch(loadUser());

//importing Routes
import { Router, Route, IndexRoute, browserHistory, hashHistory, DefaultRoute } from "react-router";
import routes from './routes';

//connect

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}>
    </Router>
  </Provider>,
  document.getElementById('disclone'));
