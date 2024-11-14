import { fetcher } from './lib/fetcher.js';
import { renderIndexPage } from './lib/pages/index-page.js';
import { renderContentPage } from './lib/pages/content-page.js';
import { renderSubpage } from './lib/pages/sub-page.js';

async function render(root, querystring) {
  try {
    const mainIndexJson = await fetcher('./data/index.json');
    if (!mainIndexJson) {
      throw new Error('Failed to load main index.json');
    }

    const params = new URLSearchParams(querystring);
    const type = params.get('type');
    const content = params.get('content');

    // Render the homepage if no specific type is requested
    if (!type) {
      return renderIndexPage(root, mainIndexJson);
    }

    // Render specific content pages based on `type` and `content`
    if (content) {
      const contentJson = await fetcher(`./data/${type}/${content}.json`);
      if (!contentJson) {
        throw new Error(`Failed to load ${content} for ${type}`);
      }
      return renderContentPage(root, mainIndexJson, contentJson, content);
    } else {
      // If only `type` is provided, render the main page for the type
      return renderSubpage(root, mainIndexJson, type);
    }
  } catch (error) {
    console.error(error);
    root.innerHTML = '<p>Something went wrong while loading the page. Please try again later.</p>';
  }
}


const root = document.querySelector('#app');

render(root, window.location.search);

window.addEventListener('popstate', () => {
  render(root, window.location.search);
});

document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('/')) {
    e.preventDefault();
    const url = new URL(e.target.href);
    history.pushState(null, '', url.pathname + url.search);
    render(root, url.search);
  }
});
