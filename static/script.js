
const x = window.location;
const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get("title");
const cost = urlParams.get("cost");
const src = urlParams.get("src");

console.log(title, cost, src);
alert("Title: " + title + " Cost: " + cost + " src= " + src);
