import React from "react";
import { render } from "react-dom";
import { Route, IndexRoute, DefaultRoute, IndexRedirect } from "react-router";

import Navigation from "./components/Navigation/Navigation";
import Layout from "./pages/Layout";
import Groups from "./components/Groups/Groups";
import Channels from "./pages/Channel";
import Home from "./pages/Home";
import HomeChat from "./components/Home/Home-chat";
import HomeNav from "./components/Home/Home-nav";
import FriendsList from "./components/Home/Friends-list";
import ChannelNav from "./components/Channel/ChannelNav";

export default (
  <Route path="/" component={Layout} >
    <IndexRoute to="/@me" component={Home} />

    <Route path="@me(/:userId)" component={Home}>
      <IndexRoute component={HomeChat} />
      <Route path="/friend(/:friendId)" component={FriendsList}></Route>
    </Route>

    <Route path="/channels/(:group)/(:channel)" component={Channels}></Route>
  </Route>
);
