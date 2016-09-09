import React from "react";
import { render } from "react-dom";
import { Route, IndexRoute, DefaultRoute, IndexRedirect } from "react-router";

import Navigation from "./components/Navigation/Navigation";
import Layout from "./pages/Layout";
import Groups from "./components/Groups/Groups";
import Channels from "./components/Channel/Channel";
import Home from "./pages/Home.js";
import HomeChat from "./components/Home/Home-chat.js";
import HomeNav from "./components/Home/Home-nav.js";
import FriendsList from "./components/Home/Friends-list.js";

export default (
  <Route path="/" component={Layout} >
    <IndexRoute to="/@me" component={Home} />
    <Route path="/channels(/:group)(/:channel)" component={Channels}></Route>
    <Route path="@me(/:userId)" component={Home}>
      <IndexRoute component={HomeChat} />
      <Route path="/friend" component={FriendsList}></Route>
    </Route>
  </Route>
);
