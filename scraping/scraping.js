/*jshint esversion: 6 */

const itemContainerClass = "product-small box";
const items = document.getElementsByClassName(itemContainerClass);
const titleClass = "name";
const priceClass = "woocommerce-Price-amount";
const categoryClass = "shop-page-title is-xlarge";
const arr = [];

Array.from(items).forEach(item => {

    const imgs = item.querySelectorAll("img");
    const titles = item.querySelectorAll("." + titleClass + " > a"); // Every a element with a parent of titleCLass
    const prices = item.querySelectorAll("." + priceClass);

    if (imgs.length === 0) {
        return;
    }

    const img = imgs[0];
    const src = img.src;
    const title = titles[0].innerHTML;
    const price = prices[0].childNodes[1].textContent;


    if (!src) return; // skip

    arr.push({
        imgSrc: src,
        title,
        price,
        category: document.querySelector("h1").innerHTML
    });


});//ends item Array function

console.log(JSON.stringify(arr));
