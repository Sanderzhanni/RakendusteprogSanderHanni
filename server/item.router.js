const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Item = require("./item.model.js");


//fetch
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


//Delete
router.delete("/api/items/:itemId", (req, res) => {
    Item.deleteOne({ "_id": mongoose.Types.ObjectId(req.params.itemId) }, (err) => {
        if (err) {
            return console.log("Error", err);
            res.send(500);
        }
        console.log("Deleted successfully!");
        res.send(204);
    });
});

//fetch item id
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