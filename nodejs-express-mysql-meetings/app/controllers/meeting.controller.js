const meeting = require("../models/meeting.model.js");

// Create and Save a new meeting
exports.create = (req, res) => {

};

// Retrieve all meetings from the database.
exports.findAll = (req, res) => {

};

// Find a single meeting with a meetingId
exports.findOne = (req, res) => {

};

// Update a meeting identified by the meetingId in the request
exports.update = (req, res) => {

};

// Delete a meeting with the specified meetingId in the request
exports.delete = (req, res) => {

};

// Delete all meetings from the database.
exports.deleteAll = (req, res) => {

};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a meeting - added fields to match my DB
  const meeting = new meeting({
    date: req.body.date,
    time: req.body.time,
    content_link: req.body.content_link,
    content_title: req.body.content_title
  });

  // Save meeting in the database
  meeting.create(meeting, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the meeting."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  meeting.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving meetings."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  meeting.findById(req.params.meeting_ID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found meeting with id ${req.params.meeting_ID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving meeting with id " + req.params.meeting_ID
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  meeting.updateById(
    req.params.meeting_ID,
    new meeting(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found meeting with id ${req.params.meeting_ID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating meeting with id " + req.params.meeting_ID
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  meeting.remove(req.params.meeting_ID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found meeting with id ${req.params.meeting_ID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete meeting with id " + req.params.meeting_ID
        });
      }
    } else res.send({ message: `meeting was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  meeting.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all meetings."
      });
    else res.send({ message: `All meetings were deleted successfully!` });
  });
};
