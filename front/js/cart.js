// const selectedId = localStorage.getItem('productId');
// const productColor = localStorage.getItem('selectedColor');
// const productTitle = localStorage.getItem('title');
// const productPrice = localStorage.getItem('price');
// const productCount = localStorage.getItem('count');


// // Now you can use the stored data
// console.log('Selected ID:', selectedId);
// console.log('Product color:', productColor);
// console.log('Selected title:', productTitle);
// console.log('Product price:', productPrice);
// console.log('product Count:', productCount);



// Get the cart data from LocalStorage:
let storedCart = localStorage.getItem('order');

// Parse it back into an array:
if (storedCart) {
  cart = JSON.parse(storedCart);
  console.log(cart)
} else {
  cart = [];
  alert("data was't imported")
}
