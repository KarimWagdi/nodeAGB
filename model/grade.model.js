const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    classes: {
        type: [String],
        required: true
    }
})

module.exports = mongoose.model('Grades', gradeSchema);