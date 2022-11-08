const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const studentRouter = require("./route/StudentRoute");
const teacherRouter = require("./route/TeacherRoute");
const managerRouter = require("./route/ManagerRoute");
const videosRouter = require("./route/VideosRoute");
const eventsRouter =  require("./route/EventsRoute")

const app = express();

app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json())
app.use(cors());

app.get("/" , (req , res ) => {
    res.send("home page")
})

app.use("/api/v1" , studentRouter)

app.listen(3000 , () => {
    console.log("server is running");
});