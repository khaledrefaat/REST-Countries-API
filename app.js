import { HomePage } from './pages/HomePage.js';
import { CountryPage } from './pages/CountryPage.js';
import Store from './services/Store.js';
import Router from './services/Router.js';
import { loadCountries } from './services/Countries.js';

import { $ } from './utils/helperFunctions.js';
window.app = {};
app.router = Router;
app.store = Store;
window.addEventListener('DOMContentLoaded', async () => {
  await loadCountries();
  app.router.init();

  const localTheme = localStorage.getItem('darkMode');
  if (localTheme) {
    app.store.darkMode = localTheme === 'true';
    localTheme === 'true' && $('body').classList.add('dark-mode');
  }

  $('.theme-switcher').addEventListener('click', () => {
    app.store.darkMode = !app.store.darkMode;
    localStorage.setItem('darkMode', app.store.darkMode);
    $('body').classList.toggle('dark-mode');
  });
});
