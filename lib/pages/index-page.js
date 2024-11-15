// lib/pages/index-page.js
import { el } from '../elements.js';
import { renderNavigation } from '../components/navigation.js';

export function renderIndexPage(root, indexJson) {
  root.innerHTML = ''; 

  const headerElement = el('header', {}, el('h1', {}, indexJson.title));
  
  const nav=renderNavigation(indexJson.navigation);

  headerElement.appendChild(nav);
  root.appendChild(headerElement);

  const mainElement = el('main', {},
    el('section', {},
      el('p', {}, indexJson.description)
    )
  );

  const footerElement = el('footer', {}, indexJson.footer);

  root.appendChild(mainElement);
  root.appendChild(footerElement);
}
