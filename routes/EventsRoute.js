const express = require("express");
const route = express.Router();
const eventsControler = require ("../controller/EventsControler")

route.get("" ,eventsControler.getAllEvents);
route.post("" , eventsControler.saveNewEvent);
// route.delete("/notes/delete" ,eventsControler.deleteEvent);
// route.put("/notes/update" ,eventsControler.updateEvent);

module.exports = route ;