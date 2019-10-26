const express = require("express");
const router = express.Router();
const userController = require("./user.controller.js");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");


const validationMiddleware = (req, res, next) =>{
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }
    next();
};

router.post("/verify",  (req, res) =>{
    const bearerHeader = req.headers["authorization"];
    if(!bearerHeader) return res.send(400);
    const token = bearerHeader.split(" ")[1];
    if(!token) return res.send(400);
    jwt.verify( token, process.env.JWT_KEY, (err, decoded) => {
        if(err){
            res.status(401).send(err);
        } 
        res.status(200).send(decoded);
    });
});



//request user [login]
router.post("/login", userController.login);

//post a user [create new user]
router.post("/signup", 
[
    check("email").isEmail()
    .withMessage("Email is not in correct form")
    ,check("password")
    .exists()
    .withMessage("Password should not be empty, must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number")
    .isLength({ min: 8 })
    .withMessage(" Must contain minimum eight characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .withMessage("Must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number")
    .not().isIn(["Parool123", "Password123", "123456aA"])
    .withMessage("Do not use a common word as the password")
],
validationMiddleware,
userController.signup);



module.exports = router;