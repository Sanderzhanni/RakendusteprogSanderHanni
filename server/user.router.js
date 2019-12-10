const express = require("express");
const router = express.Router();
const User = require("./user.model.js");
const Item = require("./item.model.js");
const {authMiddleware} = require("./middlewares");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Payment = require("./payments.model");

router.param("userId", (req, res, next, userId) => {
    User.findById(userId, (err, user) => {
        if (err || !user) return res.status(500).send("user params error");
        req.user = user;
        next();
    });
});

router.param("itemId", (req, res, next, itemId) => {
    Item.findById(itemId, (err, item) => {
        if (err || !item) return res.status(500).send("item params error");
        req.item = item;
        next();
    });
});

router.post("/add", (req, res) =>{
    const item = new Item(req.body);
    item.save(err=>{
        if(err) return res.send(500);
        res.send(200);
    });
});

//returns user object
router.get("/:userId", authMiddleware, (req, res) => {
    res.send(req.user);
});

// add item to cart
router.put("/:userId/cart/:itemId", (req, res) => {
    req.user.cart.push(req.item._id.toString());
    req.user.save((err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("error saving item to cart");
        }
        res.send(200);
    });
});
// add item to liked
router.put("/:userId/liked/:itemId", (req, res) => {
    req.user.liked.push(req.item._id.toString());
    req.user.save((err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("error saving item to liked");
        }
        res.send(200);
    });
});

// remove item from cart
router.delete("/:userId/cart/:itemId", (req, res) => {
    const index = req.user.cart.findIndex(itemId => itemId === req.item._id.toString());
    req.user.cart.splice(index, 1);
    req.user.save((err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("error saving item to cart");
        }
        res.send(200);
    });
});

// remove item from liked
router.delete("/:userId/liked/:itemId", (req, res) => {
    const index = req.user.liked.findIndex(itemId => itemId === req.item._id.toString());
    req.user.liked.splice(index, 1);
    req.user.save((err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("error deleting item from liked");
        }
        res.send(200);
    });
});


//fetch all users
router.get("/", (req, res) => {
    User.find({}, (err, docs) => {
        if (err) return handleError(err, res);
        res.status(200).json(docs);
    });

});

router.post("/", (req, res) => {
    User.signup(req.body)
        .then( user =>{
            res.status(200).json(user);
        })
        .catch( err =>{
            console.log("err", err);
            res.send(500);
        });
});

//delete all users
router.delete("/", (req, res) => {
    User.deleteMany({}, (err, docs) => {
        if (err) return handleError(err, res);
        console.log("success delete many users", docs);
        res.send(204);
    });
});

// send card token to backend
router.post("/:userId/checkout", authMiddleware, async (req, res) =>{
    const {error, amount} = await req.user.getCartAmount();
    if(error) return res.send(500);
    req.user.createPayment(amount)
        .then(() => {
            return req.user.emptyCart();
        })
        .then(() => {
            return stripe.charges.create({
                amount: amount *100,
                currency: "eur",
                source: req.body.id,
            });
        })
        .then((stripeResponse) =>{
            console.log(stripeResponse);
        })
        .catch((err) =>{
            console.log("error", err);
        });
    console.log({error, amount});

   res.sendStatus(200);
});

//get payments
router.get("/:userId/payments", authMiddleware, (req, res) =>{
    Payment.getUserPayments(req.user._id)
        .then((docs) =>{
            return res.send(docs);
        })
        .catch((err) =>{
          console.log(err);
          res.sendStatus(500);
        });
});


function handleError(err, res) {
    console.log("Error", err);
    res.send(500);

}


module.exports = router;