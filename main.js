import { fetcher } from './lib/fetcher.js';
import { renderIndexPage } from './lib/pages/index-page.js';
import { renderContentPage } from './lib/pages/content-page.js';
import { renderSubpage } from './lib/pages/sub-page.js';
import { showLecturesList, showLectureDetail } from './lib/show-lectures.js';
import { showKeywordsList} from './lib/show-keywords.js';

async function render(root, querystring) {
  try {
    console.log("Rendering page with query:", querystring);

    const mainIndexJson = await fetcher('./data/index.json');
    const params = new URLSearchParams(querystring);
    let type = params.get('type');
    const content = params.get('content');
    const lectureSlug = params.get('lecture');

    if (type === 'javascript') type = 'js';

    if (!type) {
      return renderIndexPage(root, mainIndexJson);
    }

    if (content === 'lectures') {
      const lecturesJson = await fetcher(`./data/${type}/lectures.json`);
      if (lectureSlug) {
        const lecture = lecturesJson.lectures.find(l => l.slug === lectureSlug);
        if (lecture) return showLectureDetail(root, lecture);
      }
      return showLecturesList(root, lecturesJson, type);
    }
    if (content === 'keywords') {
      const keywordsJson = await fetcher(`./data/${type}/keywords.json`);
      console.log(keywordsJson);
      return showKeywordsList(root, keywordsJson, type);
    }

    if (content) {
      const contentJson = await fetcher(`./data/${type}/${content}.json`);
      return renderContentPage(root, mainIndexJson, contentJson, content);
    }

    return renderSubpage(root, mainIndexJson, type);
  } catch (error) {
    console.error("Render error:", error);
    root.innerHTML = '<p>Something went wrong while loading the page.</p>';
  }
}

const root = document.querySelector('#app');
render(root, window.location.search);

window.addEventListener('popstate', () => render(root, window.location.search));

document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link && link.getAttribute('href') && link.getAttribute('href').startsWith('/')) {
    e.preventDefault();
    const url = new URL(link.href);
    if (window.location.search !== url.search) {
      history.pushState(null, '', url.search);
      render(root, url.search);
    }
  }
});
