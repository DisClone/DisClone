var app = require("../srcServer");
var db = app.get('db');

module.exports = {
  postNewMessage(req, res, next) {
    if (req.body) {
      console.log(req.body);
      db.post_new_message([req.body.message_text, req.body.message_time, req.body.is_group_message, req.body.author_id, req.body.recipient_id, req.body.group_recipient], function(err, response) {
        if (err) {
          console.log(err);
          res.set(401).send('There was an error handling your request');
          return;
        }
        else {
          res.set(200).json(response);
          return;
        }
      });
    }
  },
  editMessage(req, res, next) {
    if(req.body) {
      db.edit_message([req.body.message_text, req.body.id], function(err, response) {
        if (err) {
          console.log(err);
          res.set(401).json("There was an error handling your request, nigga");
          return;
        }
        else {
          res.set(200).json("Message edited");
          return;
        }

      });
    }
    else {
      res.set(401).json("No request body");
    }
  },
  deleteMessage(req, res, next) {
    if (req) {
      db.delete_message(req.params.id, function(err, response) {
        if (err) {
          console.log(err);

        }
        else {
          res.set(200).json("Message deleted");
        }
      });
    }
  },
  getAllMessages(req, res, next) {
    db.get_all_messages(function(err, response) {
      console.log(response);
      res.set(200).json(response);
    });
  }
};
