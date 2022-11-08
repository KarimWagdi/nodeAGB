const generator = require("../util/generator");
const memStorage = require("../util/memory.storage");

exports.getAllEvents = (req , res) => {

    res.send("get all Events .......keys..." );
}

exports.saveNewEvent = (req , res) => {
    res.send("save new Event ........")
}

exports.updateEvent = (req , res) => {
    res.send("Update Event ........")
}

exports.deleteEvent = (req , res) => {
    res.send("delete Event ........")
}