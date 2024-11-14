import { fetcher } from './fetcher.js';

export async function showLecturesList(root, lecturesJson, type) {
  root.innerHTML = `<h2>${lecturesJson.title}</h2><p>Veldu atriði til að sjá fyrirlestur:</p>`;

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

  root.appendChild(list);
}

export function showLectureDetail(root, lecture) {
  root.innerHTML = `<h2>${lecture.title}</h2>`;

  lecture.content.forEach(item => {
    let element;

    switch (item.type) {
      case 'heading':
        element = document.createElement('h3');
        element.textContent = item.data;
        break;

      case 'text':
        element = document.createElement('p');
        element.textContent = item.data.replace(/\n/g, ' ');
        break;

      case 'quote':
        element = document.createElement('blockquote');
        element.textContent = item.data;
        if (item.attribute) {
          const attribution = document.createElement('cite');
          attribution.textContent = `— ${item.attribute}`;
          element.appendChild(attribution);
        }
        break;

      case 'image':
        element = document.createElement('figure');
        const img = document.createElement('img');
        img.src = item.data;
        const caption = document.createElement('figcaption');
        caption.textContent = item.caption;
        element.appendChild(img);
        element.appendChild(caption);
        break;

      case 'list':
        element = document.createElement('ul');
        item.data.forEach(listItemData => {
          const listItem = document.createElement('li');
          listItem.textContent = listItemData;
          element.appendChild(listItem);
        });
        break;

      case 'code':
        element = document.createElement('pre');
        const codeBlock = document.createElement('code');
        codeBlock.textContent = item.data;
        element.appendChild(codeBlock);
        break;

      default:
        console.warn(`Unknown content type: ${item.type}`);
    }

    if (element) root.appendChild(element);
  });
}

