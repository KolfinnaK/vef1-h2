import { el } from '../elements.js';
import { renderNavigation } from '../components/navigation.js';

export function renderIndexPage(root, indexJson) {
  const headerElement = el('header', {}, el('h1', {}, indexJson.title));
  headerElement.appendChild(renderNavigation(indexJson.navigation));

  const mainElement = el(
    'main',
    {},
    el('section', {}, el('p', {}, indexJson.description))
  );

  const footerElement = el('footer', {}, indexJson.footer);

  root.innerHTML = '';
  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}
