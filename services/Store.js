const Store = {
  countries: null,
  country: null,
};

const proxyStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;
    if (property == 'country') {
      window.dispatchEvent(new Event('countryChanged'));
    } else if (property == 'countries') {
      window.dispatchEvent(new Event('countriesChanged'));
    }
    return true;
  },
  get(target, prop) {
    return target[prop];
  },
});

export default proxyStore;
