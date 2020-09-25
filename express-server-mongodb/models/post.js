const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    markerPositions: [Array],
    postedBy : {
        type: ObjectId,
        ref: "User"
    }
});

mongoose.model("Post", postSchema);