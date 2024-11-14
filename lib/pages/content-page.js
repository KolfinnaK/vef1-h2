// lib/pages/content-page.js

import { el } from '../elements.js';
import { renderNavigation } from '../components/navigation.js';

/**
 * Renders a content page based on the provided JSON data.
 * @param {HTMLElement} root - The root element to render content into.
 * @param {Object} indexJson - The main index JSON data.
 * @param {Object} contentJson - JSON data specific to the content page.
 * @param {string} contentType - The type of content, e.g., 'lectures' or 'keywords'.
 */
export function renderContentPage(root, indexJson, contentJson, contentType) {
  root.innerHTML = ''; // Clear previous content

  const headerElement = el('header', {}, el('h1', {}, indexJson.title));
  headerElement.appendChild(renderNavigation(indexJson.navigation));

  const mainElement = el('main', {},
    el('section', {},
      el('h2', {}, contentType),
      ...contentJson.items.map(item => el('p', {}, item.text))
    )
  );

  const footerElement = el('footer', {}, indexJson.footer);

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}
