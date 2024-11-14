import { el } from '../elements.js';
import { renderNavigation } from '../components/navigation.js';
import { fetcher } from '../fetcher.js';
import { showLecturesList } from '../show-lectures.js';
import { renderContentPage } from './content-page.js';
import { showKeywordsList } from '../show-keywords';

export async function renderSubpage(root, indexJson, type) {
  root.innerHTML = ''; // Clear previous content

  const topicJson = await fetcher(`./data/${type}/index.json`);

  // Create the main layout for the subpage
  const headerElement = el('header', {}, el('h1', {}, indexJson.title));
  headerElement.appendChild(renderNavigation(indexJson.navigation));

  const mainElement = el('main', {},
    el('section', {},
      el('h2', {}, topicJson.title),
      el('p', {}, topicJson.text) // Display main description for the topic
    ),
    el('div', { class: 'button-section' },
      ...topicJson.content.map(item => {
        const button = el('button', {}, item.title);
        button.addEventListener('click', async () => {
          history.pushState(null, '', `/?type=${type}&content=${item.slug}`);
          
          // Show the specific `text` associated with the clicked button
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
        return button;
      })
    )
  );

  const footerElement = el('footer', {}, indexJson.footer);

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}
