import CssLoader from '../services/CssLoader.js';

export class HomePage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.cssLoader = new CssLoader(this.root);
    this.cssLoader.loadCss('./css/HomePage.css');
  }

  connectedCallback() {
    const h1 = document.createElement('h1');
    h1.textContent = 'Home Page';
    this.root.appendChild(h1);
  }
}

customElements.define('home-page', HomePage);
