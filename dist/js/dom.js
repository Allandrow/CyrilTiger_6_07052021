import * as utils from './utils.js';

const createIMG = (path, alt = '') => {
  const img = document.createElement('img');
  img.setAttribute('src', `dist/img/${path}`);
  img.setAttribute('alt', alt);
  img.setAttribute('loading', 'lazy');
  return img;
};

const createSPAN = (text, className) => {
  const span = document.createElement('span');
  if (className !== undefined) {
    span.classList.add(className);
  }
  span.appendChild(document.createTextNode(text));
  return span;
};

const createSelectLI = (id, text) => {
  const li = document.createElement('li');
  li.setAttribute('role', 'option');
  li.setAttribute('id', `sort-${id}`);
  li.setAttribute('aria-selected', 'false');
  li.setAttribute('aria-labelledBy', 'ariaLabel');

  const button = document.createElement('button');
  button.appendChild(document.createTextNode(text));

  li.appendChild(button);

  return li;
};

const createTag = (tagText) => {
  const li = document.createElement('li');

  const link = document.createElement('a');
  link.classList.add('tag');
  link.setAttribute('href', '#');
  link.setAttribute('aria-label', 'tag');

  const span = createSPAN(tagText);

  link.append(document.createTextNode('#'), span);
  li.appendChild(link);

  return li;
};

const createContactBtn = () => {
  const btn = document.createElement('button');
  btn.classList.add('button');
  btn.id = 'js-contactForm';
  btn.setAttribute('aria-expanded', 'false');
  btn.appendChild(document.createTextNode('Contactez-moi'));

  return btn;
};

export const createBackToTopBtn = () => {
  const button = document.createElement('button');
  button.classList.add('hidden', 'back');
  button.id = 'js-backToTop';
  button.appendChild(document.createTextNode('Passer au contenu'));

  return button;
};

const createTagList = (tags) => {
  const ul = document.createElement('ul');
  ul.classList.add('tag-list');

  for (const tag of tags) {
    ul.appendChild(createTag(tag));
  }

  return ul;
};

// TODO : destructuring param
export const createPhotographerArticle = (photographer) => {
  const elementBEMName = 'thumbnail';

  const article = document.createElement('article');
  article.classList.add(elementBEMName);

  const link = document.createElement('a');
  link.setAttribute('href', `index.html?id=${photographer.id}`);
  link.classList.add(`${elementBEMName}__link`);

  const portrait = createIMG(`thumbnails/${photographer.portrait}`, photographer.name);

  const title = document.createElement('h2');
  title.appendChild(document.createTextNode(photographer.name));

  link.append(portrait, title);

  const paragraph = document.createElement('p');

  const localisation = createSPAN(
    `${photographer.city}, ${photographer.country}`,
    `${elementBEMName}__localisation`
  );
  const slogan = createSPAN(photographer.tagline, `${elementBEMName}__slogan`);
  const price = createSPAN(`${photographer.price}€/jour`, `${elementBEMName}__price`);

  paragraph.append(localisation, slogan, price);

  const ul = createTagList(photographer.tags);

  article.append(link, paragraph, ul);

  return article;
};

// TODO : destructuring param
export const createPhotographerHeader = (photographer) => {
  const elementBEMName = 'photograph-header__infos';

  const section = document.createElement('section');
  section.classList.add('photograph-header');

  const div = document.createElement('div');
  div.classList.add(elementBEMName);

  const title = document.createElement('h1');
  title.appendChild(document.createTextNode(photographer.name));

  const paragraph = document.createElement('p');

  const localisation = createSPAN(
    `${photographer.city}, ${photographer.country}`,
    `${elementBEMName}__localisation`
  );
  const slogan = createSPAN(photographer.tagline, `${elementBEMName}__slogan`);

  paragraph.append(localisation, slogan);

  const ul = createTagList(photographer.tags);

  const contact = createContactBtn();

  div.append(title, paragraph, ul, contact);

  const portrait = createIMG(`thumbnails/${photographer.portrait}`, photographer.name);

  section.append(div, portrait);

  return section;
};

