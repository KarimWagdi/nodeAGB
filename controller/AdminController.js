const Admin = require('../model/admin.model');

const errorThrower = require('../util/error');

exports.login = async(req, res, next) => {
    try {
        const user = await Admin.findOne({email: req.body.email});
        if(!user){
            errorThrower(404, 'No user for this account');
        }
        if(user.password !== req.body.password){
            errorThrower(401, 'wrong password')
        }
        res.status(200).send({id: user._id});
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getUser = async(req, res, next) => {
    try {
        const id = req.query.id;
        const user = await Admin.findById(id);
        if(!user){
            errorThrower(404, 'No user found with this id');
        }
        res.status(200).send(user);
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}


exports.updateUser = async(req, res, next) =>{
    try {
        const id = req.params.id;
        const user = await Admin.findById(id);
        if(!user){
            errorThrower(404, 'No user with is id');
        }
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}