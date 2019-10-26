const express = require("express");
const router = express.Router();
const User = require("./user.model.js");
const { check, validationResult } = require('express-validator');



//fetch all users
router.get("/api/users", (req, res) => {
    User.find({}, (err, docs) =>{
        if(err) return handleError(err, res);
        res.status(200).json(docs);
    });

});

//request user [login]
router.post("/api/users/login", (req, res) => {

    User.login(req.body)
    .then(user =>{
        res.json(user);
    })
    .catch(err =>{
        return handleError(err, res);
    });

//    User.findOne({email: req.body.email}, (err, doc)=>{
//     if(err) return handleError(err, res);
//     res.send(doc);
//    });
});

//post a user [create new user]
router.post("/api/users/signup", 
[
check('email').isEmail()
.withMessage("Email is not in correct form")
,check('password')
.exists()
.withMessage('Password should not be empty, must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number')
.isLength({ min: 8 })
.withMessage(" Must contain minimum eight characters")
.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
.withMessage("Must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number")
.not().isIn(["Parool123", "Password123", "123456aA"])
.withMessage("Do not use a common word as the password")
],
(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    User.signup(req.body)
    .then(user =>{
        res.status(200).json(user);
    })
    .catch(err =>{
        return handleError(err, res);
    });
});

//delete all users
router.delete("/api/users", (req, res) => {
    User.deleteMany({}, (err, docs) => {
    if(err) return handleError(err, res);
    console.log("success delete many users", docs);
    res.send(204);
    });
});


function handleError(err, res){
    console.log("Error", err);
    res.send(500);

}


module.exports = router;