const createPicture = (id, image) => {
  const picture = document.createElement('picture');

  const source = document.createElement('source');
  source.setAttribute('media', '(min-width:60rem)');
  source.setAttribute('srcset', `dist/img/${id}/${image}`);

  const separatorIndex = image.indexOf('.');
  const imageMin = [
    image.slice(0, separatorIndex),
    '-min',
    image.slice(separatorIndex),
  ].join('');
  const img = createIMG(`${id}/${imageMin}`);

  picture.append(source, img);
  return picture;
};

const createVideo = (id, video) => {
  const media = document.createElement('video');

  const source = document.createElement('source');
  source.setAttribute('src', `dist/img/${id}/${video}`);
  source.setAttribute('type', 'video/mp4');

  media.appendChild(source);
  return media;
};

const createFigcaption = (title, likes) => {
  const figcaption = document.createElement('figcaption');

  const span = createSPAN(title);
  const div = document.createElement('div');

  const likesSpan = createSPAN(likes);

  const button = document.createElement('button');
  button.classList.add('js-like');

  const img = createIMG('like-icon.svg', 'likes');

  button.appendChild(img);

  div.append(likesSpan, button);
  figcaption.append(span, div);
  return figcaption;
};

// TODO : destructuring param
const createFigure = (media) => {
  const figure = document.createElement('figure');
  figure.classList.add('figure');

  const link = document.createElement('a');
  // TODO : add href to media
  let path;
  utils.isImage(media)
    ? (path = `dist/img/${media.photographerId}/${media.image}`)
    : (path = `dist/img/${media.photographerId}/${media.video}`);
  link.setAttribute('href', path);

  let mediaElement;
  if (utils.isImage(media)) {
    mediaElement = createPicture(media.photographerId, media.image);
  } else {
    mediaElement = createVideo(media.photographerId, media.video);
  }

  link.appendChild(mediaElement);

  const caption = createFigcaption(media.title, media.likes);

  figure.append(link, caption);
  figure.setAttribute('data-likes', media.likes);
  figure.setAttribute('data-title', media.title);
  figure.setAttribute('data-date', media.date);
  return figure;
};

export const createFigureGroup = (medias) => {
  const figureGroup = document.createElement('figure');
  figureGroup.setAttribute('role', 'group');
  figureGroup.setAttribute('id', 'js-figureGroup');
  figureGroup.classList.add('figure-group');

  medias.forEach((media) => {
    figureGroup.appendChild(createFigure(media));
  });

  return figureGroup;
};

const createTotalLikesDiv = (medias) => {
  let totalLikes = 0;
  medias.forEach((media) => {
    totalLikes += media.likes;
  });

  const div = document.createElement('div');
  div.classList.add('meta-infos__likes');
  const span = createSPAN(totalLikes);
  const img = createIMG('like-icon-black.svg', 'likes');
  div.append(span, img);
  return div;
};

export const createLikesAndPriceDiv = (medias, photographer) => {
  const div = document.createElement('div');
  div.classList.add('meta-infos');
  div.append(createTotalLikesDiv(medias), createSPAN(`${photographer.price}€ / jour`));
  return div;
};

const createLogo = () => {
  const logo = document.createElement('a');
  logo.href = 'index.html';
  logo.appendChild(createIMG('logo.svg', 'FishEye Home Page'));
  return logo;
};

const createNav = (tagSet) => {
  const nav = document.createElement('nav');
  nav.ariaLabel = 'photographer categories';

  const ul = createTagList(tagSet);

  nav.appendChild(ul);

  return nav;
};

export const createHeader = (id, photographers) => {
  const header = document.createElement('header');
  header.setAttribute('role', 'banner');
  header.appendChild(createLogo());

  if (!isFinite(id)) {
    const tagSet = utils.getPhotographTagSet(photographers);

    const title = document.createElement('h1');
    title.appendChild(document.createTextNode('Nos photographes'));

    header.append(title, createNav(tagSet));
  }

  return header;
};

