const express = require("express");
const router = express.Router();
const teacherControler = require ("../controller/TeacherControler")

router.get("" ,teacherControler.getAllTeachers);
router.post("" ,teacherControler.saveNewTeacher);
router.post('/login', teacherControler.login)
router.delete("/:id" ,teacherControler.deleteTeacher);
router.put("/:id" ,teacherControler.updateTeacher);


module.exports = router ;