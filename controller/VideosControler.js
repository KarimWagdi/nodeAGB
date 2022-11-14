const Videos = require("../model/videos.model");
const errorThrower = require('../util/error');

exports.getAllVideos = async(req , res , next) => {
    try {
        const videos = await Videos.find();
        if(!videos){
            errorThrower(401, 'No videos in database')
        }
        res.status(200).send(videos)
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.saveNewVideo = async(req , res, next) => {
    try {
        const videos = new Videos(req.body);
        await videos.save();
        res.status(201).send(videos);
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}


exports.updateVideo = async(req , res, next) => {
    try {
        const id = req.params.id;
        const videos = await Videos.findById(id);
        if(!videos){
            errorThrewer(404, 'No video for this id');
        }
        videos.name = req.body.name;
        videos.grade = req.body.grade;
        videos.email = req.body.email;
        videos.password = req.body.password;
        await videos.save();
        res.status(200).send(videos);
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.deleteVideo = async(req , res, next) => {
    try {
        const id = req.params.id;
        const video = await Videos.findByIdAndDelete(id);
        if(!video){
            errorThrewer(404, 'No video with this id');
        }
        res.status(200).send(video._id);
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}