const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const requirelogin = require('../middleware/requireLogin');
const Post =  mongoose.model("Post")

router.post("/tracker", requirelogin, (req, res)=>{
    const markers = req.body;
    const post = new Post({
        markers,
        postedBy:req.user
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

router.get('/mypost', requirelogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("PostedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router