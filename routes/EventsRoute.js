const express = require("express");
const route = express.Router();
const eventsControler = require ("../controller/EventsControler")

route.get("" ,eventsControler.getAllEvents);
route.post("" , eventsControler.saveNewEvent);
route.delete("/:id" ,eventsControler.deleteEvent);
route.put("/:id" ,eventsControler.updateEvent);

module.exports = route ;