const express = require("express");
const videoRouter = express.Router();
const videoControler = require ("../controller/VideosControler")

videoRouter.get("" ,videoControler.getAllVideos);
videoRouter.post("" ,videoControler.saveNewVideo);
videoRouter.delete("/:id" ,videoControler.deleteVideo);
videoRouter.put("/:id" ,videoControler.updateVideo);
videoRouter.get("/teacher/lessons", videoControler.getByTeacherId)
videoRouter.get("/student/lessons", videoControler.getByStudentGrade)
module.exports = videoRouter ;