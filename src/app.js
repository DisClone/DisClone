import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import configureStore from './store';
import { Router, Route, IndexRoute, browserHistory, DefaultRoute } from "react-router";
import routes from './routes';

//initializing store
const store = configureStore();

//importing Routes

//connect

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}>
    </Router>
  </Provider>,
  document.getElementById('disclone'));
