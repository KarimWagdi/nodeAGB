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
const videosRouter = require("./routes/VideosRoute");
const eventsRouter =  require("./routes/EventsRoute");
const gradeRouter = require("./routes/GradeRoute");

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'images');
    },
    filename: (req, file, cb) =>{
        cb(null, uuidv4()); 
    }
});

const fileFilter = (req, file, cb) => {
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

// app.use(bodyParser.urlencoded({ extended : false}));  
app.use(bodyParser.json());
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));
app.use(cors);
app.use('/images', express.static(path.join(__dirname, 'images')));

// app.get("/" , (req , res ) => {
//     res.send("home page")
// })

app.use("/api/v1/student" , studentRouter);
app.use("/api/v1/teacher" , teacherRouter)
app.use("/api/v1/grade", gradeRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/events", eventsRouter);


app.use(error);


mongoose.connect(process.env.DB_NAME)
.then(()=>{
    console.log('DB-connected');
    app.listen(process.env.PORT, () => {
        console.log("server is running");
    });
})
.catch(e => console.log(e.message))
