itemContainerClass = "product";
imageClass = "p-image";
const items = document.getElementsByClassName(itemContainerClass);

Array.from(items).forEach(item =>{
  const imgs = item.getElementsByClassName(imageClass).getElementsByTagName("*")[1];
  if(imgs.length === 0){return;}

  const img = imgs[0];
  const src = img.dataset.src;
  console.log(img);
  console.log("src", src);

});
