const generator = require("../util/generator");
const memStorage = require("../util/memory.storage");

exports.getAllManagers = (req , res) => {

    res.send("get all Managers .......keys..." );
}

exports.saveNewManager = (req , res) => {
    res.send("save new Manager ........")
}

exports.updateManager = (req , res) => {
    res.send("Update Manager ........")
}

exports.deleteManager = (req , res) => {
    res.send("delete Manager ........")
}