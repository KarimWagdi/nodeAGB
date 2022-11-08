const express = require("express");
const videoRouter = express.Router();
const videoControler = require ("../controler/VideosControler")

videoRouter.get("/notes" ,videoControler.getAllVideos);
videoRouter.post("/notes/save" ,videoControler.saveNewVideo);
videoRouter.delete("/notes/delete" ,videoControler.deleteVideo);
videoRouter.put("/notes/update" ,videoControler.updateVideo);


module.exports = videoRouter ;