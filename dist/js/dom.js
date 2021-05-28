import * as UTILS from './utils.js';

export const createDIV = (className = null) => {
  const div = document.createElement('div');
  if (className !== null) {
    div.classList.add(className);
  }
  return div;
};

export const createHeading = (name, heading = 'h2') => {
  const title = document.createElement(heading);
  title.appendChild(document.createTextNode(name));
  return title;
};

export const createIMG = (path, alt = '') => {
  const img = document.createElement('img');
  img.setAttribute('src', `dist/img/${path}`);
  img.setAttribute('alt', alt);
  img.setAttribute('loading', 'lazy');
  return img;
};

export const createSPAN = (text, className = null) => {
  const span = document.createElement('span');
  if (className !== null) {
    span.classList.add(className);
  }
  span.appendChild(document.createTextNode(text));
  return span;
};

export const createSelectLI = (id, text, ariaSelected = false) => {
  const li = document.createElement('li');
  li.setAttribute('role', 'option');
  li.setAttribute('id', `sort-${id}`);
  li.setAttribute('aria-selected', ariaSelected);
  li.setAttribute('aria-labelledBy', 'ariaLabel');
  li.appendChild(document.createTextNode(text));

  return li;
};

export const createTag = (tagText) => {
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

export const createContactBtn = () => {
  const btn = document.createElement('button');
  btn.classList.add('button');
  btn.appendChild(document.createTextNode('Contactez-moi'));

  return btn;
};

export const createPhotographerTagList = (photographer) => {
  const ul = document.createElement('ul');
  ul.classList.add('tagList');

  photographer.tags.forEach((tag) => {
    ul.appendChild(createTag(tag));
  });

  return ul;
};

export const createPhotographerArticle = (photographer) => {
  const elementBEMName = 'thumbnail';

  const article = document.createElement('article');
  article.classList.add(elementBEMName);

  const link = document.createElement('a');
  link.setAttribute('href', `photographer.html?id=${photographer.id}`);
  link.classList.add(`${elementBEMName}__link`);

  const portrait = createIMG(`thumbnails/${photographer.portrait}`, photographer.name);

  const title = createHeading(photographer.name, 'h2');

  link.append(portrait, title);

  const paragraph = document.createElement('p');

  const localisation = createSPAN(`${photographer.city}, ${photographer.country}`, `${elementBEMName}__localisation`);
  const slogan = createSPAN(photographer.tagline, `${elementBEMName}__slogan`);
  const price = createSPAN(`${photographer.price}€/jour`, `${elementBEMName}__price`);

  paragraph.append(localisation, slogan, price);

  const ul = createPhotographerTagList(photographer);

  article.append(link, paragraph, ul);

  return article;
};

export const createPhotographerHeader = (photographer) => {
  const elementBEMName = 'photograph-header__infos';

  const section = document.createElement('section');
  section.classList.add('photograph-header');

  const div = createDIV(elementBEMName);
  const title = createHeading(photographer.name, 'h1');

  const paragraph = document.createElement('p');

  const localisation = createSPAN(`${photographer.city}, ${photographer.country}`, `${elementBEMName}__localisation`);
  const slogan = createSPAN(photographer.tagline, `${elementBEMName}__slogan`);

  paragraph.append(localisation, slogan);

  const ul = createPhotographerTagList(photographer);

  const contact = createContactBtn();

  div.append(title, paragraph, ul, contact);

  const portrait = createIMG(`thumbnails/${photographer.portrait}`, photographer.name);

  section.append(div, portrait);

  return section;
};

export const createPicture = (id, image) => {
  const picture = document.createElement('picture');

  const source = document.createElement('source');
  source.setAttribute('media', '(min-width:60rem)');
  source.setAttribute('srcset', `dist/img/${id}/${image}`);

  // TODO fonction sémantique utilitaire
  const separatorIndex = image.indexOf('.');
  const imageMin = [image.slice(0, separatorIndex), '-min', image.slice(separatorIndex)].join('');
  const img = createIMG(`${id}/${imageMin}`);

  picture.append(source, img);
  return picture;
};

export const createVideo = (id, video) => {
  const media = document.createElement('video');

  const source = document.createElement('source');
  source.setAttribute('src', `dist/img/${id}/${video}`);
  source.setAttribute('type', 'video/mp4');

  media.appendChild(source);
  return media;
};

export const createFigcaption = (title, likes) => {
  const figcaption = document.createElement('figcaption');

  const span = createSPAN(title);
  const div = createDIV();

  const likesSpan = createSPAN(likes);
  const img = createIMG('like-icon.svg', 'likes');

  div.append(likesSpan, img);
  figcaption.append(span, div);
  return figcaption;
};

export const createFigure = (media) => {
  const figure = document.createElement('figure');
  figure.classList.add('figure');

  const link = document.createElement('a');
  link.setAttribute('href', '');

  let mediaElement;
  if (UTILS.isImage(media)) {
    mediaElement = createPicture(media.photographerId, media.image);
  } else {
    mediaElement = createVideo(media.photographerId, media.video);
  }
  link.appendChild(mediaElement);

  const caption = createFigcaption(media.title, media.likes);

  figure.append(link, caption);
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
