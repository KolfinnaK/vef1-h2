import { fetcher } from './fetcher.js';
import {el} from './elements.js';
import { renderNavigation } from './components/navigation.js';



export async function showKeywordsList(root, keywordsJson, type) {
  root.innerHTML = ''; 
  
  const mainIndexJson = await fetcher('./data/index.json');

  const headerElement = el('header', {}, el('h1', {}, mainIndexJson.title));
  headerElement.appendChild(renderNavigation(mainIndexJson.navigation));

  root.appendChild(headerElement)

  const mainElement = el('main', {},
    el('section', {},
      el('h2', {}, keywordsJson.title),
      el('p', {}, 'Veldu lykilhugtak til að sjá meira um það:')
    )
  );

  const list = document.createElement('ul');
  keywordsJson.keywords.forEach(keyword => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = `/?type=${type}&content=keywords&keyword=${keyword.title}`;
    link.textContent = keyword.title;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      history.pushState(null, '', link.href);
      showKeywordDetail(root, keyword, mainIndexJson); 
    });
    listItem.appendChild(link);
    list.appendChild(listItem);
  });

  mainElement.appendChild(list);

  root.appendChild(mainElement);

 const footerElement = el('footer', {}, mainIndexJson.footer);
  root.appendChild(footerElement);
}

export function showKeywordDetail(root, keyword, indexJson) {
  root.innerHTML = ''; 

  const headerElement = el('header', {}, el('h1', {}, indexJson.title));
  headerElement.appendChild(renderNavigation(indexJson.navigation));

  root.appendChild(headerElement)

  const mainElement = el('main', {},
    el('section', {},
      el('h2', {}, keyword.title)
    )
  );

  if (keyword.english) {
    const englishElement = document.createElement('p');
    englishElement.innerHTML = `<strong>English:</strong> ${keyword.english}`;
    mainElement.appendChild(englishElement);
  }

  const contentElement = document.createElement('p');
  contentElement.textContent = keyword.content;
  mainElement.appendChild(contentElement);

  root.appendChild(mainElement);

  const footerElement = el('footer', {}, indexJson.footer);
  root.appendChild(footerElement);
}