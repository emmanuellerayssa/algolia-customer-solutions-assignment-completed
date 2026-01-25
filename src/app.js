import ResultsPage from './components/results-page';
import { initAddToCartTracking } from './cart-insights';
import { initProductNavigation } from './components/product-navigation';

class SpencerAndWilliamsSearch {
  constructor() {
    this._initSearch();
    this._initNavigation();
    this._initCartInsights();
  }

  _initSearch() {
    // Only initialize if #searchbox exists
    const searchBoxElement = document.querySelector('#searchbox');
    if (!searchBoxElement) return; // Exit early on product pages
    this.resultPage = new ResultsPage();
  }

   _initNavigation() {
    initProductNavigation();
  }

  _initCartInsights() {
    initAddToCartTracking();
  }
}

const app = new SpencerAndWilliamsSearch();

