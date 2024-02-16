// Function to retrieve query parameters from the URL
function getQueryParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  return { id };
}

// Asynchronous function to fetch product details from the API
async function getProductDetails(productId) {
  const url = `http://localhost:3000/api/products/${productId}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const product = await response.json();
  return product;
}
// execute code as soon as it's defined
(async () => {
  const queryParams = getQueryParams();
  const productId = queryParams.id;
  const product = await getProductDetails(productId);

  // Display the product image
  const productImageContainer = document.querySelector(".item__img");
  const img = document.createElement("img");
  
  img.src = product.imageUrl;
  img.alt = product.description;
  productImageContainer.appendChild(img);

  // Display the product name
  const productTitle = document.querySelector("#title");
  const name = product.name;
  productTitle.innerHTML = name;

  // Display the product price
  const productPrice = document.querySelector("#price");
  const price = product.price;
  productPrice.innerHTML = price;

  // Display the product description
  const productDescription = document.querySelector("#description");
  const description = product.description;
  productDescription.innerHTML = description;


  // add available colors to colors dropdown list 
  let colorDropdown = document.querySelector('#colors');
  let colors = product.colors; 
  
  colors.forEach(color => {
    let option = document.createElement('option');
    option.value = color;
    option.innerText = color;
    colorDropdown.appendChild(option);
  });

  // Add to Cart button functionality
  const addToCart = document.querySelector("#addToCart");
    
  addToCart.addEventListener("click", (event) => {
    event.preventDefault();
    
    // Handle color selection
    const colorOptions = document.querySelector('#colors');
    const selectedColor = colorOptions.value;
  
    if (!selectedColor || selectedColor === "") {
      alert('Please select a color for your order!');
      return;
    }

    // Handle quantity selection
    const productCount = document.querySelector("#quantity");
    const selectedCount = Number(productCount.value);
  
    // Check if the quantity is within the allowed range
    if (selectedCount <= 0) {
      alert("Please enter a quantity larger than 0");
      return;
    } else if (selectedCount > 100) {
      alert("The maximum allowed quantity is 100");
      return;
    }

    // Create a new product object for the cart
    let newProduct = {
      imgURL: product.imageUrl,
      id: productId,
      color: selectedColor,
      title: product.name,
      price: product.price,
      count: selectedCount,
    };

    // Retrieve  cart from local storage or initialize a new one
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
      // Check if the product already exists in the cart
    let existingProduct = cart.find(item => item.id === newProduct.id && item.color === newProduct.color);
  
    if (existingProduct) {
      // Ensure the total count does not exceed 100
      let updatedCount = existingProduct.count + newProduct.count;
      if (updatedCount > 100) {
        alert("Adding this quantity would exceed the maximum allowed (100). Please adjust the quantity.");
        return;
      }
      existingProduct.count = updatedCount;
    } else {
      cart.push(newProduct);
    }

    // Save the updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Redirect to the cart page
    window.location.href = 'cart.html';
  });
  


})();
