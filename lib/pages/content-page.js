import { el } from '../elements.js';
import { renderNavigation } from '../components/navigation.js';


export function renderContentPage(root, indexJson, contentJson, contentType) {
  root.innerHTML = '';

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
