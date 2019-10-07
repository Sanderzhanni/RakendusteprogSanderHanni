const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const itemRouter = require("./item.router.js");

const DB_URL = `mongodb+srv://` + process.env.DB_USERNAME + `:` + process.env.DB_PASS + `@rakprog-aq8p2.mongodb.net/` + process.env.DB_NAME + `?retryWrites=true&w=majority`;

app.use(itemRouter);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

app.get('/items/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.use(express.static('dist'));



function listen() {
    app.listen(PORT, () => {
        console.log("Server started", PORT);
        console.log('http://localhost:' + PORT + '');
    });
}

mongoose.connect(DB_URL)
    .then(() => {
        console.log("Database access success!");
        listen();
    })
    .catch((err) => {
        console.log("error: ", err);
    });
