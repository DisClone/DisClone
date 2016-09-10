import app from "../srcServer";
var db = app.get('db');
var BluePromise = require('bluebird');

// let get_channels_promise = () => {
//   return new BluePromise((resolve, reject) => {
//     for (let i = 0; i < dataMonster.groups.length; i++) {
//       db.channels.get_channels_by_parent_group(dataMonster.groups[i].group_id, (err, response) => {
//         console.log(response);
//         resolve(response);
//           // console.log("Are you watching closely?", dataMonster.groups[i].channels);
//       });
//     }
//   });
// };

module.exports = {
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
              dataMonster.groups = response;
              // res.set(200).json(dataMonster);
              new BluePromise((resolve, reject) => {
                for (let i = 0; i < dataMonster.groups.length; i++) {
                  db.channels.get_channels_by_parent_group(dataMonster.groups[i].group_id, (err, response) => {
                    dataMonster.groups[i].channels = response;
                    // console.log(response);
                      // console.log("Are you watching closely?", dataMonster.groups[i].channels);
                      if (i === dataMonster.groups.length - 1) {
                        resolve(response);
                      }
                  });
                }

              }).then(response => {
                db.messages.get_all_messages((err, response) => {

                  let messageArr = response;
                  for (let i = 0; i < dataMonster.groups.length; i++) {
                    for (let j = 0; j < dataMonster.groups[i].channels.length; j++) {
                      dataMonster.groups[i].channels[j].messages = [];
                      for (let k = 0; k < messageArr.length; k++) {
                        if (messageArr[k].channel_recipient === dataMonster.groups[i].channels[j].id) {
                          dataMonster.groups[i].channels[j].messages.push(messageArr[k]);
                        }
                      }
                    }
                  }
                  console.log(dataMonster);
                  res.set(200).json(dataMonster);
                });
              //   new BluePromise((resolve, reject) => {
              //     console.log(dataMonster.groups.length);
              //     for (var j = 0; j < dataMonster.groups.length; j++) {
              //       console.log(j);
              //       // console.log(dataMonster.groups[i].channels);
              //       for(let k = 0; k < dataMonster.groups[j].channels.length; k++) {
              //         console.log("I'm j, I'm a bastard", j);
              //         db.messages.get_messages_by_channel_id(dataMonster.groups[j].channels[k].id, function(err, response) {
              //           console.log("Don't worry ma'am I'm from the database",response, j);
              //             //   dataMonster.groups[j].channels[k].messages = response;
              //             //   console.log(response);
              //             //   if(err) {
              //             //     console.log(err);
              //             //   }
              //             //   else {
              //             //     dataMonster.groups[j].channels[k].messages = response;
              //             //     console.log(response);
              //             //     if (j === dataMonster.groups.length - 1 && k === dataMonster.groups[j].channels.length -1) {
              //             //       resolve(response);
              //             //   }
              //             // }
              //             });
              //       }
              //     //   for (let k = 0; k < dataMonster.groups[i].channels.length; i++) {
              //     //     db.messages.get_messages_by_channel_id(dataMonster.groups[i].channels[k].id, (err, response) => {
              //     //       // dataMonster.groups[i].channels[k].messages = response;
              //     //       console.log(response);
              //     //       // if(err) {
              //     //       //   console.log(err);
              //     //       // }
              //     //       // else {
              //     //       //   dataMonster.groups[i].channels[k].messages = response;
              //     //       //   console.log(response);
              //     //       //   if (i === dataMonster.groups.length - 1 && k === dataMonster.groups[i].channels.length -1) {
              //     //       //     resolve(response);
              //     //       // }
              //     //     // }
              //     //     });
              //     // }
              //   }
              // }).then(response => {
              //   res.set(200).json(dataMonster);
              // });
              });
              // setTimeout(() => {
              //   console.log(dataMonster.groups);
              //   // res.set(200).json(dataMonster);
              //   for (let i = 0; i < dataMonster.groups.length; i++) {
              //
              //   }
              // }, 100);
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
