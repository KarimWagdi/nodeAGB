const express = require("express");
const router = express.Router();
const {body} = require('express-validator');
const gradController = require('../controller/GradeController');

router.get("" , gradController.getGrades);
router.post("" , gradController.addGrade);
// router.delete("/notes/delete" ,studentControler.deleteStudent);
router.put("/:id" , gradController.editeGrade);


module.exports = router ;