const express = require('express');

const router = express.Router();

const adminController = require('../controller/AdminController');

router.get("", adminController.getUser);
router.post("", adminController.login);
router.put("/:id", adminController.updateUser);

module.exports = router;