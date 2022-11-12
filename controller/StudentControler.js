const Students =  require('../model/student.model');
const errorThrewer = require('../util/error');

exports.getAllStudents = async (req , res, next) => {
    try {
        const students = await Students.find();
        if(!students){
            errorThrewer(401, 'No Students in database');
        }
        res.status(200).send(students);
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.saveNewStudent = async(req , res, next) => {
    try {
        const student = new Students(req.body);
        await student.save();
        res.status(201).send(student);
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.updateStudent = async(req , res, next) => {
    try {
        const id = req.params.id;
        const student = await Students.findById(id);
        if(!student){
            errorThrewer(404, 'No student for this id');
        }
        student.name = req.body.name;
        student.grade = req.body.grade;
        student.email = req.body.email;
        student.password = req.body.password;
        await student.save();
        res.status(200).send(student);
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.deleteStudent = async(req , res, next) => {
    try {
        const id = req.params.id;
        const student = await Students.findByIdAndDelete(id);
        if(!student){
            errorThrewer(404, 'No student with this id');
        }
        res.status(200).send(student._id);
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}