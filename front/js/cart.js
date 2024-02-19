// Retrieve cart data from local storage or initialize an empty cart
let storedCart = localStorage.getItem('cart');
let cart;

if (storedCart) {
  cart = JSON.parse(storedCart); // Parse the stored cart data back into an array
} else {
  cart = []; // Initialize an empty array if no cart data is found in local storage
}


const cartAndFormContainer = document.querySelector("#cartAndFormContainer");

let cartSection = document.createElement('section');
cartSection.classList.add('cart');
cartAndFormContainer.appendChild(cartSection);

let totalPrice = 0;
let totalQuantity = 0;

// Loop through each product in the cart to display them
cart.forEach((product) => {
  // Create an article for each product and set data attributes for id and color
  let productArticle = document.createElement('article');
  productArticle.classList.add('cart__item');
  productArticle.dataset.id = product.id;
  productArticle.dataset.color = product.color;

  // Create and add the product image
  let productImgDiv = document.createElement('div');
  productImgDiv.classList.add('cart__item__img');
  let productImg = document.createElement('img');
  productImg.src = product.imgURL;
  productImg.src = product.imgURL.replace('/images/', '/images/mini/');
  productImg.alt = product.title;
  productImgDiv.appendChild(productImg);

  // Create the product description section
  let productContentDiv = document.createElement('div');
  productContentDiv.classList.add('cart__item__content');

  let productDescriptionDiv = document.createElement('div');
  productDescriptionDiv.classList.add('cart__item__content__description');
  let productTitle = document.createElement('h2');
  productTitle.textContent = product.title;
  let productColor = document.createElement('p');
  productColor.textContent = product.color;
  let productPrice = document.createElement('p');
  productPrice.textContent = `${product.price} €`;
  productDescriptionDiv.append(productTitle, productColor, productPrice);

  // Create the product settings (quantity and delete option)
  let productSettingsDiv = document.createElement('div');
  productSettingsDiv.classList.add('cart__item__content__settings');

  // Create the quantity adjustment section
  let productQuantityDiv = document.createElement('div');
  productQuantityDiv.classList.add('cart__item__content__settings__quantity');
  let quantityText = document.createElement('p');
  quantityText.textContent = `Qté : `;
  let quantityContainer = document.createElement('div');
  quantityContainer.classList.add('quantity-container');
  let quantityInput = document.createElement('input');
  quantityInput.type = "number";
  quantityInput.name = "itemQuantity";
  quantityInput.min = "1";
  quantityInput.max = "100";
  quantityInput.value = Number(product.count);
  quantityInput.classList.add('itemQuantity');
  quantityContainer.appendChild(quantityInput);
  productQuantityDiv.append(quantityText, quantityContainer);

  // Create the delete option
  let deleteDiv = document.createElement('div');
  deleteDiv.classList.add('cart__item__content__settings__delete');
  let deleteText = document.createElement('p');
  deleteText.textContent = "Supprimer";
  deleteText.classList.add('deleteItem');
  deleteDiv.appendChild(deleteText);

  // Append the settings to the product content div
  productSettingsDiv.append(productQuantityDiv, deleteDiv);

  productContentDiv.append(productDescriptionDiv, productSettingsDiv);

  productArticle.append(productImgDiv, productContentDiv);

  cartSection.appendChild(productArticle);

  // Update the total price and quantity based on the current product
  totalPrice += parseFloat(product.price) * product.count;
  totalQuantity += product.count;
});

// Update the total quantity and price displayed in the DOM
const totalQuantityElement = document.querySelector("#totalQuantity");
const totalPriceElement = document.querySelector("#totalPrice");

totalQuantityElement.textContent = totalQuantity;
totalPriceElement.textContent = totalPrice.toFixed(2);

// Function to delete an item from the cart
function deleteCartItem(event) {
  if (event.target.classList.contains('deleteItem')) {
    const cartItem = event.target.closest('.cart__item');
    const itemId = cartItem.dataset.id;
    const itemColor = cartItem.dataset.color;

    // Remove the item from the cart array
    cart = cart.filter(item => !(item.id === itemId && item.color === itemColor));
    // Save the updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Remove the item from the HTML
    cartItem.remove();
    calculateTotal();
  }
}

