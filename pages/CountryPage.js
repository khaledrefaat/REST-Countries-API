import CssLoader from '../services/CssLoader.js';
import { $, numberWithCommas } from '../utils/helperFunctions.js';

export class CountryPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.cssLoader = new CssLoader(this.root);
    this.cssLoader.loadCss('../pages/CountryPage.css');
  }

  findCountry(name) {
    const countries = app.store && app.store.countries;
    if (countries) return countries.find(country => country.name == name);
  }

  renderItems(items, HTMLElement, name) {
    items.forEach((domain, index) => {
      if (items.length == 1) HTMLElement.textContent += domain[name] || domain;
      else if (index == items.length - 1)
        HTMLElement.textContent += domain[name] || domain;
      else HTMLElement.textContent += (domain[name] || domain) + ', ';
    });
  }

  renderCountries(countries, HTMLElement) {
    countries.forEach(country => {
      const countryItem = document.createElement('li');
      countryItem.textContent = country;
      HTMLElement.appendChild(countryItem);
    });
  }

  connectedCallback() {
    const countryTemplate = $('#country-details');
    const content = countryTemplate.content.cloneNode(true);

    const url = decodeURIComponent(
      location.pathname.replace('/country/', '').replaceAll('-', ' ')
    );

    const country = this.findCountry(url);
    const link = $('a', content);
    link.addEventListener('click', e => {
      e.preventDefault();
      const url = link.getAttribute('href');
      app.router.go(url);
    });

    $('.country__img', content).src = country.flag;
    $('.content h2', content).textContent = country.name;
    $('.native-name span', content).textContent = country.nativeName;
    $('.population span', content).textContent = numberWithCommas(
      country.population
    );
    $('.region span', content).textContent = country.region;
    $('.sub-region span', content).textContent = country.subregion;
    $('.capital span', content).textContent = country.capital;

    const topLevel = $('.top-level span', content);
    const currency = $('.currency span', content);
    const language = $('.language span', content);

    this.renderItems(country.topLevelDomain, topLevel);
    this.renderItems(country.currencies, currency, 'name');
    this.renderItems(country.languages, language, 'name');

    const countriesButtons = $('.countries-list', content);
    this.renderCountries(country.borders || [], countriesButtons);

    this.root.appendChild(content);
  }
}

customElements.define('country-page', CountryPage);
