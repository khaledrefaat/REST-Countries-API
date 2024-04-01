import { $, createElement } from '../utils/helperFunctions.js';

const Router = {
  init() {
    window.addEventListener('popstate', event => {
      if (event.state) this.go.route(event.state.route, false);
    });
    this.go(location.pathname);
  },
  go(route, addToHistory = true) {
    if (addToHistory) history.pushState({ route }, '', route);

    let pageElement = null;
    switch (route) {
      case '/':
        pageElement = createElement('home-page');
        break;
      default:
        pageElement = createElement('country-page');
    }

    const cache = $('main');
    cache.innerHtml = '';
    cache.appendChild(pageElement);
  },
};

export default Router;
