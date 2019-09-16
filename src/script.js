/*jshint esversion: 6 */

function setup(){
  const x = window.location;
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get("title");
  const cost = urlParams.get("cost");
  const src = urlParams.get("src");

  function addElement(){
    let containerDiv = document.createElement('div');
    let contentDiv = document.createElement('div');
    let titleDiv = document.createElement('div');
    let infoDiv = document.createElement('div');
    let priceDiv = document.createElement('div');
    let pic = document.createElement("IMG");

    containerDiv.setAttribute("id", "item-list");
    containerDiv.setAttribute("class", "product");
    contentDiv.setAttribute("class", "content");
    pic.setAttribute("src", src);
    pic.setAttribute("class", "img");
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
    contentDiv.appendChild(containerDiv);

    let currentDiv = document.getElementById("footer");

    document.body.insertBefore(contentDiv, currentDiv);
  }

  addElement();
}

module.exports = {
  setup,
};
