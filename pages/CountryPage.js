import CssLoader from '../services/CssLoader.js';

export class CountryPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.cssLoader = new CssLoader(this.root);
    this.cssLoader.loadCss('./css/CountryPage.css');
  }

  connectedCallback() {
    const h1 = document.createElement('h1');
    h1.textContent = 'Country Page';
    this.root.appendChild(h1);
  }
}

customElements.define('country-page', CountryPage);
