var express = require("express");
var router = express.Router();
var TaskModel = require("../models/task");
var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://COVID-Tracker:<Password1!>@cluster0.wzxhg.mongodb.net/<dbname>?retryWrites=true&w=majority");
var Schema = mongoose.Schema;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://COVID-Tracker:<Password1!>@cluster0.wzxhg.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

var TaskModel = mongoose.model("TaskModel", TaskModel);


router.get("/", function(req, res, next) {
     TaskModel.find().then(tasks => res.json(tasks));
 });

router.get("/get-data", function(req, res, next) {
  TaskModel.find()
  then(function(doc){
    res.render("index", {items:doc});
  });
});

router.post("/insert", function(req, res, next) {
  let newTask = new TaskModel();
  newTask._id = req.body._id,
  newTask.firstName = req.body.fristName;
  newTask.lastName = req.body.lastName;
  newTask.zipCode = req.body.zipCode;
  newTask.date = req.body.date;
  newTask.complete = req.body.complete;
  newTask.save().then(task => res.json(task)
  );

var data = new TaskModel(item);
data.save();
res.redirect('/');
});


router.delete("/:id", function(req, res, next) {
  TaskModel.findByIdAndRemove(req.params.id, (err, task) => {
    if (err) return res.status(400).send(err);
    res.send(task);
  });
});

router.put("/:id", function(req, res, next) {
  TaskModel.findByIdAndUpdate(
    req.params.id,
    {
      fristName: req.body.firstName,
      lastName : req.body.lastName,
      zipCode : req.body.zipCode,
      date : req.body.date,
      complete: req.body.complete
    },
    { new: true },
    (err, task) => {
      if (err) return res.status(400).send(err);
      res.send(task);
    }
  );
});

module.exports = router;
