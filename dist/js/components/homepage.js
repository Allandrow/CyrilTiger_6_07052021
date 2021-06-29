import * as utils from '../utils.js';

export class Homepage {
  constructor(photographers) {
    this.photographers = photographers;
    this.container = document.getElementById('js-container');
  }

  createHeader() {
    const header = document.createElement('header');
    header.setAttribute('role', 'banner');
    header.appendChild(utils.createLogo());

    const title = document.createElement('h1');
    title.appendChild(document.createTextNode('Nos photographes'));

    const nav = document.createElement('nav');
    nav.ariaLabel = 'photographer categories';

    const tagSet = utils.getPhotographTagSet(this.photographers);
    const ul = utils.createTagList(tagSet);
    nav.appendChild(ul);
    header.append(title, nav);

    return header;
  }

  createPhotographerArticle(photographer) {
    const BEMName = 'article';
    const { id, portrait, name, city, country, tagline, price, tags } = photographer;

    const article = document.createElement('article');
    article.classList.add(BEMName);

    const link = document.createElement('a');
    link.setAttribute('href', `index.html?id=${id}`);
    link.classList.add(`${BEMName}__link`);

    const photo = utils.createIMG(`thumbnails/${portrait}`, name);

    const title = document.createElement('h2');
    title.appendChild(document.createTextNode(name));

    link.append(photo, title);

    const paragraph = document.createElement('p');

    const localisation = document.createElement('span');
    localisation.classList.add(`${BEMName}__localisation`);
    localisation.appendChild(document.createTextNode(`${city}, ${country}`));

    const slogan = document.createElement('span');
    slogan.classList.add(`${BEMName}__slogan`);
    slogan.appendChild(document.createTextNode(tagline));

    const priceText = document.createElement('span');
    priceText.classList.add(`${BEMName}__price`);
    priceText.appendChild(document.createTextNode(`${price}€/jour`));

    paragraph.append(localisation, slogan, priceText);

    const ul = utils.createTagList(tags);

    article.append(link, paragraph, ul);
    return article;
  }

  createPhotographerList() {
    const main = document.createElement('main');
    main.id = 'js-main';
    main.classList.add('article-list');

    this.photographers.forEach((photographer) =>
      main.appendChild(this.createPhotographerArticle(photographer))
    );

    return main;
  }

  createBackTopBtn() {
    const html = document.querySelector('html');

    const button = document.createElement('button');
    button.classList.add('hidden', 'back');
    button.appendChild(document.createTextNode('Passer au contenu'));

    window.addEventListener('scroll', () => {
      html.scrollTop <= 400
        ? button.classList.add('hidden')
        : button.classList.remove('hidden');
    });

    button.addEventListener('click', () => {
      html.scrollTop = 0;
    });

    return button;
  }

  filterPhotographByTag(tags, targetedTag) {
    const articles = this.container.querySelectorAll('article');
    const activeTags = [];

    // Remove active class on tag if it had it, otherwise add active class if tag has same text as target
    // Then if tag has active class, add to array
    tags.forEach((tag) => {
      if (tag.classList.contains('active') || utils.isSameTagText(tag, targetedTag)) {
        tag.classList.toggle('active');
      }
      if (tag.classList.contains('active')) {
        activeTags.push(tag);
      }
    });

    // Display all photographers if no activeTag
    if (activeTags.length === 0) {
      articles.forEach((article) => article.classList.remove('hidden'));
      return;
    }

    // Hide all articles, then display the parent articles from active tags array
    articles.forEach((article) => article.classList.add('hidden'));
    activeTags.forEach((tag) => {
      const article = tag.closest('.article');
      // active tag is not from header nav
      if (article !== null) article.classList.remove('hidden');
    });
  }

  getHomepage() {
    // DOM Elements
    const header = this.createHeader();
    const photographerList = this.createPhotographerList();
    const backTopBtn = this.createBackTopBtn();
    this.container.append(header, photographerList, backTopBtn);

    // DOM Events
    const tags = this.container.querySelectorAll('.tag');

    tags.forEach((tag) =>
      tag.addEventListener('click', () => {
        this.filterPhotographByTag(tags, tag);
      })
    );
  }
}
