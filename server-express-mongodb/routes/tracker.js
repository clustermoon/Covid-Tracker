var express = require("express");
var router = express.Router();
var TaskModel = require("../models/task");
var mongoose = require('mongoose');

//-------------------------------------------------------------------

var TaskModel = mongoose.model("TaskModel", TaskSchema);

router.get("/", function(req, res, next) {
  TaskModel.find().then(tasks => res.json(tasks));
});

router.get("/get-data", function(req, res, next) {
  TaskModel.find()
  then(function(doc){
    res.render("index", {items:doc});
  });
});

//-------------------------------------------------------------------

var mongoDB = "mongodb+srv://COVID-Tracker:<Password1!>@cluster0.wzxhg.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongoDB connection error:'));

//-------------------------------------------------------------------

module.exports = router;