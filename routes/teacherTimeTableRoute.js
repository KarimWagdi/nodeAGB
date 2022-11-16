const express = require('express');
const route = express.Router();
const teacherTimeTableController = require('../controller/teacherTimeTableController');

route.get("", teacherTimeTableController.getAllTimeTables);
route.get("/table", teacherTimeTableController.getByTeacherId);
route.post("", teacherTimeTableController.addTable);
route.delete('/:id', teacherTimeTableController.deleteTable);
route.put('/:id', teacherTimeTableController.updateTable);
module.exports = route;