const mongoose = require("mongoose");
const Item = require("./item.model.js");
const DB = require("./database.js");

const DB_URL = `mongodb+srv://` + process.env.DB_USERNAME + `:` + process.env.DB_PASS + `@rakprog-aq8p2.mongodb.net/` + process.env.DB_NAME + `?retryWrites=true&w=majority`;




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
