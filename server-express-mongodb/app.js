var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");
const port = process.env.PORT || 3001;

//var trackerRouter = require("./routes/tracker");
//var tasksRouter = require("./routes/tasks");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.listen(port, function() {
    console.log("Runnning on " + port);
});

//app.use("/tasks", tasksRouter);
//app.use("/tracker", trackerRouter);

//added for front end management- MC 8-29
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//var mongoDB = "mongodb://127.0.0.1/database";
var mongoDB = "mongodb+srv://tildr_user:fnXixKRfXDO0D3lI@cluster0-8qpvp.mongodb.net/tildr";
mongoose.connect(mongoDB, { useNewUrlParser: true });
//mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("connected", () => console.log(`Mongoose connection open to ${mongoDB}`));
db.on("disconnected", () => console.log("Mongoose connection disconnected"));
db.on("error", console.error.bind(console, "Mongoose connection error:"));

module.exports = app;
