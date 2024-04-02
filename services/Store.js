const Store = {
  countries: null,
  darkMode: false,
};

const proxyStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;
    if (property == 'countries') {
      window.dispatchEvent(new Event('countriesChanged'));
    }
    return true;
  },
  get(target, prop) {
    return target[prop];
  },
});

export default proxyStore;
