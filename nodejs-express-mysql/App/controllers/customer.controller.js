const Customer = require("../models/customer.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {

};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {

};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {

};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {

};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {

};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {

};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const customer = new Customer({
    customer_ID: req.body.customer_ID,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    date: req.body.date,
    time: req.body.time,
    content_link: req.body.content_link,
    content_title: req.body.content_title
    // email: req.body.email,
    // name: req.body.name,
    // active: req.body.active
  });

  // Save Customer in the database
  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Customer.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Customer.findById(req.params.customer_ID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customer_ID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.customer_ID
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

  Customer.updateById(
    req.params.customer_ID,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.customer_ID}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.customer_ID
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Customer.remove(req.params.customer_ID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customer_ID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.customer_ID
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Customer.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
