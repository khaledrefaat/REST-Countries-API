export function $(selector, document = document) {
  return document.querySelector(selector);
}

export function $$(selector, document = document) {
  return document.querySelectorAll(selector);
}
