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
    // console.log(product)
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
    alert(productTitle.value)


    const productPrice = document.querySelector("#price");
    const price = product.price;
    productPrice.innerHTML = price;


    const productDescription = document.querySelector("#description");
    const description = product.description;
    productDescription.innerHTML = description;

    // const price = document.createElement("p");
    // price.innerText = product.description;
    // productTitle.appendChild(price)



    let colorDropdown = document.querySelector('#colors');
    let colors = product.colors; 
    
    colors.forEach(color => {
      let option = document.createElement('option');
      option.value = color;
      option.innerText = color;
      colorDropdown.appendChild(option);
    });
    
    

    const addToCart = document.querySelector("#addToCart");
    // console.log(addToCart)

    
    addToCart.addEventListener("click",(event)=>{
        event.preventDefault();
        // get product detalies and add them local storage
        // id
        const queryParams = getQueryParams();
        const productId = queryParams.id;
              
        // color
        const colorOptieions = document.querySelector('#colors');
        const selectedColor = colorOptieions.value;

        // name
        const productTitle = document.querySelector("#title");
        const selectedTitle = productTitle.value;
        // console.log(selectedTitle)
        console.log(selectedTitle)
        // console.log(selectedTitle)

        // price
        const productPrice = document.querySelector("#price");
        const selectedProductPrice = productTitle.value;

        // Store the data
        localStorage.setItem('productId', productId);
        localStorage.setItem('selectedColor', selectedColor);
        localStorage.setItem('title', selectedTitle);
        localStorage.setItem('price', selectedProductPrice);

        // Redirect to the other page
        window.location.href = 'cart.html';


    })
    // console.log(addToCart)


  })();
  