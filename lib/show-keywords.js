import { fetcher } from './fetcher.js';

export async function showKeywordsList(root, keywordsJson, type) {
    root.innerHTML = `<h2>${keywordsJson.title}</h2><p>Veldu lykilhugtak til að sjá meira um það:</p>`;
  
    const list = document.createElement('ul');
    keywordsJson.keywords.forEach(keyword => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = `/?type=${type}&content=keywords&keyword=${keyword.title}`;
      link.textContent = keyword.title;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        history.pushState(null, '', link.href);
        showKeywordDetail(root, keyword);
      });
      listItem.appendChild(link);
      list.appendChild(listItem);
    });
  
    root.appendChild(list);
  }
  
  export function showKeywordDetail(root, keyword) {
    root.innerHTML = `<h2>${keyword.title}</h2>`;
  
    if (keyword.english) {
      const englishElement = document.createElement('p');
      englishElement.innerHTML = `<strong>English:</strong> ${keyword.english}`;
      root.appendChild(englishElement);
    }

   
  
    const contentElement = document.createElement('p');
    contentElement.textContent = keyword.content;
    const footerElement = el('footer', {}, keywordsJson.footer);
    root.appendChild(contentElement);
    root.appendChild(footerElement);
  }