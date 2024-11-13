/**
 * Býr til element með nafni og bætir við öðrum elementum eða texta nóðum.
 * @param {string} name Nafn á elementi
 * @param {object} attributes Eiginleikar á elementi, strengir eða föll.
 * @param  {...string | HTMLElement} children Hugsanleg börn: önnur element eða strengir
 * @returns {HTMLElement} Elementi með gefnum börnum
 */
export function el(name, attributes = {}, ...children) {
  const e = document.createElement(name);

  for (const key of Object.keys(attributes)) {
    if (typeof attributes[key] === 'function') {
      e.addEventListener(key, attributes[key]);
    } else {
      e.setAttribute(key, attributes[key]);
    }
  }

  for (const child of children) {
    if (typeof child === 'string' || typeof child === 'number') {
      e.appendChild(document.createTextNode(child.toString()));
    } else if (child instanceof HTMLElement) {
      e.appendChild(child);
    }
  }

  return e;
}