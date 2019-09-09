
/*jshint esversion: 6 */


const x = window.location;
const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get("title");
const cost = urlParams.get("cost");
const src = urlParams.get("src");

console.log(title, cost, src);
alert("Title: " + title + " Cost: " + cost + " src= " + src);

if ( window.location.pathname != '/index.html' ){
    // Index (home) page
    document.body.onload = addElement();
    console.log(window.location.pathname);
}



function addElement(){
  let containerDiv = document.createElement('div');
  let titleDiv = document.createElement('div');
  let infoDiv = document.createElement('div');
  let priceDiv = document.createElement('div');
  let pic = document.createElement("IMG");

  containerDiv.setAttribute("id", "Content");
  pic.setAttribute("src", src);
  pic.setAttribute("width", "600");
  pic.setAttribute("height", "400");
  titleDiv.setAttribute("class","productTitle");
  priceDiv.setAttribute("class","productPrice");
  infoDiv.setAttribute("class","specs");

  containerDiv.appendChild(pic);
  titleDiv.innerHTML = title;
  priceDiv.innerHTML = cost;
  infoDiv.innerHTML = "info";
  containerDiv.appendChild(titleDiv);
  containerDiv.appendChild(infoDiv);
  containerDiv.appendChild(priceDiv);

  let currentDiv = document.getElementById("content");

  document.body.insertBefore(containerDiv, currentDiv);
}
