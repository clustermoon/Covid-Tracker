const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
    },
    username: {
        type: String, 
    },
    markerPositions: [Array]

});

mongoose.model("User", userSchema);