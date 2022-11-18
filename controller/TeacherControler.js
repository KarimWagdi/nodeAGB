const Teacher = require('../model/teacher.model');
const errorThrower = require('../util/error');
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
        transport.sendMail({
            to: teacher.email,
            from: 'mohamed.elsayed.abd@outlook.com',
            subject: 'login information ',
            html:`<h1>You are now able to log in to your school account using provided email and password in this mail</h1>
            <p>email: ${teacher.email}</p>
            <p>password: ${teacher.password}</p>`
        })
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
        const teacher = await Teacher.findById(id);
        if(!teacher){
            errorThrower(404, 'No teacher for this id');
        }
        if(teacher.email !== req.body.email && teacher.password !== req.body.password){
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
        else if(teacher.email !== req.body.email){
            transport.sendMail({
                to: req.body.email,
                from: 'mohamed.elsayed.abd@outlook.com',
                subject: 'Updated credentials',
                html:`<h1>Your login email has been updated the new email is</h1>
                <p>email: ${req.body.email}</p>`
            })
        }
        else if(teacher.password !== req.body.password){
            transport.sendMail({
                to: teacher.email,
                from: 'mohamed.elsayed.abd@outlook.com',
                subject: 'Updated credentials',
                html:`<h1>Your login password has been updated the new password is</h1>
                <p>password: ${req.body.password}</p>`
            })
        }
        teacher.name = req.body.name;
        teacher.subject = req.body.subject;
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

exports.login = async(req, res, next)=>{
    try {
        const teacher = await Teacher.findOne({email: req.body.email});
        if(!teacher){
            errorThrower(404, 'No teacher for this account');
        }
        if(teacher.password !== req.body.password){
            errorThrower(401, 'wrong password')
        }
        res.status(200).send(teacher);
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}