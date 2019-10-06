const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const path = require("path");
const DB = require("./database.js");
const mongoose = require("mongoose");
require("dotenv").config();

var kittySchema = new mongoose.Schema({
    name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);

const kitten1 = new Kitten({
    name: "catname1"
});

const DB_URL = `mongodb+srv://` + process.env.DB_USERNAME + `:` + process.env.DB_PASS + `@rakprog-aq8p2.mongodb.net/` + process.env.DB_NAME + `?retryWrites=true&w=majority`;

mongoose.connect(DB_URL)
    .then(() => {
        console.log("Database access success");
        kitten1.save(err => {
            if (err) {
                console.log("Error occured! ", err);
            } else {
                console.log("Successful save!");
            }
        })
    })
    .catch((err) => {
        console.log("error: ", err);
    });

app.get("/api/items", (req, res) => {
    res.json(DB.getItems());
});

app.get("/api/items/:itemId", (req, res) => {
    res.send(DB.getItem(req.params.itemId));
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

app.get('/items/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.use(express.static('dist'));

app.listen(PORT, () => {
  console.log("Server started", PORT);
  console.log('http://localhost:' + PORT +'');
});