// Function to handle quantity modification
function modifyQuantity(event) {
  if (event.target.classList.contains('quantity-increment')) {
    const quantityInput = event.target.parentElement.querySelector('.itemQuantity');
    const itemId = event.target.closest('.cart__item').dataset.id;
    const itemColor = event.target.closest('.cart__item').dataset.color;

    // Find the item index in the cart array
    const itemIndex = cart.findIndex(item => item.id === itemId && item.color === itemColor);

    if (itemIndex !== -1) {
      // Increase the item count by 1
      cart[itemIndex].count++;
      quantityInput.value = cart[itemIndex].count;

      // Save the updated cart to local storage
      localStorage.setItem('cart', JSON.stringify(cart));

      // Recalculate the total price and quantity
      calculateTotal();
    }
  } else if (event.target.classList.contains('quantity-decrement')) {
    const quantityInput = event.target.parentElement.querySelector('.itemQuantity');
    const itemId = event.target.closest('.cart__item').dataset.id;
    const itemColor = event.target.closest('.cart__item').dataset.color;

    // Find the item index in the cart array
    const itemIndex = cart.findIndex(item => item.id === itemId && item.color === itemColor);

    if (itemIndex !== -1) {
      // Decrease the item count by 1
      cart[itemIndex].count--;
      // If count becomes 0, remove the item from the cart
      if (cart[itemIndex].count === 0) {
        cart.splice(itemIndex, 1);
        event.target.closest('.cart__item').remove();
      } else {
        quantityInput.value = cart[itemIndex].count;
      }
      // Save the updated cart to local storage
      localStorage.setItem('cart', JSON.stringify(cart));
      calculateTotal();
    }
  }
}
function updateCartItemQuantity(event) {
  if (event.target.classList.contains('itemQuantity')) {
    const quantityInput = event.target;
    const itemId = event.target.closest('.cart__item').dataset.id;
    const itemColor = event.target.closest('.cart__item').dataset.color;

    // Retrieve and parse the new quantity from input
    let newQuantity = parseInt(quantityInput.value);

    // Delay the check to ensure it happens after the input is fully entered
    setTimeout(() => {
      // Check if the new quantity is outside the 1 to 100 range
      if (newQuantity < 1 || newQuantity > 100 || isNaN(newQuantity)) {
        alert("Please enter a quantity between 1 and 100."); 
        newQuantity = newQuantity < 1 || isNaN(newQuantity) ? 1 : 100; 
        quantityInput.value = newQuantity; 
      }

      // Proceed with updating the cart
      const itemIndex = cart.findIndex(item => item.id === itemId && item.color === itemColor);
      if (itemIndex !== -1) {
        cart[itemIndex].count = newQuantity; 
        localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart
        calculateTotal(); // Recalculate totals
      }
    }, 0);
  }
}

// Listen for the change event on quantity inputs
document.querySelectorAll('.itemQuantity').forEach(input => {
  input.addEventListener('change', updateCartItemQuantity);
});

function calculateTotal() {
  totalPrice = 0;
  totalQuantity = 0;
  cart.forEach((product) => {
    totalPrice += parseFloat(product.price) * product.count;
    totalQuantity += product.count;
  });
  totalQuantityElement.textContent = totalQuantity;
  totalPriceElement.textContent = totalPrice.toFixed(2);
}


// Add event listeners for deleting items and modifying quantity
cartSection.addEventListener('click', deleteCartItem);
cartSection.addEventListener('input', updateCartItemQuantity);

// Function to validate name (letters only, no numbers or special characters)
function isValidName(name) {
  const nameRegex = /^[A-Za-z]+$/;
  return nameRegex.test(name);
}

// Function to validate email using a simple regex
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate the form fields on input

