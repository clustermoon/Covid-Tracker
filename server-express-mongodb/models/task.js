"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  zipCode: { type: String, required: true },
  date:{ type: String, required: true },
  complete: { type: Boolean, required: true }
}, {collection: 'task-model'});

// Duplicate the ID field.
TaskSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
TaskSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("Task", TaskSchema);
