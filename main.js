import { fetcher } from './lib/fetcher.js';
import { renderIndexPage } from './lib/pages/index-page.js';
import { renderContentPage } from './lib/pages/content-page.js';
import { renderSubpage } from './lib/pages/sub-page.js';

// Main render function to determine what content to load based on the URL query string
async function render(root, querystring) {
  try {
    // Fetch main index JSON file with site-wide info
    const mainIndexJson = await fetcher('./data/index.json');
    if (!mainIndexJson) {
      throw new Error('Failed to load main index.json');
    }

    // Parse URL parameters
    const params = new URLSearchParams(querystring);
    const type = params.get('type');       // e.g., html, css, javascript
    const content = params.get('content'); // e.g., lectures, keywords

    // If no type is specified, load the homepage
    if (!type) {
      return renderIndexPage(root, mainIndexJson);
    }

    // Load specific content page if content type is specified
    if (content === 'lectures' || content === 'keywords' || content === 'questions') {
      const contentJson = await fetcher(`./data/${type}/${content}.json`);
      if (!contentJson) {
        throw new Error(`Failed to load ${content} for ${type}`);
      }
      return renderContentPage(root, mainIndexJson, contentJson, content);
    }

    // If only type is specified, render the main subpage for that type
    return renderSubpage(root, mainIndexJson, type);
  } catch (error) {
    console.error(error);
    root.innerHTML = '<p>Something went wrong while loading the page. Please try again later.</p>';
  }
}

// Set up the root element for rendering the app
const root = document.querySelector('#app');

// Initial render based on the current URL
render(root, window.location.search);

// Listen for 'popstate' events to handle browser back and forward buttons
window.addEventListener('popstate', () => {
  render(root, window.location.search);
});

// Intercept link clicks to handle navigation without page reload
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('/')) {
    e.preventDefault();
    const url = new URL(e.target.href);
    history.pushState(null, '', url.pathname + url.search);
    render(root, url.search);
  }
});
