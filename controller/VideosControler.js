const generator = require("../util/generator");
const memStorage = require("../util/memory.storage");

exports.getAllVideos = (req , res) => {

    res.send("get all Videos .......keys..." );
}

exports.saveNewVideo = (req , res) => {
    res.send("save new Video ........")
}

exports.updateVideo = (req , res) => {
    res.send("Update Video ........")
}

exports.deleteVideo = (req , res) => {
    res.send("delete Video ........")
}