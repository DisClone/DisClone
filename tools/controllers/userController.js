import app from "../srcServer";
const db = app.get('db');
const BluePromise = require('bluebird');

module.exports = {

  verifyLogin(req, res, next) {
    db.users.verify_login([req.body.email, req.body.password], (err, response) => {
      if (err) {
        res.set(401).json("User does not exist");
      } else {
        if (response[0]){
          res.set(200).json(response);
        } else {
          res.sendStatus(401);
        }
      }
    })

  },

  getDataOnLogin(req, res, next) {
    let dataMonster = {};
    if (req.params.id) {
      db.users.get_user_by_id(req.params.id, (err, response) => {
        if (err) {
          console.log(err);
          res.set(401).json("There was an error retrieving that user");
        }
        else {
          dataMonster.userData = response[0];
          db.groups.get_group_ids_by_user_id(req.params.id, (err, response) => {
            if (err) {
              console.log(err);
            }
            else {
              let groupIdsArr = response;
              dataMonster.groups = [];
              new BluePromise((resolve, reject) => {
                for (let i = 0; i < groupIdsArr.length; i++) {
                  db.groups.get_group_by_id(groupIdsArr[i].group_id, (err, response) => {
                    dataMonster.groups.push(response[0]);
                      if (i === groupIdsArr.length - 1) {
                        resolve(response);
                      }
                  });
                }

              }).then(response => {

                  new BluePromise((resolve, reject) => {

                    for (let i = 0; i < dataMonster.groups.length; i++) {
                      db.users.get_users_by_group_id(dataMonster.groups[i].id, (err, resp) => {
                        dataMonster.groups[i].users = resp;
                      });
                      db.channels.get_channels_by_parent_group(dataMonster.groups[i].id, (err, response) => {

                        dataMonster.groups[i].channels = response;
                          if (i === dataMonster.groups.length - 1) {
                            resolve(response);
                          }
                      });
                    }

                  });
              }).then(response => {
                db.messages.get_all_messages((err, response) => {

                  const messageArr = response;
                  for (let i = 0; i < dataMonster.groups.length; i++) {
                    console.log(dataMonster.groups[i]);
                    for (let j = 0; j < dataMonster.groups[i].channels.length; j++) {
                      dataMonster.groups[i].channels[j].messages = [];
                      for (let k = 0; k < messageArr.length; k++) {
                        if (messageArr[k].channel_recipient === dataMonster.groups[i].channels[j].id) {
                          dataMonster.groups[i].channels[j].messages.push(messageArr[k]);
                        }
                      }
                    }
                  }
                  db.channels.get_private_channels_by_user_id(req.params.id, (err, response) => {
                    if (err) {
                      console.log(err);
                      res.set(401).json("There was an error retrieving the user's private channels");
                    }
                    else {
                      const privateChannels = response;
                      for (let i = 0; i < privateChannels.length; i++) {
                        privateChannels[i].messages = [];
                        for (let k = 0; k < messageArr.length; k++) {
                          if (messageArr[k].channel_recipient == privateChannels[i].id || messageArr[k].channel_recipient == privateChannels[i].id) {
                            privateChannels[i].messages.push(messageArr[k]);
                          }
                        }
                      }
                      db.users.get_all_users((err, response) => {
                        let userArr = response;

                        dataMonster.friends = [];
                        for (let i = 0; i < userArr.length; i++) {
                          if (userArr[i].id == req.params.id) {
                            userArr.splice(i, 1);
                            i--;
                          }
                        }
                        const userArr2 = userArr;
                        if (err) {
                          console.log(err);
                          res.set(401).json("There was an error retrieving the user's friends");
                        }
                        else {

                          for(let i = 0; i < userArr.length; i++) {
                            for (let k = 0; k < privateChannels.length; k++) {
                              if (privateChannels[k].private_recipient2 === userArr[i].id || privateChannels[k].private_recipient1 === userArr[i].id) {
                                userArr[i].privateChannel = privateChannels[k];
                                dataMonster.friends.push(userArr[i]);
                                // console.log(req.params.id);
                              }
                            }
                          }
                          console.log(dataMonster);
                          res.set(200).json(dataMonster);
                        }
                      });
                    }
                  });

                });
              });
            }
          });
        }
      });
    }
    else {
      res.set(403).json("FORBIDDEN");
    }
  },
  createNewUser(req, res, next) {
    if (req.body) {
      db.users.create_new_user([req.body.username, req.body.password, req.body.email, req.body.display_name, req.body.avatar], (err, response) => {
        if (err) {
          console.log(err);
        }
        else {
          res.set(200).json("User successfully created");
        }
      });
    }
    else {
      res.set(401).json("There was an error creating the user");
    }
  },
  updateUser(req, res, next) {
    if (req.body) {
      db.users.update_user([req.body.username, req.body.password, req.body.email, req.body.display_name, req.body.avatar, req.body.user_id], (err, response) => {
        if (err) {
          console.log(err);
          res.set(401).json("There was an error adding the user");
        }
        else {
          res.set(200).json("User updated successfully");
        }
      });
    }
  },
  getAllUsers(req, res, next) {
    db.users.get_all_users((err, response) => {
      if(err) {
        console.log(err);
        res.set(401).json("There was an error getting users");
      }
      else {
        res.set(200).json(response);
      }
    });
  },
  deleteUser(req, res, next) {
    db.users.delete_user(req.params.id, (err, response) => {
      if (err) {
        console.log(err);
        res.set(401).json("There was an error deleting the user");
      }
      else {
        res.set(200).json("User successfully deleted");
      }
    });
  },
  getUserById(req, res, next) {
    db.users.get_user_by_id(req.params.id, (err, response) => {
      if (err) {
        console.log(err);
        res.set(401).json("There was an error retrieving that user");
      }
      else {
        res.set(200).json(response);
        return;
      }
    });
  }
};
