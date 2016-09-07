import React from "react";
import ReactDOM from "react-dom";

//imports & initializing store
import { Provider, connect } from "react-redux";
import configureStore from './store';

const store = configureStore();

//importing Routes
import { Router, Route, IndexRoute, browserHistory, DefaultRoute } from "react-router";
import routes from './routes';

//connect

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}>
    </Router>
  </Provider>,
  document.getElementById('disclone'));
