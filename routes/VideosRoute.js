const express = require("express");
const videoRouter = express.Router();
const videoControler = require ("../controller/VideosControler")

videoRouter.get("" ,videoControler.getAllVideos);
videoRouter.post("" ,videoControler.saveNewVideo);
videoRouter.delete("/:id" ,videoControler.deleteVideo);
videoRouter.put("/:id" ,videoControler.updateVideo);


module.exports = videoRouter ;