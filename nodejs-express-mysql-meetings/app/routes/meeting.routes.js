module.exports = app => {
  const meetings = require("../controllers/meeting.controller.js");

  // Create a new meeting
  app.post("/meetings", meetings.create);

  // Retrieve all meetings
  app.get("/meetings", meetings.findAll);

  // Retrieve a single meeting with meetingId
  app.get("/meetings/:meetingId", meetings.findOne);

  // Update a meeting with meetingId
  app.put("/meetings/:meetingId", meetings.update);

  // Delete a meeting with meetingId
  app.delete("/meetings/:meetingId", meetings.delete);

  // Create a new meeting
  app.delete("/meetings", meetings.deleteAll);
};
