const generator = require("../util/generator");
const memStorage = require("../util/memory.storage");

exports.getAllTeachers = (req , res) => {

    res.send("get all Teachers .......keys..." );
}

exports.saveNewTeacher = (req , res) => {
    res.send("save new Teacher ........")
}

exports.updateTeacher = (req , res) => {
    res.send("Update Teacher ........")
}

exports.deleteTeacher = (req , res) => {
    res.send("delete Teacher ........")
}