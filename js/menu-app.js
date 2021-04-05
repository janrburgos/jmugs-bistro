const mainGroup = document.querySelector(".main-group").children[1];
const beverageGroup = document.querySelector(".beverage-group").children[1];
const pizzaGroup = document.querySelector(".pizza-group").children[1];
const searchBar = document.querySelector("#search");
let searchValue;
let itemName;

// create menu items
menuList.forEach((item) => {
  let menuCard = document.createElement("div");
  menuCard.classList.add("menu-card");
  let imageWrapper = document.createElement("div");
  imageWrapper.classList.add("image-wrapper");
  let image = document.createElement("img");
  image.src = item.src;
  image.alt = item.name;
  image.loading = "lazy";
  imageWrapper.append(image);
  menuCard.append(imageWrapper);
  let description = document.createElement("div");
  description.classList.add("description");
  let menuName = document.createElement("div");
  menuName.classList.add("menu-name");
  menuName.textContent = item.name;
  let price = document.createElement("div");
  price.classList.add("price");
  price.textContent = item.price;
  let addCart = document.createElement("button");
  addCart.classList.add("add-cart");
  addCart.textContent = "Add to Cart";
  description.append(menuName);
  description.append(price);
  description.append(addCart);
  menuCard.append(description);
  if (item.category == "main") {
    mainGroup.append(menuCard);
  } else if (item.category == "beverage") {
    beverageGroup.append(menuCard);
  } else if (item.category == "pizza") {
    pizzaGroup.append(menuCard);
  }
  // for adding zoomed image overlay when an image is clicked
  image.addEventListener("click", () => {
    let overlayBackground = document.createElement("div");
    overlayBackground.style.backgroundColor = "rgba(0,0,0,0.5)";
    overlayBackground.style.zIndex = "1000";
    overlayBackground.style.display = "flex";
    overlayBackground.style.justifyContent = "center";
    overlayBackground.style.alignItems = "center";
    overlayBackground.style.position = "fixed";
    overlayBackground.style.top = "0";
    overlayBackground.style.left = "0";
    overlayBackground.style.width = "100%";
    overlayBackground.style.height = "100%";
    let body = document.querySelector("body");
    body.append(overlayBackground);
    let zoomedImage = document.createElement("img");
    zoomedImage.src = image.src;
    zoomedImage.alt = image.alt;
    zoomedImage.style.height = "80%";
    overlayBackground.append(zoomedImage);
    overlayBackground.addEventListener("click", () => {
      overlayBackground.remove();
    });
  });
});

// change menu items into an array
const mainGroupArray = mainGroup.querySelectorAll(".menu-card");
const beverageGroupArray = beverageGroup.querySelectorAll(".menu-card");
const pizzaGroupArray = pizzaGroup.querySelectorAll(".menu-card");

// search bar filter function
const searchFilter = () => {
  searchValue = searchBar.value.trim().toLowerCase();
  // main group loop
  mainGroupArray.forEach((item) => {
    itemName = item.querySelector(".menu-name").textContent;
    if (itemName.toLowerCase().indexOf(searchValue) > -1) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
  // beverage group loop
  beverageGroupArray.forEach((item) => {
    itemName = item.querySelector(".menu-name").textContent;
    if (itemName.toLowerCase().indexOf(searchValue) > -1) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
  // pizza group loop
  pizzaGroupArray.forEach((item) => {
    itemName = item.querySelector(".menu-name").textContent;
    if (itemName.toLowerCase().indexOf(searchValue) > -1) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
};
searchBar.addEventListener("keyup", searchFilter);

window.addEventListener("load", () => {
  searchBar.focus();
});
