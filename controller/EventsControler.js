const Event = require('../model/events.model');
const errorThrower = require('../util/error');
const clearImage = require('../util/clear-image');

exports.getAllEvents = async(req, res, next) => {
    try {
        const events = await Event.find();
        if(!events){
            errorThrower(401, 'No events found');
        }
        res.status(200).send(events);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error); 
    }
}

exports.saveNewEvent = async (req, res, next) => {
    try {
        const image = req.file.path.replace("\\", "/");
        req.body['image'] = image;
        const location = JSON.parse(req.body.location)
        const {title, date, description, grade} = req.body;
        const event = new Event({
            title: title,
            date: date,
            description: description,
            grade: grade,
            image: image,
            location: {
                name: location.name,
                url: location.url
            }
        });
        await event.save();
        res.status(201).send(event);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error); 
    }
}

exports.updateEvent = async(req, res, next) => {
    try {
        const id = req.params['id'];
        if(req.file){
            req.body.imageUrl = req.file.path.replace("\\", "/");
        }
        const event = await Event.findById(id);
        if(!event){
            errorThrower(404, 'Couldnt find evet with this Id');
        }
        if(req.body.imageUrl !== event.image){
            clearImage(event.image); 
        }
        const location = JSON.parse(req.body.location)
        const {title, date, description, grade, imageUrl} = req.body;
        event.title = title;
        event.date = date;
        event.description = description;
        event.grade = grade;
        event.image = imageUrl;
        event.location = location;
        await event.save();
        res.status(201).send(event);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.deleteEvent = async(req, res, next) => {
    try {
        const id = req.params['id'];
        const event = await Event.findByIdAndDelete(id);
        if(!event){
            errorThrower(404, 'No event with this id');
        }
        clearImage(event.image);
        res.status(200).send(event._id);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

