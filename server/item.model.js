const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    imgSrc: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true},
    created_at: { type: Date, default: Date.now },
});

const Item = mongoose.model("item", itemSchema);

module.exports = Item;