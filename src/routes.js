import React from "react";
import { render } from "react-dom";
import { Route, IndexRoute, DefaultRoute } from "react-router";

import Navigation from "./components/Navigation/Navigation";
import Layout from "./pages/Layout";
import Groups from "./components/Groups/Groups";
import Channels from "./components/Channel/Channel";


export default (
  <Route path="/" component={Layout}>
  </Route>
);
