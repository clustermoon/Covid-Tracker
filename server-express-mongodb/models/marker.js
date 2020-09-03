"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MarkerSchema = new Schema({
  lat: { type: String, required: true },
  lng: { type: Boolean, required: true },
  time: {type: Date, required: true }
});

// Duplicate the ID field.
MarkerSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
MarkerSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("Marker", MarkerSchema);
