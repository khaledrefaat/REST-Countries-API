export function $(selector, scope = document) {
  return scope.querySelector(selector);
}

export function $$(selector, scope = document) {
  return scope.querySelectorAll(selector);
}

export function createElement(element) {
  return document.createElement(element);
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
