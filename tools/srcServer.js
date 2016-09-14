import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import configSettings from './config1.js';
import massive from 'massive';
import bodyParser from 'body-parser';



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

io.on('connection', function(socket) {
  console.log('we have a connection');
  console.log("Query: ", socket.handshake.query);
  // socket.emit("connect");
  socket.on('channels', function(userChannels) {
    console.log(userChannels);
    for (var i = 0; i < userChannels.length; i++) {
      socket.join(userChannels[i]);
      console.log("Joined channel", userChannels[i]);
    }
  });
  socket.on('new-message', function(msg) {
    console.log(msg);
    io.to("1").emit('recieve-mess`age', msg);
    db.new_test_msg([msg.body, msg.user], function(err, response) {
      console.log(err, response);
    });
    db.get_all_msgs(function(err, response) {
      console.log(response);
    });
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

// app.get('*', function (request, response){
//   response.sendFile(path.resolve(__dirname + '/../src', 'index.html'));
// });

var userCtrl = require('./controllers/userController.js');
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

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
