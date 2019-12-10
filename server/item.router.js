const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Item = require("./item.model.js");


//fetch
router.get("/", (req, res) => {
    Item.find({}, function (err, items) {
        if (err) {
            console.log("Error", err);
            res.send(500);
            return;
        }
        res.send(items);
    });
    //res.json(DB.getItems());
});

//Delete
router.delete("/:itemId", (req, res) => {
    Item.deleteOne({"_id": mongoose.Types.ObjectId(req.params.itemId)}, (err) => {
        if (err) {
            return console.log("Error", err);
            res.send(500);
        }
        console.log("Deleted successfully!");
        res.send(204);
    });
});

//Return an item
router.get("/:itemId", (req, res) => {
    Item.findById(req.params.itemId, function (err, item) {
        if (err) {
            console.log("error: ", err);
            return res.send(err);
        }
        res.send(item);
    });
});

module.exports = router;