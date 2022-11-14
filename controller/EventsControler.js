const Event = require('../model/events.model');

exports.getAllEvents = (req, res) => {

    res.send({test: 'test'});
}

exports.saveNewEvent = async (req, res, next) => {
    try {
        console.log(req.body);
        const image = req.file.path.replace("\\", "/");
        console.log(image);
        req.body['image'] = image;
        console.log(req.body);

        const event = new Event(req.body);
        console.log(event);
        await event.save();
        res.status(201).send(event);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error); 
    }
}

exports.updateEvent = (req, res) => {
    res.send("Update Event ........")
}

exports.deleteEvent = (req, res) => {
    res.send("delete Event ........")
}