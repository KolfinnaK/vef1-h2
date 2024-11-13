// lib/pages/index-page.js
import { el } from '../elements.js';
import { renderNavigation } from '../components/navigation.js';

/**
 * Renders the index (home) page based on the main JSON data.
 * @param {HTMLElement} root - The root element to render content into.
 * @param {Object} indexJson - The main index JSON data.
 */
export function renderIndexPage(root, indexJson) {
  root.innerHTML = ''; // Clear previous content

  const headerElement = el('header', {}, el('h1', {}, indexJson.title));
  headerElement.appendChild(renderNavigation(indexJson.navigation));

  const mainElement = el('main', {},
    el('section', {},
      el('p', {}, indexJson.description)
    )
  );

  const footerElement = el('footer', {}, indexJson.footer);

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}
