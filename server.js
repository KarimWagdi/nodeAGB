require('dotenv').config();
const express = require("express");
const cors = require("./middlewares/cors");
const error = require('./middlewares/error');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require('multer');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const studentRouter = require("./routes/StudentRoute");
const teacherRouter = require("./routes/TeacherRoute");
const adminRouter = require('./routes/AdminRoute');
const classTimeTableRouter = require('./routes/classTimeTableRoute');
const teacherTimeTableRoute = require('./routes/teacherTimeTableRoute');
const videosRouter = require("./routes/VideosRoute");
const eventsRouter =  require("./routes/EventsRoute");
const gradeRouter = require("./routes/GradeRoute");

const app = express();

const imageFileStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'images');
    },
    filename: (req, file, cb) =>{
        cb(null, uuidv4()); 
    }
});

const imageFileFilter = (req, file, cb) => {
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ){
        cb(null, true);
    }else{
        cb(null, false)
    }
};

const uploadImage = multer({storage: imageFileStorage, fileFilter: imageFileFilter});

const videoFileStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'videos');
    },
    filename: (req, file, cb) =>{
        cb(null, uuidv4()); 
    }
});

const videoFileFilter = (req, file, cb) => {
    if(
        file.mimetype === 'video/mp4'
    ){
        cb(null, true);
    }else{
        cb(null, false)
    }
};

const uploadVideo = multer({storage: videoFileStorage, fileFilter: videoFileFilter});
// app.use(bodyParser.urlencoded({ extended : false}));  
app.use(bodyParser.json());
// app.use(multer({storage: imageFileStorage, fileFilter: imageFileFilter}).single('image'));
// app.use(multer({storage: videoFileStorage, fileFilter: videoFileFilter}).single('video'));

app.use(cors);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/videos', express.static(path.join(__dirname, 'videos')));


// app.get("/" , (req , res ) => {
//     res.send("home page")
// })

app.use("/api/v1/student" , studentRouter);
app.use("/api/v1/teacher" , teacherRouter)
app.use("/api/v1/grade", gradeRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/events", uploadImage.single('image'),eventsRouter);
app.use("/api/v1/videos", uploadVideo.single('video'), videosRouter);
app.use("/api/v1/classtimetable", classTimeTableRouter);
app.use("/api/v1/teachertimetable", teacherTimeTableRoute);




app.use(error);


mongoose.connect(process.env.DB_NAME)
.then(()=>{
    console.log('DB-connected');
    app.listen(process.env.PORT, () => {
        console.log("server is running");
    });
})
.catch(e => console.log(e.message))
