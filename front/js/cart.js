let storedCart = localStorage.getItem('cart');
console.log(storedCart)

let cart;
if (storedCart) {
    cart = JSON.parse(storedCart);
} else {
    cart = [];
}

const cartAndFormContainer = document.querySelector("#cartAndFormContainer");

let cartSection = document.createElement('section');
cartSection.classList.add('cart');
cartAndFormContainer.appendChild(cartSection);

let totalPrice = 0;
let totalQuantity = 0;

cart.forEach((product) => {
    let productArticle = document.createElement('article');
    productArticle.classList.add('cart__item');
    productArticle.dataset.id = product.id;
    productArticle.dataset.color = product.color;

    let productImgDiv = document.createElement('div');
    productImgDiv.classList.add('cart__item__img');
    let productImg = document.createElement('img');
    productImg.src = product.imgURL;
    productImg.alt = product.title;
    productImgDiv.appendChild(productImg);

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

    let productSettingsDiv = document.createElement('div');
    productSettingsDiv.classList.add('cart__item__content__settings');
    let productQuantityDiv = document.createElement('div');
    productQuantityDiv.classList.add('cart__item__content__settings__quantity');
    let quantityText = document.createElement('p');
    quantityText.textContent = `Qté : `;
    let quantityInput = document.createElement('input');
    quantityInput.type = "number";
    quantityInput.name = "itemQuantity";
    quantityInput.min = "1";
    quantityInput.max = "100";
    quantityInput.value = product.count;
    quantityInput.classList.add('itemQuantity');
    productQuantityDiv.append(quantityText, quantityInput);
    let deleteDiv = document.createElement('div');
    deleteDiv.classList.add('cart__item__content__settings__delete');
    let deleteText = document.createElement('p');
    deleteText.textContent = "Supprimer";
    deleteText.classList.add('deleteItem');
    deleteDiv.appendChild(deleteText);
    productSettingsDiv.append(productQuantityDiv, deleteDiv);

    productContentDiv.append(productDescriptionDiv, productSettingsDiv);

    productArticle.append(productImgDiv, productContentDiv);

    cartSection.appendChild(productArticle);
    
    totalPrice += parseFloat(product.price) * product.count;
    totalQuantity += product.count;
});

const totalQuantityElement = document.querySelector("#totalQuantity");
const totalPriceElement = document.querySelector("#totalPrice");

totalQuantityElement.textContent = totalQuantity;
totalPriceElement.textContent = totalPrice.toFixed(2);
