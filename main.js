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
    let type = params.get('type');  // Use let here to allow reassignment
    const content = params.get('content');

    // Convert 'javascript' to 'js' to match folder structure
    if (type === 'javascript') {
      type = 'js';
    }

    // Render the homepage if no specific type is requested
    if (!type) {
      return renderIndexPage(root, mainIndexJson, render); // Pass render as a callback
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

// Initialize the root element
const root = document.querySelector('#app');

// Initial render based on the current URL
render(root, window.location.search);

// Listen for popstate events to handle back/forward navigation
window.addEventListener('popstate', () => {
  render(root, window.location.search);
});

// Intercept link clicks to use History API instead of reloading the page
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('/')) {
    e.preventDefault();
    const url = new URL(e.target.href);
    history.pushState(null, '', url.pathname + url.search);
    render(root, url.search);
  }
});
