const Videos = require("../model/videos.model");
const errorThrower = require('../util/error');
const clearImage = require('../util/clear-image');

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
        const video = req.file.path.replace("\\", "/");
        req.body.lessonURL = video;
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
        if(req.file){
            req.body.videoUrl = req.file.path.replace("\\", "/");
        }
        const videos = await Videos.findById(id);
        if(!videos){
            errorThrower(404, 'No video for this id');
        }
        if(req.body.videoUrl !== videos.lessonURL){
            clearImage(videos.lessonURL);
        }
        videos.lessonTitle = req.body.lessonTitle;
        videos.lessonSubj = req.body.lessonSubj;
        videos.lessonGrade = req.body.lessonGrade;
        videos.lessonURL = req.body.videoUrl;
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
            errorThrower(404, 'No video with this id');
        }
        clearImage(video.lessonURL)
        res.status(200).send(video._id);
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getByTeacherId = async(req, res, next)=>{
    try {
        const id = req.query['id'];
        const videos = await Videos.find({lessonCreator: id});
        if(!videos){
            errorThrower(401, 'No videos');
        }
        res.status(200).send(videos);
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getByStudentGrade = async(req, res, next)=>{
    try {
        const grade = req.query['grade'];
        const videos = await Videos.find({lessonGrade: grade});
        if(!videos){
            errorThrower(401, 'No videos');
        }
        res.status(200).send(videos);
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}