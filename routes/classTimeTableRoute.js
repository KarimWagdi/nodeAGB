const express = require('express');
const route = express.Router();
const classTimeTableController = require('../controller/classTimeTableController');

route.get("", classTimeTableController.getAllTimeTables);
route.get('/table', classTimeTableController.getByGrade);
route.post("", classTimeTableController.addTable);
route.delete('/:id', classTimeTableController.deleteTable);
route.put('/:id', classTimeTableController.updateTable);


module.exports = route;