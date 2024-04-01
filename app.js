import Store from './services/Store.js';
import Router from './services/Router.js';
import { loadCountries } from './services/Countries.js';

import { HomePage } from './pages/HomePage.js';
import { $ } from './utils/helperFunctions.js';

window.app = {};
app.router = Router;
app.store = Store;

window.addEventListener('DOMContentLoaded', async () => {
  await loadCountries();
  app.router.init();

  $('.theme-switcher').addEventListener('click', () => {
    $('main').classList.toggle('dark-mode');
    $('header').classList.toggle('dark-mode');
  });
});
