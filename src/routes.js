import React from "react";
import { Route, IndexRoute, IndexRedirect } from "react-router";

import Layout from "./pages/Layout";
import Channels from "./pages/Channel";
import Home from "./pages/Home";
import FriendsList from "./components/Home/Friends-list";
import Landing from './pages/Landing';

export default (
  <Route path="/" component={Layout} >
        <IndexRedirect to='/login'/>
      <Route path="/login"> </Route>
      <Route path="@me(/:friendId)" component={Home}> </Route>
      <Route path="/channels(/:group)(/:channel)" component={Channels}></Route>
  </Route>
);
