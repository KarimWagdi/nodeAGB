const mongoose  = require('mongoose');
 const Schema = mongoose.Schema;

 const teacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
 })

 module.exports = mongoose.model('Teachers', teacherSchema);