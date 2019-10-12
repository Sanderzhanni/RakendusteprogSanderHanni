const express = require("express");
const router = express.Router();
const User = require("./user.model.js");




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
router.post("/api/users/signup", (req, res) => {
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