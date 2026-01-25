/**
* Generates an HTML string displaying a star rating.
*
* @param {number} rating - The rating value to display.
* @param {number} [max=5] - The maximum number of stars to display. We display a maximum of 5 stars, even though some products may have higher ratings.
* @returns {string} HTML string with filled (★) and empty (☆) stars representing the rating.
*
* // Returns: '<span class="stars">★★★☆☆</span>'
*/
function renderStars(rating, max = 5) {
  const fullStars = Math.min(Math.floor(rating), max);
  const emptyStars = max - fullStars;
  return `
    <span class="stars">
      ${'★'.repeat(fullStars)}
      ${'☆'.repeat(emptyStars)}
    </span>
  `;
}

const resultHit = hit => `<a id=${hit.objectID} data-query-id=${hit.__queryID} data-position="${hit.__position}" class="result-hit">
  <div class="result-hit__image-container">
    <img class="result-hit__image" src="${hit.image}" />
  </div>
  <div class="result-hit__details">
    <h3 class="result-hit__name">${hit._highlightResult.name.value}</h3>
    <p class="result-hit__price">$${hit.price}</p>
    <p class="result-hit__rating">${renderStars(hit.rating)}</p>
  </div>
  <div class="result-hit__controls">
    <button id="add-to-cart" class="result-hit__cart">Add To Cart</button>
  </div>
</a>`;

export {resultHit, renderStars};
