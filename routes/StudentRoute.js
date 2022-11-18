const express = require("express");
const router = express.Router();
const {body} = require('express-validator');
const studentControler = require ("../controller/StudentControler")

router.get("" ,studentControler.getAllStudents);
router.get("/id/", studentControler.getById)
router.post("" ,studentControler.saveNewStudent);
router.post('/login', studentControler.login)
router.delete("/:id" ,studentControler.deleteStudent);
router.put("/results/:id" , studentControler.updateResults);
router.put("/:id" , studentControler.updateStudent);



module.exports = router ;