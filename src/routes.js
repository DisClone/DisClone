import React from "react";
import { Route, IndexRoute, IndexRedirect } from "react-router";

import Layout from "./pages/Layout";
import Channels from "./pages/Channel";
import Home from "./pages/Home";

export default (
  <Route path="/" component={Layout} >
    <IndexRoute component={Home}/>
    <IndexRedirect from="/" to="@me"/>
      <Route path="@me(/:friendId)" component={Home}> </Route>
      <Route path="/channels(/:group)(/:channel)" component={Channels}></Route>
  </Route>
);
