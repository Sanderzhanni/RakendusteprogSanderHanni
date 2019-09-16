/*jshint esversion: 6 */

function createItemElement(item){
  const anchor = document.createElement("a");
  anchor.href = "product.html?title="+ item.title+"&cost="+item.price+"&src="+item.imgSrc+"";

  const itemContainer = document.createElement("div");
  itemContainer.className = "product";

  const imgElement = document.createElement("img");
  imgElement.className = "img";
  imgElement.src = item.imgSrc;

  const titleElement = document.createElement("div");
  titleElement.className = "productTitle";
  titleElement.textContent = item.title;

  const priceElement = document.createElement("div");
  priceElement.innerText = item.price;
  priceElement.className = "productPrice";

  anchor.append(itemContainer);
  itemContainer.append(imgElement);
  itemContainer.append(titleElement);
  itemContainer.append(priceElement);

  return anchor;
}

module.exports = {
  createItemElement,
};
