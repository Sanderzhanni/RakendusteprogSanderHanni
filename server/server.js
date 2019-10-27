const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const path = require("path");
const mongoose = require("mongoose");
const authRouter = require("./auth.router.js");
const itemRouter = require("./item.router.js");
const userRouter = require("./user.router.js");
const Item = require("./item.model.js");
const DB = require("./database.js");
const bodyParser = require("body-parser");

require("dotenv").config();

/** Development environment. In Heroku we don't use .env file */
if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
  }

const DB_URL = `mongodb+srv://` + process.env.DB_USERNAME + `:` + process.env.DB_PASS + `@rakprog-aq8p2.mongodb.net/` + process.env.DB_NAME + `?retryWrites=true&w=majority`;

app.use(bodyParser.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", itemRouter);
app.use("/api/v1/users", userRouter);

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
        //deleteItems();
        migrate();
        listen();
    })
    .catch((err) => {
        console.log("error: ", err);
    });

    //migrate function
    function migrate() {
        console.log("migrate functionality");

        //item count
        Item.count({}, (err, countNr) => {
            if (err) {
                console.log("Error", err);
                return;
            }
            //console.log("Item count: ", countNr);
            if(countNr === 0){
                saveAllItems();
            }
        });
    }

    //saves items

    function saveAllItems(){
        const items = DB.getItems();

        items.forEach(item => {
            const document = new Item(item);
            document.save((err) => {
                if (err) {
                    console.log("Error", err);
                    return;
                }
                console.log("Saved succesfully!");
            });
        });
    }
   

    //delete all items

function deleteItems(){
    Item.deleteMany({}, (err, doc) => {
        if (err) {
            console.log("Error", err);
            return;
        }
        console.log("Deleted successfully!");
        console.log(doc);
    });
}
