const express = require("express");
const app = express();
const apiRouter = require("./apiRouter.js");
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const DB = require("./DB.connection.js");
//const swaggerUi = require("swagger-ui-express");
//const swaggerDocument = require("../default.yaml");

require("dotenv").config();

/** Development environment. In Heroku we don't use .env file */
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
  }

app.use(bodyParser.json());
app.use(apiRouter);
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
        console.log("http://localhost:" + PORT + "");
    });
}

