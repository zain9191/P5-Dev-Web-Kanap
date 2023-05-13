function getQueryParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  return { id };
}

async function getProductDetails(productId) {
  const url = `http://localhost:3000/api/products/${productId}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const product = await response.json();
  return product;
}

(async () => {
  const queryParams = getQueryParams();
  const productId = queryParams.id;
  
  const product = await getProductDetails(productId);

  const productImageContainer = document.querySelector(".item__img");
  const img = document.createElement("img");
  
  img.src = product.imageUrl;
  img.alt = product.description;
  
  productImageContainer.appendChild(img);

  const productTitle = document.querySelector("#title");
  const name = product.name;
  productTitle.innerHTML = name;

  const productPrice = document.querySelector("#price");
  const price = product.price;
  productPrice.innerHTML = price;

  const productDescription = document.querySelector("#description");
  const description = product.description;
  productDescription.innerHTML = description;

  let colorDropdown = document.querySelector('#colors');
  let colors = product.colors; 
  
  colors.forEach(color => {
    let option = document.createElement('option');
    option.value = color;
    option.innerText = color;
    colorDropdown.appendChild(option);
  });

  const addToCart = document.querySelector("#addToCart");
    
  addToCart.addEventListener("click",(event)=>{
    event.preventDefault();
        
    const colorOptions = document.querySelector('#colors');
    const selectedColor = colorOptions.value;

    if (!selectedColor || selectedColor === "") {
      alert('Please select a color for your order!');
      return;
    }

    const productCount = document.querySelector("#quantity");
    const selectedCount = Number(productCount.value);
    
    if (selectedCount <= 0) {
      alert("Please enter a quantity larger than 0");
      return;
    }

    let newProduct = {
      imgURL : product.imageUrl,
      id: productId,
      color: selectedColor,
      title: product.name,
      price: product.price,
      count: selectedCount,
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let existingProduct = cart.find(item => item.title === newProduct.title && item.color === newProduct.color);

    if (existingProduct) {
      existingProduct.count += Number(newProduct.count);
    } else {
      cart.push(newProduct);
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
  
    window.location.href = 'cart.html';
  });

})();
