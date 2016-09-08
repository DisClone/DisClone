var app = require('../srcServer');
// console.log(app);
var db = app.get('db');

module.exports = {
  createNewGroup(req, res, next) {
    db.groups.create_new_group([req.body.user_id, req.body.group_image, req.body.group_name], (err, response) => {
      if (err) {
        console.log(err);
        res.set(401).json("There was an error creating the group");
        return;
      }
      else {
        res.set(200).json('New group successfully added');
        return;
      }
    });
  },
  getGroupById(req, res, next) {
    db.groups.get_group_by_id(req.params.id, (err, response) => {
      if (err) {
        console.log(err);
        res.set(401).json("There was an error retrieving the group");
        return;
      }
      else {
        res.set(200).json(response);
        return;
      }
    });
  },
  deleteGroupById(req, res, next) {
    db.groups.delete_group_by_id(req.params.id, (err, response) => {
      if (err) {
        console.log(err);
        res.set(401).json("There was an error deleting the group");
        return;
      }
      else {
        res.set(200).json("Group successfully deleted");
        return;
      }
    });
  },
  joinGroupByUserId(req, res, next) {
    db.groups.join_group_by_user_id([req.body.user_id, req.body.group_id], (err, response) => {
      if (err) {
        console.log(err);
        res.set(401).json("There was an error in joining the group");
        return;
      }
      else {
        res.set(200).json("Successfully joined group");
        return;
      }
    });
  },
  removeFromGroupByUserId(req, res, next) {
    db.groups.remove_from_group_by_user_id([req.body.user_id, req.body.group_id], (err, response) => {
      if (err) {
        console.log(err);
        res.set(401).json("There was an error removing user from group");
        return;
      }
      else {
        res.set(200).json("Successfully removed from group");
      }
    });
  }
};
