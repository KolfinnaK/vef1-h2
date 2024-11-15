import { fetcher } from './fetcher.js';
import {el} from './elements.js'
import { renderNavigation } from './components/navigation.js';

export async function showLecturesList(root, lecturesJson, type) {
  root.innerHTML = '';

  const mainIndexJson = await fetcher('./data/index.json');

  const headerElement = el('header', {}, el('h1', {}, mainIndexJson.title));
  headerElement.appendChild(renderNavigation(mainIndexJson.navigation));
  root.appendChild(headerElement);

  const mainElement = el('main', {},
    el('section', {},
      el('h2', {}, lecturesJson.title),
      el('p', {}, 'Veldu atriði til að sjá fyrirlestur:')
    )
  );

  const list = document.createElement('ul');
  lecturesJson.lectures.forEach(lecture => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = `/?type=${type}&content=lectures&lecture=${lecture.slug}`;
    link.textContent = lecture.title;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      history.pushState(null, '', link.href);
      showLectureDetail(root, lecture);
    });
    listItem.appendChild(link);
    list.appendChild(listItem);
  });

  mainElement.appendChild(list);
  root.appendChild(mainElement);

  const footerElement = el('footer', {}, mainIndexJson.footer);
  root.appendChild(footerElement);
}

export async function showLectureDetail(root, lecture) {
  root.innerHTML = '';

  const mainIndexJson = await fetcher('./data/index.json');

  const headerElement = el('header', {}, el('h1', {}, mainIndexJson.title));
  headerElement.appendChild(renderNavigation(mainIndexJson.navigation));
  root.appendChild(headerElement);

  const mainElement = el('main', {},
    el('section', {},
      el('h2', {}, lecture.title)
    )
  );

  lecture.content.forEach(item => {
    let element;
    switch (item.type) {
      case 'heading': {
        const element = document.createElement('h3');
        element.textContent = item.data;
        mainElement.appendChild(element);
        break;
      }
    
      case 'text': {
        const element = document.createElement('p');
        element.textContent = item.data.replace(/\n/g, ' ');
        mainElement.appendChild(element);
        break;
      }
    
      case 'quote': {
        const element = document.createElement('blockquote');
        element.textContent = item.data;
        if (item.attribute) {
          const attribution = document.createElement('cite');
          attribution.textContent = `— ${item.attribute}`;
          element.appendChild(attribution);
        }
        mainElement.appendChild(element);
        break;
      }
    
      case 'image': {
        const element = document.createElement('figure');
        const img = document.createElement('img');
        img.src = item.data;
        const caption = document.createElement('figcaption');
        caption.textContent = item.caption;
        element.appendChild(img);
        element.appendChild(caption);
        mainElement.appendChild(element);
        break;
      }
    
      case 'list': {
        const element = document.createElement('ul');
        item.data.forEach(listItemData => {
          const listItem = document.createElement('li');
          listItem.textContent = listItemData;
          element.appendChild(listItem);
        });
        mainElement.appendChild(element);
        break;
      }
    
      case 'code': {
        const element = document.createElement('pre');
        const codeBlock = document.createElement('code');
        codeBlock.textContent = item.data;
        element.appendChild(codeBlock);
        mainElement.appendChild(element);
        break;
      }
    
      default:
        console.warn(`Unknown content type: ${item.type}`);
    }

    if (element) mainElement.appendChild(element);
  });

  root.appendChild(mainElement);

  const footerElement = el('footer', {}, mainIndexJson.footer);
  root.appendChild(footerElement);
}