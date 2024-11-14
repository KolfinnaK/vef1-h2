// lib/pages/index-page.js
import { el } from '../elements.js';
import { renderNavigation } from '../components/navigation.js';

export function renderIndexPage(root, indexJson, renderCallback) {
  root.innerHTML = ''; // Clear previous content

  const headerElement = el('header', {}, el('h1', {}, indexJson.title));
  
  // Create the navigation element
  const nav = el('nav', {});
  indexJson.navigation.forEach((item) => {
    const link = el('a', { href: `/?type=${item.slug}` }, item.title);
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const url = new URL(link.href);
      history.pushState(null, '', url.pathname + url.search);
      renderCallback(root, url.search); // Use renderCallback instead of render directly
    });
    nav.appendChild(link);
  });

  headerElement.appendChild(nav);
  
  // Append header, main content, and footer to the root
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
