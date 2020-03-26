const sql = require("./db.js");

// constructor - added in fields to match my sql DB
const meeting = function(meeting) {
  // this.meeting_ID = meeting.meeting_ID;
  this.date = meeting.date;
  this.time = meeting.time;
  this.content_link = meeting.content_link;
  this.content_title = meeting.content_title;
};

meeting.create = (newmeeting, result) => {
  sql.query("INSERT INTO meetings SET ?", newmeeting, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created meeting: ", {
      id: res.insertId,
      ...newmeeting
    });
    result(null, {
      id: res.insertId,
      ...newmeeting
    });
  });
};

meeting.findById = (meetingId, result) => {
  sql.query(`SELECT * FROM meetings WHERE id = ${meeting_ID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found meeting: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found meeting with the id
    result({
      kind: "not_found"
    }, null);
  });
};

meeting.getAll = result => {
  sql.query("SELECT * FROM meetings", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("meetings: ", res);
    result(null, res);
  });
};

meeting.updateById = (id, meeting, Content) => {
  sql.query("UPDATE meetings SET email = ?, first_name = ?, last_name = ?, date = ?, time = ?, content_link = ?, content_title = ?, WHERE id = ?", [
    meeting.date,
    meeting.time,
    meeting.content_link,
    meeting.content_title,
    meeting.meeting_IDid
  ], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found meeting with the id
      result({
        kind: "not_found"
      }, null);
      return;
    }

    console.log("updated meeting: ", {
      id: id,
      ...meeting
    });
    result(null, {
      id: id,
      ...meeting
    });
  });
};

meeting.remove = (id, result) => {
  sql.query("DELETE FROM meetings WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found meeting with the id
      result({
        kind: "not_found"
      }, null);
      return;
    }

    console.log("deleted meeting with id: ", id);
    result(null, res);
  });
};

meeting.removeAll = result => {
  sql.query("DELETE FROM meetings", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} meetings`);
    result(null, res);
  });
};

module.exports = meeting;
