const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classTimeTableSchema = new Schema({
    grade: {
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
                subjects: {
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
                    },
                    7: {
                        type: String,
                        required: true
                    },
                }
            }
        ],
        required: true
    }
})

module.exports = mongoose.model('Class_TimeTable', classTimeTableSchema);