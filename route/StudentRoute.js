const express = require("express");
const studentRouter = express.Router();
const studentControler = require ("../controler/StudentControler")

studentRouter.get("/notes" ,studentControler.getAllStudents);
studentRouter.post("/notes/save" ,studentControler.saveNewStudent);
studentRouter.delete("/notes/delete" ,studentControler.deleteStudent);
studentRouter.put("/notes/update" ,studentControler.updateStudent);


module.exports = studentRouter ;