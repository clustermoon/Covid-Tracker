const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const requirelogin = require('../middleware/requireLogin');
const Post =  mongoose.model("Post")

router.post("/tracker", requirelogin, (req, res)=>{
    const markerPositions = req.body;
    const post = new Post({
        markerPositions
    })
    post.save().then(result=>{
        console.log("success")
        res.json({post:result})
    }).catch(err=>{
        console.log(err)
    })
})

router.get('/allpost', requirelogin, (req, res)=>{
    Post.find()
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err);
    })
})

module.exports = router