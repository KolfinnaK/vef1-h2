import { el } from '../elements.js';

export function renderNavigation(navigation) {
  const navigationElement = el('ul', { class: 'navigation__list' });

  const homePageElement = el(
    'li',
    { class: 'navigation__item' },
    el('a', {
      href: '/',
      class: 'navigation__link',
    }, 'Forsíða')
  );
  navigationElement.appendChild(homePageElement);

  for (const item of navigation) {
    const { title, slug } = item;
    const href = `/?type=${slug}`;
    const navItemElement = el(
      'li',
      { class: 'navigation__item' },
      el('a', {
        href,
        class: 'navigation__link',
      }, title)
    );
    navigationElement.appendChild(navItemElement);
  }

  return el('nav', { class: 'navigation' }, navigationElement);
}
