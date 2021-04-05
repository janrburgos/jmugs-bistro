const addCartBtns = document.querySelectorAll(".add-cart");
const cart = document.querySelector(".cart-items");
const totalPriceDisplay = document.querySelector("#total-price-display");
const emptyCartMsg = document.querySelector(".empty-cart");
let priceArray = [];
let cartItemsArray = [];
let totalPrice = 0;
totalPriceDisplay.textContent = `${totalPrice}.00`;

// function to update total price
const addTotal = () => {
  totalPrice = 0;
  priceArray = cart.querySelectorAll(".cart-item-price");
  quantityArray = cart.querySelectorAll(".quantity-number");
  for (let i = 0; i < priceArray.length; i++) {
    totalPrice +=
      Number(priceArray[i].textContent) * Number(quantityArray[i].value);
  }
  totalPriceDisplay.textContent = `${totalPrice}.00`;
};

addCartBtns.forEach((item) => {
  let menuName = item.parentElement.children[0].textContent;
  let menuPrice = item.parentElement.children[1].textContent;
  // create cart items
  const addToCart = () => {
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    let cartItemDescription = document.createElement("div");
    cartItemDescription.classList.add("cart-item-description");
    cartItem.append(cartItemDescription);
    let cartItemName = document.createElement("p");
    cartItemName.classList.add("cart-item-name");
    let cartItemPrice = document.createElement("p");
    cartItemPrice.classList.add("cart-item-price");
    cartItemDescription.append(cartItemName);
    cartItemDescription.append(cartItemPrice);
    let cartQuantity = document.createElement("div");
    cartQuantity.classList.add("cart-quantity");
    cartItem.append(cartQuantity);
    let quantityName = document.createElement("p");
    quantityName.classList.add("quantity-name");
    quantityName.textContent = "Quantity:";
    let quantityButtons = document.createElement("div");
    quantityButtons.classList.add("quantity-buttons");
    cartQuantity.append(quantityName);
    cartQuantity.append(quantityButtons);
    let increaseButton = document.createElement("button");
    increaseButton.classList.add("increase");
    increaseButton.textContent = "+";
    let quantityNumber = document.createElement("input");
    quantityNumber.classList.add("quantity-number");
    quantityNumber.type = "number";
    quantityNumber.min = "1";
    quantityNumber.value = 1;
    let decreaseButton = document.createElement("button");
    decreaseButton.classList.add("decrease");
    decreaseButton.textContent = "-";
    let removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    removeButton.textContent = "x";
    quantityButtons.append(increaseButton);
    quantityButtons.append(quantityNumber);
    quantityButtons.append(decreaseButton);
    quantityButtons.append(removeButton);
    cartItemName.textContent = menuName;
    cartItemPrice.textContent = menuPrice;
    cart.append(cartItem);
    // buttons functionality
    quantityNumber.addEventListener("change", () => {
      if (quantityNumber.value < 1) {
        quantityNumber.value = 1;
      }
      addTotal();
    });
    increaseButton.addEventListener("click", () => {
      quantityNumber.value = Number(quantityNumber.value) + 1;
      addTotal();
    });
    decreaseButton.addEventListener("click", () => {
      if (quantityNumber.value > 1) {
        quantityNumber.value = Number(quantityNumber.value) - 1;
      }
      addTotal();
    });
    removeButton.addEventListener("click", () => {
      cartItem.remove();
      addTotal();
      let cartIndex = cartItemsArray.indexOf(cartItemName.textContent);
      cartItemsArray.splice(cartIndex, 1);
      // show "cart empty" message if cartItemsArray is empty
      if (cartItemsArray.length == 0) {
        emptyCartMsg.style.display = "";
      }
    });
    // push menu name to cartItemsArray;
    if (cartItemsArray.indexOf(cartItemName.textContent) == -1) {
      cartItemsArray.push(cartItemName.textContent);
    }
    // hide "cart empty" message if cartItemsArray is not empty
    if (cartItemsArray.length > 0) {
      emptyCartMsg.style.display = "none";
    }
  };
  //adding click events for add to cart buttons
  item.addEventListener("click", () => {
    if (cartItemsArray.indexOf(menuName) == -1) {
      addToCart();
    }
    addTotal();
  });
});
