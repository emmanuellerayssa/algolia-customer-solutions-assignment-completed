import algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';
import { searchBox, hits, pagination, refinementList, clearRefinements, configure, ratingMenu } from 'instantsearch.js/es/widgets';
import {resultHit} from '../templates/result-hit';

/**
 * @class ResultsPage
 * @description Instant Search class to display content on main page
 */
class ResultPage {
  constructor() {
    this._registerClient();
    this._registerWidgets();
    this._startSearch();
  }

  /**
   * @private
   * Handles creating the search client and creating an instance of instant search
   * @return {void}
   */

  _registerClient() {
    this._searchClient = algoliasearch(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_API_KEY
    );

    this._searchInstance = instantsearch({
      indexName: process.env.ALGOLIA_INDEX,
      searchClient: this._searchClient,
      insights: true, 
      searchParameters: {
      userToken: process.env.ALGOLIA_USER_TOKEN,
    },
    });
  }

  /**
   * @private
   * Adds widgets to the Algolia instant search instance
   * @return {void}
   */
  _registerWidgets() {
    this._searchInstance.addWidgets([
      searchBox({
        container: '#searchbox',
        placeholder: 'Search fo products, brands, categories...'
      }),
      hits({
        container: '#hits',
        templates: {
          item: resultHit,
        },
      }),
      pagination({
        container: '#pagination',
      }),
      clearRefinements({
        container: "#clear-refinements",
      }),
      refinementList({
        container: '#brand-facet',
        attribute: 'brand',
        limit: 3,
        showMore: true,
        showMoreLimit: 10,
      }),
      refinementList({
        container: '#categories-facet',
        attribute: 'categories',
        limit: 3,
        showMore: true,
        showMoreLimit: 10,
      }),
      refinementList({
        container: '#pricerange-facet',
        attribute: 'price_range',
        limit: 3,
        showMore: true,
        showMoreLimit: 10,
      }),
      ratingMenu({
        container: "#rating-menu",
        attribute: "rating",
      }),
      configure({
        hitsPerPage: 12,
        clickAnalytics: true,
        enablePersonalization: true,
        userToken: process.env.ALGOLIA_USER_TOKEN,
      }),
        ]);
  }

  /**
   * @private
   * Starts instant search after widgets are registered
   * @return {void}
   */
  _startSearch() {
    this._searchInstance.start();
  }
}
;

export default ResultPage;