// Function to validate the first name
function validateFirstName() {
  const firstNameInput = document.getElementById("firstName");
  const firstName = firstNameInput.value.trim();
  const firstNameRegex = /^[A-Za-z]+$/;
  const firstNameIsValid = firstNameRegex.test(firstName);
  const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

  if (!firstNameIsValid) {
    firstNameInput.classList.add('error');
    firstNameErrorMsg.textContent = "Please enter a valid first name (letters only).";
  } else {
    firstNameInput.classList.remove('error');
    firstNameErrorMsg.textContent = "";
  }

  return firstNameIsValid;
}
// Function to validate the last name
function validateLastName() {
  const lastNameInput = document.getElementById("lastName");
  const lastName = lastNameInput.value.trim();
  const lastNameRegex = /^[A-Za-z]+$/;
  const lastNameIsValid = lastNameRegex.test(lastName);
  const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

  if (!lastNameIsValid) {
    lastNameInput.classList.add('error');
    lastNameErrorMsg.textContent = "Please enter a valid last name (letters only).";
  } else {
    lastNameInput.classList.remove('error');
    lastNameErrorMsg.textContent = "";
  }
  return lastNameIsValid;

}
// Function to validate the email
function validateEmail() {
  const emailInput = document.getElementById("email");
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailIsValid = emailRegex.test(email);
  const emailErrorMsg = document.getElementById("emailErrorMsg");

  if (!emailIsValid) {
    emailInput.classList.add('error');
    emailErrorMsg.textContent = "Please enter a valid email address.";
  } else {
    emailInput.classList.remove('error');
    emailErrorMsg.textContent = "";
  }

  return emailIsValid;
}
// Function to validate the address
function validateAddress() {
  const addressInput = document.getElementById("address");
  const address = addressInput.value.trim();
  const addressRegex = /^[A-Za-z0-9\s,'-]*$/;
  const addressIsValid = addressRegex.test(address);
  const addressErrorMsg = document.getElementById("addressErrorMsg");

  if (!addressIsValid) {
    addressInput.classList.add('error');
    addressErrorMsg.textContent = "Please enter a valid address.";
  } else {
    addressInput.classList.remove('error');
    addressErrorMsg.textContent = "";
  }

  return addressIsValid;
}

// Function to validate the city
function validateCity() {
  const cityInput = document.getElementById("city");
  const city = cityInput.value.trim();
  const cityRegex = /^[\p{L}0-9\s,'-]*$/u;
  const cityIsValid = cityRegex.test(city);
  const cityErrorMsg = document.getElementById("cityErrorMsg");

  if (!cityIsValid) {
    cityInput.classList.add('error');
    cityErrorMsg.textContent = "Please enter a valid city.";
  } else {
    cityInput.classList.remove('error');
    cityErrorMsg.textContent = "";
  }

  return cityIsValid;
}

// Function to validate the entire form
function validateForm() {
  const firstNameIsValid = validateFirstName();
  const lastNameIsValid = validateLastName();
  const emailIsValid = validateEmail();
  const addressIsValid = validateAddress();
  const cityIsValid = validateCity();

  // Return an object containing the validity status of each field
  return {
    firstNameIsValid,
    lastNameIsValid,
    emailIsValid,
    addressIsValid,
    cityIsValid,
  };
}

  

// Add event listeners to form fields for  validation
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const cityInput = document.getElementById("city");

firstNameInput.addEventListener("input", validateFirstName);
lastNameInput.addEventListener("input", validateLastName);
emailInput.addEventListener("input", validateEmail);
cityInput.addEventListener("input", validateCity);
calculateTotal();


// Function to generate a random order ID
function generateOrderId() {
  return Math.floor(Math.random() * 1000000000).toString();
}


// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const formIsValid = validateForm();

  if (formIsValid.firstNameIsValid && formIsValid.lastNameIsValid && formIsValid.emailIsValid && formIsValid.addressIsValid && formIsValid.cityIsValid) {
    // Save the order details to localStorage
    const orderDetails = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      totalQuantity: totalQuantity,
      totalPrice: totalPrice.toFixed(2),
      orderId: generateOrderId(),
    };
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    localStorage.removeItem('cart'); 


    // Redirect to the confirmation page
    window.location.href = `./confirmation.html?orderId=${orderDetails.orderId}`;
  }
}

// Add event listener to the form for form submission
const orderForm = document.querySelector('.cart__order__form');
orderForm.addEventListener('submit', handleFormSubmit);
