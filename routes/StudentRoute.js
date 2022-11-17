const express = require("express");
const router = express.Router();
const {body} = require('express-validator');
const studentControler = require ("../controller/StudentControler")

router.get("" ,studentControler.getAllStudents);
router.post("" ,studentControler.saveNewStudent);
router.delete("/:id" ,studentControler.deleteStudent);
router.put("/results/:id" , studentControler.updateResults);
router.put("/:id" , studentControler.updateStudent);



module.exports = router ;