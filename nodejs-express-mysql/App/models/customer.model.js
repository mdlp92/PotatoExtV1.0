const sql = require("./db.js");
// attempt to fix the time = undefined issue (define the variable)
var time = 0;
// constructor - added in fields to match my sql DB
const Customer = function(customer) {
  // this.customer_ID = customer.customer_ID;
  this.email = customer.email;
  this.first_name = customer.first_name;
  this.last_name = customer.last_name;
  this.date = customer.date;
  this.time = customer.time;
  this.content_link = customer.content_link;
  this.content_title = customer.content_title;
  // this.email = customer.email;
  // this.name = customer.name;
  // this.active = customer.active;
};

Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", {
      id: res.insertId,
      ...newCustomer
    });
    result(null, {
      id: res.insertId,
      ...newCustomer
    });
  });
};

Customer.findById = (customerId, result) => {
  sql.query(`SELECT * FROM customers WHERE id = ${customer_ID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({
      kind: "not_found"
    }, null);
  });
};

Customer.getAll = result => {
  sql.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Customer.updateById = (id, customer, Content) => {
  sql.query("UPDATE customers SET email = ?, first_name = ?, last_name = ?, date = ?, time = ?, content_link = ?, content_title = ?, WHERE id = ?", [
    customer.email,
    customer.first_name,
    customer.last_name,
    customer.date,
    customer.time,
    customer.content_link,
    customer.content_title,
    customer.customer_IDid
  ], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({
        kind: "not_found"
      }, null);
      return;
    }

    console.log("updated customer: ", {
      id: id,
      ...customer
    });
    result(null, {
      id: id,
      ...customer
    });
  });
};

Customer.remove = (id, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({
        kind: "not_found"
      }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

Customer.removeAll = result => {
  sql.query("DELETE FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Customer;
