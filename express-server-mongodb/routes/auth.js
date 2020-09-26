const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');


/*
router.post("/tracker", requirelogin, (req, res)=>{
    const markerPositions = req.body;
    const user = new User({
        markerPositions
    })
    user.save().then(result=>{
        console.log("success")
        res.json({post:result})
    }).catch(err=>{
        console.log(err)
    })
})
*/

router.post('/signup', (req, res)=>{
    const {firstName, lastName, username, password} = req.body;
    if(!firstName || !lastName || !username || !password){
        res.status(422).json({error:"Please add all the fields"});
    };

    User.findOne({username:username})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exists with that username"});
        };

        bycrypt.hash(password, 12)
        .then(hashedpassword=>{
            const user = new User({
                username,
                password:hashedpassword,
                firstName,
                lastName
            });
    
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"});
              })
            .catch(err=>{
                console.log(err);
            });
        })
    })
    .catch(err=>{
        console.log(err);
    });
});

router.post('/login',(req, res)=>{
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(422).json({error:"Please add username or password"});
    };
    User.findOne({username:username})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Wrong Username or Password"});
        }
        bycrypt.compare(password, savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                //res.json({message:"successfully signed in"})
                const token = jwt.sign({_id:savedUser._id}, JWT_SECRET);
                const {_id, username} = savedUser;
                res.json({token, user:{_id, username}});

            }else{
                return res.status(422).json({error:"Invalid Username Password"})
            }
        })
        .catch(err=>{
            console.log(err);
        });
    });
}) 

module.exports = router;