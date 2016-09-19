import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import configSettings from './config.js';
import massive from 'massive';
import bodyParser from 'body-parser';

import moment from "moment";

/* eslint-disable no-console */

const port = 3000;
const compiler = webpack(config);

const connectionString = configSettings.connectionString;
const app = module.exports = express();

const massiveInstance = massive.connectSync({connectionString : connectionString});

app.set('db', massiveInstance);

const db = app.get('db');
const http = require('http').Server(app);

const io = require('socket.io')(http);

const connections = [];

io.on('connection', function(socket) {
  connections.push(socket);
  console.log('we have a connection');
  console.log("Query: ", socket.handshake.query);
  // socket.emit("connect");
  socket.on('channels', function(userChannel) {
    // console.log(userChannel);
    // for (var i = 0; i < userChannels.length; i++) {
      socket.join(userChannel);
      console.log("Joined channel", userChannel);
    // }
  });
  socket.on('new-message', function(msg) {
    msg.message_time = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    if (msg.is_private) {
      db.messages.post_new_message([msg.message_text, msg.message_time, false, msg.author_id, null, msg.channel], (err, response) => {
        if (err) {
          console.log(err);
        }
        else {
          io.to(msg.channel).emit('recieve-message', msg);
        }
      });

    }
    else {
      db.messages.post_new_message([msg.message_text, msg.message_time, true, msg.author_id, null, msg.channel], (err, response) => {
        if (err) {
          console.log(err);
        }
        else {
          io.to(msg.channel).emit('recieve-message', msg);
        }
      });
    }

    console.log(msg);

    // io.to("1").emit('recieve-message', msg);
    // db.new_test_msg([msg.body, msg.user], function(err, response) {
    //   console.log(err, response);
    // });
    // db.get_all_msgs(function(err, response) {
    //   console.log(response);
    // });
  });
  socket.on('test', function() {
    console.log('Mounted');
  });
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../src'));

const userCtrl = require('./controllers/userController.js');
const messageCtrl = require('./controllers/messageController.js');
const groupCtrl = require('./controllers/groupController.js');
const channelCtrl = require('./controllers/channelController.js');

//test endpoints
app.post('/api/test', (req, res) => {
  console.log("Whaddup");
  res.set(200).json("Hi there");
});

app.get('/api/test', function(req, res) {
  console.log("Yoyoyomybro");
  res.set(200).json("We workin dawg");
});


//BIG MONSTER ENDPOINT FOR DATA COLLECTION ON LOGIN
app.get('/api/login/all-data/:id', userCtrl.getDataOnLogin);

//Message Endpoints (partially for test purposes and building front end, will do some of this through sockets once I have them working back here)

app.get('/api/messages/all', messageCtrl.getAllMessages);

app.post('/api/messages/new', messageCtrl.postNewMessage);

app.put('/api/messages/edit', messageCtrl.editMessage);

app.delete('/api/messages/delete/:id', messageCtrl.deleteMessage);

//User Endpoints
app.get('/api/users/all', userCtrl.getAllUsers);

app.get('/api/users/:id', userCtrl.getUserById);

app.post('/api/users/new', userCtrl.createNewUser);

app.put('/api/users/update', userCtrl.updateUser);

//Group Endpoints
app.post('/api/groups/create', groupCtrl.createNewGroup);

app.get('/api/groups/:id', groupCtrl.getGroupById);

app.delete('/api/groups/:id', groupCtrl.deleteGroupById);

//Group-User-Relations Endpoints
app.post('/api/group-users/join', groupCtrl.joinGroupByUserId);

app.delete('/api/group-users/remove', groupCtrl.removeFromGroupByUserId);

//Channel Endpoints
app.get('/api/channels/group/:id', channelCtrl.getChannelsByParentGroup);

app.post('/api/channels/group/create', channelCtrl.createNewGroupChannel);

app.post('/api/channels/private/create', channelCtrl.createNewPrivateChannel);

app.put('/api/channels/group/edit', channelCtrl.editChannelById);

app.delete('/api/channels/delete/:channel_id', channelCtrl.deleteChannelById);


app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname + '/../src', 'index.html'));
});

http.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
