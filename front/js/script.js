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

// Create an async function to execute the entire process
(async () => {
  const articles = await getArticles();
  console.log(articles);

  // Loop through the articles array
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];

    const articleLink = document.createElement("a");
    articleLink.href = `./product.html?id=${article._id}`;

    const articleElement = document.createElement("article");

    const img = document.createElement("img");
    img.src = article.imageUrl; 
    img.alt = `Lorem ipsum dolor sit amet, ${article.name}`;

    const title = document.createElement("h3");
    title.classList.add("productName");
    title.textContent = article.name;

    const description = document.createElement("p");
    description.classList.add("productDescription");
    description.textContent = article.description;

    // Append the image, title, and description elements to the article element
    articleElement.appendChild(img);
    articleElement.appendChild(title);
    articleElement.appendChild(description);

    // Append the article element to the anchor tag
    articleLink.appendChild(articleElement);

    // Append the anchor tag  to the items container
    itemsContainer.appendChild(articleLink);
  }



//   // Inside the loop through the articles array
// for (let i = 0; i < articles.length; i++) {
//   const article = articles[i];
//   console.log("Article data:", article); // Add this line to log the article data

//   // Rest of the code ...
// }

})();
