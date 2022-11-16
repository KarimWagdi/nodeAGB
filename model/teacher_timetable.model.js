const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherTimeTableSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    timeTable: {
        type: [
            {
                day: {
                    type: String,
                    required: true
                },
                classes: {
                    1: {
                        type: String,
                        required: true
                    },
                    2: {
                        type: String,
                        required: true
                    },
                    3: {
                        type: String,
                        required: true
                    },
                    4: {
                        type: String,
                        required: true
                    },
                    5: {
                        type: String,
                        required: true
                    },
                    6: {
                        type: String,
                        required: true
                    }
                }
            }
        ],
        required: true
    },
    teacherId:{
        type: Schema.Types.ObjectId,
        ref:'Teachers',
        required: true
    }
})

module.exports = mongoose.model('Teacher_TimeTable', teacherTimeTableSchema);