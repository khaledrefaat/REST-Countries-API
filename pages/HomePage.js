import CssLoader from '../services/CssLoader.js';

import {
  $,
  createElement,
  numberWithCommas,
} from '../utils/helperFunctions.js';

export class HomePage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.cssLoader = new CssLoader(this.root);
    this.cssLoader.loadCss('../pages/HomePage.css');
  }

  filterByRegion(region) {
    if (app.store && app.store.countries)
      return app.store.countries.filter(country => country.region == region);
  }

  filterByName(name) {
    if (app.store && app.store.countries)
      return app.store.countries.filter(country =>
        country.name.toLowerCase().includes(name.toLowerCase())
      );
  }

  debounce = (fn, delay) => {
    let timeOut;
    return e => {
      const name = e.target.value;
      clearTimeout(timeOut);
      timeOut = setTimeout(() => fn(this.filterByName(name)), delay);
    };
  };

  renderFilterContainer() {
    const filterContainer = createElement('div');
    filterContainer.innerHTML = `
      <div class="form-control">
          <input type="text" placeholder="Search for a country..." />
          <ion-icon name="search-sharp"></ion-icon>
      </div>
      <div class="custom-select">
        <div class="select-selected">Filter by Region <ion-icon name="chevron-down-outline"></ion-icon></div>
        <ul class="select-items">
        <li>All</li>
        <li>Africa</li>
        <li>Americas</li>
        <li>Asia</li>
        <li>Europe</li>
        <li>Oceania</li>
        </ul>
      </div>
    `;
    filterContainer.classList.add('filter-container');
    this.root.appendChild(filterContainer);

    $('body').addEventListener('click', event => {
      $('.select-items', this.root).classList.remove('show-list');
    });

    $('.custom-select', this.root).addEventListener('click', e => {
      e.stopPropagation();

      if (e.target.tagName === 'LI') {
        $(
          '.select-selected',
          this.root
        ).innerHTML = `${e.target.textContent} <ion-icon name="chevron-down-outline"></ion-icon>`;

        if (e.target.textContent == 'All')
          this.renderCountryCards(app.store.countries);
        else this.renderCountryCards(this.filterByRegion(e.target.textContent));
      }

      $('.select-items', this.root).classList.toggle('show-list');
    });

    $('.form-control input', this.root).addEventListener(
      'input',
      this.debounce(this.renderCountryCards, 500)
    );
  }

  renderCountryCards = countries => {
    const countryCards = $('.country-cards', this.root);
    countryCards.innerHTML = '';

    countries.forEach(({ flag, name, population, region, capital }) => {
      const countryTemplate = $('#country-card');
      const content = countryTemplate.content.cloneNode(true);

      $('a', content).href = `/country/${name.replaceAll(' ', '-')}`;
      $('.country__img', content).src = flag;
      $('h3', content).textContent = name;
      $('.country-population span', content).textContent =
        numberWithCommas(population);
      $('.country-region span', content).textContent = region;
      $('.country-capital span', content).textContent = capital;
      countryCards.appendChild(content);
    });
  };

  connectedCallback() {
    const countryCards = createElement('div');
    countryCards.classList.add('country-cards');
    this.renderFilterContainer();
    this.root.appendChild(countryCards);

    document.addEventListener('countriesChanged', () => {
      console.log(app.store.countries + ' Change in eventListener');
    });
    if (app.store && app.store.countries)
      this.renderCountryCards(app.store.countries);
  }
}

customElements.define('home-page', HomePage);
