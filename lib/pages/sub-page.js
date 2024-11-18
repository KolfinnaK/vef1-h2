import { el } from '../elements.js';
import { renderNavigation } from '../components/navigation.js';
import { fetcher } from '../fetcher.js';
import { showLecturesList } from '../show-lectures.js';
import { renderContentPage } from './content-page.js';
import { showKeywordsList } from '../show-keywords';

export async function renderSubpage(root, indexJson, type) {
  root.innerHTML = '';

  const topicJson = await fetcher(`./data/${type}/index.json`);

  const headerElement = el('header', {}, el('h1', {}, indexJson.title));
  headerElement.appendChild(renderNavigation(indexJson.navigation));

  const mainElement = el('main', {},
    el('section', {},
      el('h2', {}, topicJson.title),
      el('p', {}, topicJson.text)
    ),

    el('div', { class: 'button-section' },
      ...topicJson.content.map(item => {
        const buttonContainer = el('div', { class: 'button-container' });

        const description = el('p', { class: 'button-description' }, item.text);

        const button = el('button', { class: 'button' }, item.title);
        button.addEventListener('click', async () => {
          history.pushState(null, '', `/?type=${type}&content=${item.slug}`);

          root.innerHTML = `<h2>${item.title}</h2><p>${item.text}</p>`;

          if (item.type === 'lectures') {
            const lecturesJson = await fetcher(`./data/${type}/lectures.json`);
            showLecturesList(root, lecturesJson, type);}
            else if(item.type==='keywords'){
              const keywordsJson = await fetcher(`./data/${type}/keywords.json`);
            showKeywordsList(root, keywordsJson, type);
            }
           else {
            const contentJson = await fetcher(`./data/${type}/${item.slug}.json`);
            renderContentPage(root, indexJson, contentJson, item.slug); 
          }
        });

        buttonContainer.appendChild(description);
        buttonContainer.appendChild(button);

        return buttonContainer;
      })
    )
  );

  const footerElement = el('footer', {}, indexJson.footer);

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}
