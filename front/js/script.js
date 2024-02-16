const url = "http://localhost:3000/api/products/";
const itemsContainer = document.getElementById("items");

// Define an async function to fetch the articles from the API
const getArticles = async () => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

//  create a product card 
function createProductCard(data) {
  const anchor = document.createElement("a");
  anchor.href = `./product.html?id=${data._id}&imageUrl=${encodeURIComponent(data.imageUrl)}`; // Encode the image URL using encodeURIComponent()

  const article = document.createElement("article");

  const img = document.createElement("img");
  img.src = data.imageUrl;
  img.src = data.imageUrl.replace('/images/', '/images/mini/');

  img.alt = `Lorem ipsum dolor sit amet, ${data.name}`;

  const title = document.createElement("h3");
  title.classList.add("productName");
  title.textContent = data.name;

  // Create a p element, add the "productDescription" class, and set its text content
  const description = document.createElement("p");
  description.classList.add("productDescription");
  description.textContent = data.description;

  // Append the img, title, and description elements to the article element
  article.appendChild(img);
  article.appendChild(title);
  article.appendChild(description);

  // Append the article element to the anchor tag
  anchor.appendChild(article);

  return anchor;
}

// a async function to execute the  process
(async () => {
  const articles = await getArticles();
  // console.log(articles);

  for (let i = 0; i < articles.length; i++) {
    const productCard = createProductCard(articles[i]);

    itemsContainer.appendChild(productCard);
  }
})();
