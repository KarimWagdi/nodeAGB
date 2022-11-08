const express = require("express");
const eventsRouter = express.Router();
const eventsControler = require ("../controler/EventsControler")

eventsRouter.get("/notes" ,eventsControler.getAllEvents);
eventsRouter.post("/notes/save" ,eventsControler.saveNewEvent);
eventsRouter.delete("/notes/delete" ,eventsControler.deleteEvent);
eventsRouter.put("/notes/update" ,eventsControler.updateEvent);

module.exports = eventsRouter ;