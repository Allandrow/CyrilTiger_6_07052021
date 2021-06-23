import * as utils from './utils.js';
import { Photographer } from './photographer.js';

const createHeader = (photographers) => {
  const tagSet = utils.getPhotographTagSet(photographers);

  const header = document.createElement('header');
  header.setAttribute('role', 'banner');
  header.appendChild(utils.createLogo());

  const title = document.createElement('h1');
  title.appendChild(document.createTextNode('Nos photographes'));

  const nav = document.createElement('nav');
  nav.ariaLabel = 'photographer categories';

  const ul = utils.createTagList(tagSet);
  nav.appendChild(ul);
  header.append(title, nav);

  return header;
};

const createMain = (photographers) => {
  const main = document.createElement('main');
  main.id = 'js-main';
  main.classList.add('article-list');

  photographers.forEach((photographer) => {
    const photographerArticle = new Photographer(photographer);
    main.appendChild(photographerArticle.createArticle());
  });

  return main;
};

const createBackToTopBtn = () => {
  const button = document.createElement('button');
  button.classList.add('hidden', 'back');
  button.id = 'js-backToTop';
  button.appendChild(document.createTextNode('Passer au contenu'));

  return button;
};

const handleTagClick = (articles, tags, targetedTag) => {
  const activeTags = [];
  // Parse each tag and toggle active class if tag already has it or if tag is same text value as targetedTag
  tags.forEach((tag) => {
    if (tag.classList.contains('active') || utils.isSameTagText(tag, targetedTag)) {
      tag.classList.toggle('active');
    }
    if (tag.classList.contains('active')) {
      activeTags.push(tag);
    }
  });

  if (activeTags.length === 0) {
    articles.forEach((article) => article.classList.remove('hidden'));
    return;
  }

  articles.forEach((article) => {
    article.classList.add('hidden');
  });

  activeTags.forEach((tag) => {
    const article = tag.closest('.article');
    if (article !== null) {
      article.classList.remove('hidden');
    }
  });
};

export class Homepage {
  constructor(photographers, container) {
    this.photographers = photographers;
    this.container = container;
  }

  constructPage() {
    const header = createHeader(this.photographers);
    const main = createMain(this.photographers);
    main.appendChild(createBackToTopBtn());

    this.container.append(header, main);
  }

  attachEventListeners() {
    const html = document.querySelector('html');
    const tags = this.container.querySelectorAll('.tag');
    const articles = this.container.querySelectorAll('.article');
    const btn = this.container.querySelector('#js-backToTop');

    tags.forEach((tag) =>
      tag.addEventListener('click', () => handleTagClick(articles, tags, tag))
    );

    window.addEventListener('scroll', () => {
      html.scrollTop <= 400
        ? btn.classList.add('hidden')
        : btn.classList.remove('hidden');
    });

    btn.addEventListener('click', () => {
      html.scrollTop = 0;
    });
  }
}
