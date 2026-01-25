import aa from './insights';

/**
* Initializes "Add to Cart" tracking for product listings and product pages
* This function handles the following when a user clicks an "Add to Cart" button:
* 1. Updates the button's text and style temporarily to indicate the product was added to the cart.
* 2. Updates the cart count in localStorage and on the page.
* 3. Sends a conversion event to Algolia Insights for analytics tracking.
*
* The function works for both product listing pages and individual product pages,
* and gracefully handles missing elements.
*
* @returns {void} 
*/
export function initAddToCartTracking() {

  document.addEventListener('click', event => {

    const button = event.target.closest('.result-hit__cart');

    if (!button) return;

    //1. Change button's message & style when a new product is added to the cart
    // Get the initial attributes
    const button_initial_color = button.style.backgroundColor;
    const button_initial_text = button.innerText;

    // Change button style and text
    button.style.backgroundColor = "green";
    button.innerText = "Added to cart";

    // Restore after 1.5 seconds
    setTimeout(() => {
      button.style.backgroundColor = button_initial_color;
      button.innerText = button_initial_text;
    }, 1500);

    //2. Manage the number of products appearing in the cart
    if (!localStorage.getItem('numProductInCart')){
      localStorage.setItem('numProductInCart', 0)
    }
    
    if(!document.getElementById('qte_product')){

      document.getElementById('cart-count-main').innerHTML = Number(localStorage.getItem('numProductInCart')) + 1;
      localStorage.setItem('numProductInCart', Number(localStorage.getItem('numProductInCart')) + 1);

    }
    else{
      document.getElementById('cart-count-main').innerHTML = Number(localStorage.getItem('numProductInCart')) +Number(document.getElementById('qte_product').value);
      localStorage.setItem('numProductInCart', Number(localStorage.getItem('numProductInCart')) +Number(document.getElementById('qte_product').value));
    }
    
    //3. Conversion Events
    const hit = button.closest('.result-hit') || button.closest('.product__page') ;
    
    if (!hit) return;

    const productId = hit.id;
    const hitElement = document.getElementById(productId);
    if (!hitElement){
        //Click 'Add To Cart' from the product page
        aa('convertedObjectIDsAfterSearch', {
        eventName: 'Add to Cart',
        index: process.env.ALGOLIA_INDEX,
        objectIDs: [localStorage.getItem('productId')],
        queryID: localStorage.getItem('queryID'),
        });
      }
      else {
        //Click 'Add To Cart' from the home page
        aa('convertedObjectIDsAfterSearch', {
        eventName: 'Add to Cart',
        index: process.env.ALGOLIA_INDEX,
        objectIDs: [productId],
        queryID: hitElement.dataset.queryId,
        });
      } 

    });
}
