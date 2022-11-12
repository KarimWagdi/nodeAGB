const Teacher = require('../model/teacher.model');
const errorThrower = require('../util/error');
exports.getAllTeachers = async(req , res, next) => {
    try {
        const teachers = await Teacher.find();
        if(!teachers){
            errorThrower(401, 'No teachers in database')
        }
        res.status(200).send(teachers)
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.saveNewTeacher = async(req , res, next) => {
    try {
        req.body['type'] = 'teacher';
        const teacher = new Teacher(req.body);
        await teacher.save();
        res.status(201).send(teacher);
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.updateTeacher = async(req , res, next) => {
    try {
        const id = req.params.id;
        console.log(id);
        const teacher = await Teacher.findById(id);
        if(!teacher){
            errorThrower(404, 'No student for this id');
        }
        teacher.name = req.body.name;
        teacher.type = req.body.type;
        teacher.email = req.body.email;
        teacher.password = req.body.password;
        await teacher.save();
        res.status(200).send(teacher);
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.deleteTeacher = async(req , res, next) => {
    try {
        const id = req.params.id;
        const teacher = await Teacher.findByIdAndDelete(id);
        if(!teacher){
            errorThrower(404, 'No teacher with this id');
        }
        res.status(200).send(teacher._id);
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}