const express = require("express");
const router = express.Router();
const DB = require("./database.js");
const mongoose = require("mongoose");


const itemSchema = new mongoose.Schema({
    imgSrc: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    created_at: {type:Date, default: Date.now},
});

const Item = mongoose.model("item", itemSchema);

router.post("/api/items", (req, res) => {
    const props = {
        imgSrc: "google.com",
        title: "piano2",
        price: 200,
        category: "pianos",
    };
    const item1 = new Item(props);
    item1.save(err => {
        if (err) {
            console.log("Error", err);
            res.send(500);
            return;
        }
        console.log("Saved succesfully!");
        res.send(201);
    });

});

router.get("/api/items", (req, res) => {
    Item.find({}, function (err, items){
        if(err) {
            console.log("Error", err);
            res.send(500);
            return;
        }
        res.send(items);
    });
    //res.json(DB.getItems());
});

router.get("/api/items/:itemId", (req, res) => {
    Item.findById(req.params.itemId, function (err, item) {
        if (err) {
            console.log("error: ", err);
            res.send(err);
        }
        res.send(item);
    });
    //res.send(DB.getItem(req.params.itemId));
});

module.exports = router;