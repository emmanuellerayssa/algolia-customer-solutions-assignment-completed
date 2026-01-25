import aa from '../insights';

/**
* Initializes product navigation by adding click event handling to search results.
*
* When a user clicks on a product result (excluding 'Add to cart' buttons), this function:
* - Sends a click event to Algolia for analytics tracking.
* - Stores the clicked product ID and query ID in localStorage.
* - Redirects the user to the corresponding product page.
*
* The function safely exits if the hits container or clicked element is not found.
*
* @returns {void}
*/
export function initProductNavigation() {
    
    const hitsContainer = document.getElementById('hits');
    
    if (!hitsContainer) return;
    
    hitsContainer.addEventListener('click', event => {
        
        if (event.target.closest('button')) return;
        
        const hit = event.target.closest('.result-hit');
        
        if (!hit) return;

        const productId = hit.id;
        const hitElement = document.getElementById(productId);
        const queryID = hitElement.dataset.queryId;
        const position = Number(hitElement.dataset.position);

        if (!productId) return;

        //Click Events
        aa('clickedObjectIDsAfterSearch', {
        eventName: 'Product Clicked',
        index: process.env.ALGOLIA_INDEX,
        objectIDs: [productId],
        positions: [position],
        queryID: queryID,
        }); 
         
        localStorage.setItem('productId', productId);
        localStorage.setItem('queryID', queryID);
        
        window.location.href = `product.html?id=${productId}`;
 });

}
