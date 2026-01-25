import algoliasearch from 'algoliasearch';
import {renderStars} from '../../templates/result-hit';

// 1. Create Algolia client
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);

const index = client.initIndex(process.env.ALGOLIA_INDEX);

// 2. Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

// 3. Validate
if (!productId) {
  showError('No product ID provided');
} else {
  loadProduct(productId);
}

/**
* Loads a product from the Algolia index and renders it on the product.html page.
*
* Fetches the product with the given ID using the Algolia `index.getObject` method.
* If the product is successfully retrieved, it calls `renderProduct` to display it.
* If the product cannot be found or an error occurs, it calls `showError` with a message.
*
* @param {string} id - The unique identifier of the product to load.
* @returns {void} 
*/
function loadProduct(id) {
  index.getObject(id)
    .then(renderProduct)
    .catch(() => showError('Product not found'));
}

/**
* Renders a product's details on the product.html page.
*
* Populates the DOM elements with the product's image, name, description, price,
* and rating. If the product has no description, a default message is shown.
* The rating is rendered using the `renderStars` function.
*
* @param {Object} product - The product object to render.
* @param {string} product.name - The name of the product.
* @param {string} product.image - The URL of the product image.
* @param {string} [product.description] - The product description (optional).
* @param {number} product.price - The price of the product.
* @param {number} product.rating - The rating of the product (number of stars).
*
* @returns {void} 
*/
function renderProduct(product) {
  const product_image = document.getElementById('product-image');
  const product_name = document.getElementById('product-name');
  const product_description = document.getElementById('product-description');
  const product_price = document.getElementById('product-price')
  const product_rating = document.getElementById('product-rating');
  
  product_image.innerHTML = `<img src="${product.image}" alt="${product.name}" />`;
  product_name.innerText = `${product.name}`;
  product_description.innerText = product.description  || 'No description available';
  product_price.innerText = `${product.price}$`;
  product_rating.innerHTML  = `${renderStars(product.rating) }`;
}

/**
* Displays an error message on the product page.
* @param {string} message - The error message to display.
* @returns {void} 
*/
function showError(message) {
  document.getElementById('product-page').innerHTML = `
    <p>${message}</p>
  `;
}
