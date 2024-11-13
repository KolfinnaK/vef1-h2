// lib/pages/sub-page.js
import { el } from '../elements.js';
import { renderNavigation } from '../components/navigation.js';
import { fetcher } from '../fetcher.js';

export async function renderSubpage(root, indexJson, type) {
  root.innerHTML = ''; // Clear previous content

  const headerElement = el('header', {}, el('h1', {}, indexJson.title));
  headerElement.appendChild(renderNavigation(indexJson.navigation));

  let contentJson;
  try {
    // Adjust the file path here if necessary
    contentJson = await fetcher(`./data/${type}/index.json`);
  } catch (error) {
    console.error('Error fetching content JSON:', error);
    return;
  }

  if (!contentJson) {
    const mainElement = el('main', {}, el('p', {}, 'Content not found'));
    root.appendChild(headerElement);
    root.appendChild(mainElement);
    return;
  }

  const mainElement = el('main', {},
    el('section', {},
      ...contentJson.content.map(item => {
        const section = el('section', {});
        const button = el('button', {}, item.title);
        const text = el('p', { class: 'hidden' }, item.text);
  
        button.addEventListener('click', () => {
          text.classList.toggle('hidden'); // Toggle visibility on click
        });
  
        section.appendChild(button);
        section.appendChild(text);
        return section;
      })
    )
  );

  const footerElement = el('footer', {}, indexJson.footer);

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}
