const mongoose = require ("mongoose");
const Schema = mongoose.Schema ; 

const videoSchema = new Schema ({
    
    lessonTitle : {
        type : String , 
        required : true 
    },
    lessonGrade : {
        type : Number , 
        required : true 
    },
    lessonURL : {
        type : String ,
        required : true 
    },
    lessonSubj : {
        type : String ,
        required : true
    }
})

module.exports = mongoose.model('Videos', videoSchema);