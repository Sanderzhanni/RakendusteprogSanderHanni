const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
const authRouter = require("./auth.router.js");
const itemRouter = require("./item.router.js");
const userRouter = require("./user.router.js");
const bodyParser = require("body-parser");
const DB = require("./DB.connection.js");

require("dotenv").config();

/** Development environment. In Heroku we don't use .env file */
if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
  }

app.use(bodyParser.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", itemRouter);
app.use("/api/v1/users", userRouter);



/** For images and bundle.js */
app.use("/static", express.static("dist/static"));

/** For index.html */
app.use("/*", express.static("dist"));

DB.connect()
.then(()=>{
    listen();
})
.catch((err)=>{
    console.log("Something went wrong", err);
});


function listen() {
    app.listen(PORT, () => {
        console.log("Server started", PORT);
        console.log('http://localhost:' + PORT + '');
    });
}

