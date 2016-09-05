import React from "react";
import { render } from "react-dom";
import { Provider, connect } from "react-redux";
import configureStore from './store';
import { Router, Route, IndexRoute, browserHistory, DefaultRoute } from "react-router";

import Navigation from "./components/Navigation/Navigation";
import Layout from "./pages/Layout";
import Groups from "./components/Groups/Groups";
import Channels from "./components/Channel/Channel";


export default (
  <Route path="/" component={Layout}>
  </Route>
);
