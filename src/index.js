const homepage = require("./itemsList.js");
const itempage = require("./script.js");

console.log("index file");


window.addEventListener("load", () =>{
  homepage.setup();
  itempage.setup();
});
