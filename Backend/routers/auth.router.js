const express = require("express");
const router = express.Router();
const {v4:uuidv4} = require("uuid");
const User = require("../models/user");
const token = require("../services/token.service");



//Register işlemi
router.post("/register", async (req,res) =>{    
    const newUser = new User(req.body);
    newUser._id = uuidv4();

    try {
        const result = await newUser.save();
        const payload = {};
        res.json({token: token(payload), user: result});
    } catch (error) {
        if(error.code == "11000"){
            res.status(400).json({message: "Bu kullanıcı adı daha önce alınmış!"})
        }else{
            res.status(400).json({message: error.message });
        }
        
    }
});

//Login işlemi
router.post("/login", async (req, res) =>{    
    try {
        const {userName, password} = req.body;
        var result = await User.findOne({userName: userName, password: password});
        
        if(result != null){
            const payload = {};
            res.json({token: token(payload), user: result});
        }else{
            res.status(400).json({message: "Kullanıcı adı ya da şifre yanlış!"});            
        }

    } catch (error) {
        res.status(400).json({message: error.message });
    }
});

module.exports = router;