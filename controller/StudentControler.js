const Students = require('../model/student.model');
const errorThrewer = require('../util/error');
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    tls:{
        ciphers: 'SSLv3'
    },
    auth: {
      user: "mohamed.elsayed.abd@outlook.com",
      pass: "01218455Me"
    }
  });


exports.getAllStudents = async (req, res, next) => {
    try {
        const students = await Students.find();
        if (!students) {
            errorThrewer(401, 'No Students in database');
        }

        res.status(200).send(students);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.saveNewStudent = async (req, res, next) => {
    try {
        const student = new Students(req.body);
        await student.save();
        transport.sendMail({
            to: student.email,
            from: 'mohamed.elsayed.abd@outlook.com',
            subject: 'login information ',
            html:`<h1>You are now able to log in to your school account using provided email and password in this mail</h1>
            <p>email: ${student.email}</p>
            <p>password: ${student.password}</p>`
        })
        res.status(201).send(student);
    } catch (error) { 
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.updateStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const student = await Students.findById(id);
        if (!student) {
            errorThrewer(404, 'No student for this id');
        }
        if(student.email !== req.body.email && student.password !== req.body.password){
            transport.sendMail({
                to: req.body.email,
                from: 'mohamed.elsayed.abd@outlook.com',
                subject: 'Updated credentials',
                html:`<h1>Your login information has been updated the new one is</h1>
                <p>email: ${req.body.email}</p>
                <p>password: ${req.body.password}</p>
                `
            })
        }
        else if(student.email !== req.body.email){
            transport.sendMail({
                to: req.body.email,
                from: 'mohamed.elsayed.abd@outlook.com',
                subject: 'Updated credentials',
                html:`<h1>Your login email has been updated the new email is</h1>
                <p>email: ${req.body.email}</p>`
            })
        }
        else if(student.password !== req.body.password){
            transport.sendMail({
                to: student.email,
                from: 'mohamed.elsayed.abd@outlook.com',
                subject: 'Updated credentials',
                html:`<h1>Your login password has been updated the new password is</h1>
                <p>password: ${req.body.password}</p>`
            })
        }
        student.name = req.body.name;
        student.grade = req.body.grade;
        student.email = req.body.email;
        student.password = req.body.password;
        await student.save();
        res.status(200).send(student);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.deleteStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const student = await Students.findByIdAndDelete(id);
        if (!student) {
            errorThrewer(404, 'No student with this id');
        }
        res.status(200).send(student._id);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.updateResults = async(req, res, next)=>{
    try {
        const id = req.params['id'];
        const student = await Students.findById(id);
        if(!student){
            errorThrewer(404, 'This student does not exsists')
        }
        const index = student.results.findIndex(ele => ele.teacherId.toString() === req.body.teacherId);
        if(index > -1){
            student.results[index] = req.body;
        }else{
            student.results.push(req.body);
        }
        await student.save();
        res.status(201).send(student);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.login = async(req, res, next)=>{
    try {
        const student = await Students.findOne({email: req.body.email});
        if(!student){
            errorThrewer(404, 'No student for this account');
        }
        if(student.password !== req.body.password){
            errorThrewer(401, 'wrong password')
        }
        res.status(200).send(student);
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getById = async (req, res, next)=>{
    try {
        const id = req.query['id'];
        const student = await Students.findById(id);
        if(!student){
            errorThrewer(404, 'No student for this account');
        }
        res.status(200).send(student);
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}