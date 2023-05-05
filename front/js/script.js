const url = "http://localhost:3000/api/products/";
const itemsContainer = document.getElementById("items");

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

(async () => {
  const articles = await getArticles();
  console.log(articles);

  // Now you can loop through the articles array
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];

    const articleLink = document.createElement("a");
    articleLink.href = `./product.html?id=${article.id}`;

    const articleElement = document.createElement("article");

    const img = document.createElement("img");
    img.src = article.imageUrl; // Replace with the correct property from your data
    img.alt = `Lorem ipsum dolor sit amet, ${article.name}`;

    const title = document.createElement("h3");
    title.classList.add("productName");
    title.textContent = article.name;

    const description = document.createElement("p");
    description.classList.add("productDescription");
    description.textContent = article.description;

    articleElement.appendChild(img);
    articleElement.appendChild(title);
    articleElement.appendChild(description);
    articleLink.appendChild(articleElement);
    itemsContainer.appendChild(articleLink);
  }
})();
