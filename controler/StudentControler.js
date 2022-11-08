const generator = require("../util/generator");
const memStorage = require("../util/memory.storage");

exports.getAllStudents = (req , res) => {
    // var seqID = generator.generate();
    // memStorage.store.setItem(seqID , "1st_key");

    // var seqID_2 = generator.generate();
    // memStorage.store.setItem(seqID_2 , "2st_key");

    // var keys = memStorage.getKeys(memStorage.store);
    // var values = memStorage.getValues(memStorage.store);
    // console.log("values..........." + JSON.stringify(values));
    res.send("get all students .......keys..." );
}

exports.saveNewStudent = (req , res) => {
    res.send("save new student ........")
}

exports.updateStudent = (req , res) => {
    res.send("Update student ........")
}

exports.deleteStudent = (req , res) => {
    res.send("delete student ........")
}