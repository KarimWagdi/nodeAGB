const Table = require('../model/class_timetable.model');
const errorThrower = require('../util/error');

exports.getAllTimeTables = async (req, res, next) => {
    try {
        const tables = await Table.find();
        if (!tables) {
            errorThrower(404, 'No tables created yet');
        }
        res.status(200).send(tables);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.addTable = async (req, res, next) => {
    try {
        const table = new Table(req.body);
        await table.save();
        res.status(201).send(table);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.updateTable = async (req, res, next) => {
    try {
        const id = req.params['id'];
        const table = await Table.findById(id);
        if (!table) {
            errorThrower(404, 'No table with this id')
        }
        table.grade = req.body.grade;
        table.timeTable = req.body.timeTable;
        await table.save();
        res.status(201).send(table);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getByGrade = async (req, res, next) => {
    try {
        const grade = req.query['grade'];
        const table = await Table.findOne({ grade: grade });
        if (!table) {
            errorThrower(404, 'No table assiend to this grade')
        }
        res.status(200).send(table);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.deleteTable = async(req, res, next) => {
    try {
        const id = req.params.id;
        const table = await Table.findByIdAndDelete(id);
        if(!table){
            errorThrower(404, 'No table with this id')
        }
        res.status(201).send(table._id);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}