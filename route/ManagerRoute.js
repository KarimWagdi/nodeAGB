const express = require("express");
const managerRouter = express.Router();
const managerControler = require ("../controler/ManagerControler")

managerRouter.get("/notes" ,managerControler.getAllManagers);
managerRouter.post("/notes/save" ,managerControler.saveNewManager);
managerRouter.delete("/notes/delete" ,managerControler.deleteManager);
managerRouter.put("/notes/update" ,managerControler.updateManager);


module.exports = managerRouter ;