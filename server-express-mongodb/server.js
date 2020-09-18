var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const express = require("express"),
  app = express(),
  port = process.env.PORT || 3001,
  cors = require("cors");

//----------------------------------------------------------------------------------

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.listen(port, () => console.log("Backend server live on " + port));

app.get("/", (req, res) => {
  res.send({ message: "We did it!" });
});

//----------------------------------------------------------------------------------

//added for front end management- MC 8-29
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//----------------------------------------------------------------------------------


var mongoDB = "mongodb+srv://tildr_user:fnXixKRfXDO0D3lI@cluster0-8qpvp.mongodb.net/tildr";
mongoose.connect(mongoDB, { useNewUrlParser: true });
//mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("connected", () => console.log(`Mongoose connection open to ${mongoDB}`));
db.on("disconnected", () => console.log("Mongoose connection disconnected"));
db.on("error", console.error.bind(console, "Mongoose connection error:"));