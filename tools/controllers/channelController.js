import app from "../srcServer";
const db = app.get('db');

module.exports = {
  createNewGroupChannel(req, res, next) {
    db.channels.create_new_group_channel([req.body.channel_name, req.body.parent_group], (err, response) => {
      if (err) {
        console.log(err);
        res.set(401).json("There was an error creating the channel");
        return;
      }
      else {
        res.set(200).json("Channel successfully created");
        return;
      }
    });
  },
  createNewPrivateChannel(req, res, next) {
    db.channels.create_new_private_channel([req.body.private_recipient1, req.body.private_recipient2], (err, response) => {
      if (err) {
        console.log(err);
        res.set(401).json("There was an error creating the channel");
        return;
      }
      else {
        res.set(200).json("Channel successfully created");
        return;
      }
    });
  },
  getChannelsByParentGroup(req, res, next) {
    db.channels.get_channels_by_parent_group(req.params.id, (err, response) => {
      if (err) {
        console.log(err);
        res.set(401).json("There was an error retrieving groups");
        return;
      }
      else {
        res.set(200).json(response);
        return;
      }
    });
  },
  deleteChannelById(req, res, next) {
    db.channels.delete_channel_by_id(req.params.channel_id, (err, response) => {
      if (err) {
        console.log(err);
        res.set(401).json("There was an error deleting the group");
        return;
      }
      else {
        res.set(200).json("Channel successfully deleted");
        return;
      }
    });
  },
  editChannelById(req, res, next) {
    db.channels.edit_channel_by_id([req.body.channel_name, req.body.channel_id], (err, response) => {
      if (err) {
        console.log(err);
        res.set(401).json("There was an error editing the group");
        return;
      }
      else {
        res.set(200).json("channel successfully edited");
        return;
      }
    });
  }
};
