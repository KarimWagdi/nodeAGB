const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
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
    grade:{
        type: String,
        required: true
    },
    results:[
        {
            subject: String,
            points: Number,
            feadback: String,
            teacherId: Schema.Types.ObjectId
        }
    ]
}) 

module.exports = mongoose.model('Students', studentSchema);