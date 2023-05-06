function getQueryParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");
    return { id };
  }
  
  async function getProductDetails(productId) {
    const url = `http://localhost:3000/api/products/${productId}`;
  
  }
  
  (async () => {
    const queryParams = getQueryParams();
  
    const productId = queryParams.id;
  
    const product = await getProductDetails(productId);
    console.log(product);

  
    const productImageContainer = document.querySelector(".item__img");
  
    const img = document.createElement("img");
  
    img.src = product.imageUrl;
  
    img.alt = "Product image";
  
    productImageContainer.appendChild(img);
  })();
  