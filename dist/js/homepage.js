import * as utils from './utils.js';
import * as dom from './dom.js';

const handleTagClick = (tags, tagClicked) => {
  const thumbnails = document.querySelectorAll('.thumbnail');

  /*
    Parse all tags from Document
    Toggle active class from tag if clicked tag is already active
    OR if tag is the same value as clicked tag
  */
  tags.forEach((tag) => {
    if (tag.classList.contains('active') || utils.isSameTagText(tag, tagClicked)) {
      tag.classList.toggle('active');
    }
  });

  const activeTags = document.querySelectorAll('#js-main .active');

  if (activeTags.length === 0) {
    thumbnails.forEach((thumbnail) => thumbnail.classList.remove('hidden'));
    return;
  }

  thumbnails.forEach((thumbnail) => {
    thumbnail.classList.add('hidden');
  });

  activeTags.forEach((tag) => {
    const article = tag.closest('.thumbnail');
    article.classList.remove('hidden');
  });
};

const loadBackToTopBtnEventListeners = () => {
  const html = document.querySelector('html');
  const btn = document.getElementById('js-backToTop');

  window.addEventListener('scroll', () => {
    if (html.scrollTop <= 400) {
      btn.classList.add('hidden');
      return;
    }
    btn.classList.remove('hidden');
  });

  btn.addEventListener('click', () => {
    html.scrollTop = 0;
  });
};

export const constructHomepage = (photographers, id, wrapper) => {
  wrapper.prepend(dom.createHeader(id, photographers));

  const main = document.getElementById('js-main');
  main.classList.add('thumbnail-list');

  photographers.forEach((photographer) => {
    main.appendChild(dom.createPhotographerArticle(photographer));
  });

  main.appendChild(dom.createBackToTopBtn());

  const tags = document.querySelectorAll('.tag');

  tags.forEach((tag) => tag.addEventListener('click', () => handleTagClick(tags, tag)));

  loadBackToTopBtnEventListeners();
};
