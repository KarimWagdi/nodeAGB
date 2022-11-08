const express = require("express");
const teacherRouter = express.Router();
const teacherControler = require ("../controler/TeacherControler")

teacherRouter.get("/notes" ,teacherControler.getAllTeachers);
teacherRouter.post("/notes/save" ,teacherControler.saveNewTeacher);
teacherRouter.delete("/notes/delete" ,teacherControler.deleteTeacher);
teacherRouter.put("/notes/update" ,teacherControler.updateTeacher);


module.exports = teacherRouter ;