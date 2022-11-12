const Grade = require('../model/grade.model');
const errorThrewer = require('../util/error');
exports.getGrades = async (req, res, next) => {
    try {
        const grades = await Grade.find();
        if (!grades) {
            errorThrewer(401, 'No grades in database');
        }
        res.status(200).send(grades);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.addGrade = async (req, res, next) => {
    try {
        const grade = new Grade(req.body);
        await grade.save();
        res.status(201).send(grade);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.editeGrade = async (req, res, next) => {
    try {
        const id = req.params.id;
        const grade = await Grade.findById(id);
        if (!grade) {
            errorThrewer(404, "No grade for this id");
        }
        grade.name = req.body.name;
        grade.classes = req.body.classes;
        await grade.save();
        res.status(200).send(grade);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}