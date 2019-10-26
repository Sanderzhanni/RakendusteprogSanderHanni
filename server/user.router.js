const express = require("express");
const router = express.Router();
const User = require("./user.model.js");

//fetch all users
router.get("/users", (req, res) => {
    User.find({}, (err, docs) =>{
        if(err) return handleError(err, res);
        res.status(200).json(docs);
    });

});

//delete all users
router.delete("/users", (req, res) => {
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