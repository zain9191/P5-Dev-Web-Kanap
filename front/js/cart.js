const selectedId = localStorage.getItem('productId');
const productColor = localStorage.getItem('selectedColor');
const productTitle = localStorage.getItem('title');
const productPrice = localStorage.getItem('price');

// Now you can use the stored data
console.log('Selected ID:', selectedId);
console.log('Product color:', productColor);
console.log('Selected title:', productTitle);
console.log('Product price:', productPrice);
