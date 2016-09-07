import app from "../srcServer";
var db = app.get('db');

module.exports = {
  createNewUser(req, res, next) {
    if (req.body) {
      db.create_new_user([req.body.username, req.body.password, req.body.email, req.body.display_name, req.body.avatar], (err, response) => {
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
      db.update_user([req.body.username, req.body.password, req.body.email, req.body.display_name, req.body.avatar, req.body.user_id], (err, response) => {
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
    db.get_all_users((err, response) => {
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
    db.delete_user(req.params.id, (err, response) => {
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
    db.get_user_by_id(req.params.id, (err, response) => {
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