export const createSelectGroup = (filters) => {
  const divGroup = document.createElement('div');
  divGroup.classList.add('select-group');

  const label = document.createElement('label');
  label.setAttribute('for', 'js-sort');
  label.setAttribute('id', 'ariaLabel');
  label.appendChild(document.createTextNode('Trier par'));

  const divSelect = document.createElement('div');
  divSelect.classList.add('select');

  const btn = document.createElement('button');
  btn.setAttribute('id', 'js-sort');
  btn.setAttribute('role', 'button');
  btn.classList.add('btn');
  btn.setAttribute('aria-haspopup', 'listbox');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-labelledBy', 'ariaLabel');
  btn.appendChild(document.createTextNode(filters[0]));

  const ul = document.createElement('ul');
  ul.setAttribute('id', 'js-select');
  ul.setAttribute('role', 'listbox');

  filters.forEach((filter) => {
    switch (filter) {
      case 'Popularité':
        ul.appendChild(createSelectLI('likes', filter));
        break;
      case 'Date':
        ul.appendChild(createSelectLI('date', filter));
        break;
      case 'Titre':
        ul.appendChild(createSelectLI('titre', filter));
        break;
    }
  });

  ul.firstElementChild.setAttribute('aria-selected', 'true');
  ul.setAttribute('aria-activedescendant', ul.firstElementChild.getAttribute('id'));

  divSelect.append(btn, ul);
  divGroup.append(label, divSelect);

  return divGroup;
};

const createFormLabel = (id, text, type = 'text') => {
  const label = document.createElement('label');
  label.setAttribute('for', id);

  const input = document.createElement('input');
  input.setAttribute('type', type);
  input.id = id;
  input.classList.add('js-focusable', 'js-input');
  input.required = true;

  label.append(document.createTextNode(text), input);

  return label;
};

export const createContactModal = (name) => {
  const div = document.createElement('div');
  div.classList.add('modal-window', 'contact-modal');
  div.id = 'contact-modal';
  div.setAttribute('role', 'dialog');

  const section = document.createElement('section');

  const title = document.createElement('h1');
  title.id = 'modal-title';
  title.appendChild(document.createTextNode('Contactez-moi'));

  const span = createSPAN(name);

  title.appendChild(span);

  div.setAttribute('aria-labelledby', title.id);

  const form = document.createElement('form');

  const firstNameInput = createFormLabel('formFirstName', 'Prénom');
  const lastNameInput = createFormLabel('formLastName', 'Nom');
  const emailInput = createFormLabel('formEmail', 'Email', 'email');

  const textAreaLabel = document.createElement('label');
  textAreaLabel.setAttribute('for', 'formMessage');

  const textArea = document.createElement('textarea');
  textArea.id = 'formMessage';
  textArea.classList.add('js-focusable', 'js-input');
  textArea.required = true;

  textAreaLabel.append(document.createTextNode('Votre message'), textArea);

  const button = document.createElement('button');
  button.id = 'js-submit';
  button.classList.add('js-focusable');
  button.appendChild(document.createTextNode('Envoyer'));

  form.append(firstNameInput, lastNameInput, emailInput, textAreaLabel, button);

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('close', 'js-focusable');

  section.append(title, form, closeBtn);

  div.appendChild(section);

  return div;
};

export const createGalleryModal = () => {
  const div = document.createElement('div');
  div.classList.add('modal-window', 'gallery-modal');
  div.setAttribute('role', 'dialog');
  div.setAttribute('aria-label', 'image closup view');

  const section = document.createElement('section');

  const leftDiv = document.createElement('div');

  const leftButton = document.createElement('button');
  leftButton.id = 'js-prev';
  leftButton.classList.add('gallery-modal__control', 'js-focusable');

  const leftButtonImg = document.createElement('img');
  leftButtonImg.setAttribute('src', 'dist/img/gallery-control.svg');
  leftButton.appendChild(leftButtonImg);
  leftDiv.appendChild(leftButton);

  const mediaBlock = document.createElement('div');
  mediaBlock.classList.add('medias');

  const rightButton = document.createElement('button');
  rightButton.id = 'js-next';
  rightButton.classList.add('gallery-modal__control', 'js-focusable');

  const rightButtonImg = document.createElement('img');
  rightButtonImg.setAttribute('src', 'dist/img/gallery-control.svg');
  rightButton.appendChild(rightButtonImg);

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('close', 'js-focusable');

  section.append(leftButton, rightButton, mediaBlock, closeBtn);

  div.appendChild(section);

  return div;
};

export const createBodySkeleton = () => {
  const div = document.createElement('div');
  div.classList.add('wrapper');
  div.id = 'js-container';

  const main = document.createElement('main');
  main.id = 'js-main';

  div.appendChild(main);

  document.body.prepend(div);

  return div;
};
