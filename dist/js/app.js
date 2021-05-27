import * as DOM from './dom.js';
import * as UTILS from './utils.js';

const getJSON = async () => {
  const data = await fetch('dist/js/data/fisheyedata.json');
  const json = await data.json();
  return json;
};

const getPhotographTagSet = (photographers) => {
  const tagSet = new Set();

  photographers.forEach((photograph) => {
    photograph.tags.forEach((tag) => {
      tagSet.add(UTILS.uppercaseFirstLetter(tag));
    });
  });
  return tagSet;
};

const createPhotographerTagList = (photographer) => {
  const ul = document.createElement('ul');
  ul.classList.add('tagList');

  photographer.tags.forEach((tag) => {
    ul.appendChild(DOM.createTag(tag));
  });

  return ul;
};

const createPhotographerArticle = (photographer) => {
  const elementBEMName = 'thumbnail';

  const article = document.createElement('article');
  article.classList.add(elementBEMName);

  const link = document.createElement('a');
  link.setAttribute('href', `photographer.html?id=${photographer.id}`);
  link.classList.add(`${elementBEMName}__link`);

  const portrait = DOM.createIMG(`thumbnails/${photographer.portrait}`, photographer.name);

  const title = DOM.createHeading(photographer.name, 'h2');

  link.append(portrait, title);

  const paragraph = document.createElement('p');

  const localisation = DOM.createSPAN(
    `${photographer.city}, ${photographer.country}`,
    `${elementBEMName}__localisation`
  );
  const slogan = DOM.createSPAN(photographer.tagline, `${elementBEMName}__slogan`);
  const price = DOM.createSPAN(`${photographer.price}€/jour`, `${elementBEMName}__price`);

  paragraph.append(localisation, slogan, price);

  const ul = createPhotographerTagList(photographer);

  article.append(link, paragraph, ul);

  return article;
};

const createPhotographerHeader = (photographer) => {
  const elementBEMName = 'photograph-header__infos';

  const section = document.createElement('section');
  section.classList.add('photograph-header');

  const div = DOM.createDIV(elementBEMName);
  const title = DOM.createHeading(photographer.name, 'h1');

  const paragraph = document.createElement('p');

  const localisation = DOM.createSPAN(
    `${photographer.city}, ${photographer.country}`,
    `${elementBEMName}__localisation`
  );
  const slogan = DOM.createSPAN(photographer.tagline, `${elementBEMName}__slogan`);

  paragraph.append(localisation, slogan);

  const ul = createPhotographerTagList(photographer);

  const contact = DOM.createContactBtn();

  div.append(title, paragraph, ul, contact);

  const portrait = DOM.createIMG(`thumbnails/${photographer.portrait}`, photographer.name);

  section.append(div, portrait);

  return section;
};

const createPicture = (id, image) => {
  const picture = document.createElement('picture');

  const source = document.createElement('source');
  source.setAttribute('media', '(min-width:60rem)');
  source.setAttribute('srcset', `dist/img/${id}/${image}`);

  const separatorIndex = image.indexOf('.');
  const imageMin = [image.slice(0, separatorIndex), '-min', image.slice(separatorIndex)].join('');
  const img = DOM.createIMG(`${id}/${imageMin}`);

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
  const span = DOM.createSPAN(title);
  const div = DOM.createDIV();
  const likesSpan = DOM.createSPAN(likes);
  const img = DOM.createIMG('like-icon.svg', 'likes');

  div.append(likesSpan, img);
  figcaption.append(span, div);
  return figcaption;
};

const createFigure = (media) => {
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

const createSelectGroup = () => {
  const divGroup = DOM.createDIV('select-group');

  const label = document.createElement('label');
  label.setAttribute('for', 'js-sort');
  label.setAttribute('id', 'ariaLabel');
  label.appendChild(document.createTextNode('Trier par'));

  const divSelect = DOM.createDIV('select');

  const btn = document.createElement('button');
  btn.setAttribute('id', 'js-sort');
  btn.setAttribute('role', 'button');
  btn.setAttribute('aria-haspopup', 'listbox');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-labelledBy', 'ariaLabel');
  btn.appendChild(document.createTextNode('Popularité'));

  const ul = document.createElement('ul');
  ul.setAttribute('id', 'select-list');
  ul.setAttribute('role', 'listbox');
  ul.setAttribute('aria-activedescendant', 'sort-likes');

  const liLikes = DOM.createSelectLI('likes', 'Popularité', true);
  const liDate = DOM.createSelectLI('date', 'Date');
  const liTitle = DOM.createSelectLI('titre', 'Titre');
  ul.append(liLikes, liDate, liTitle);

  const img = DOM.createIMG('expand-more.svg', 'expand list indicator');

  divSelect.append(btn, ul, img);
  divGroup.append(label, divSelect);

  return divGroup;
};

const createFigureGroup = (medias) => {
  const figureGroup = document.createElement('figure');
  figureGroup.setAttribute('role', 'group');
  figureGroup.setAttribute('id', 'js-figureGroup');
  figureGroup.classList.add('figure-group');

  medias.forEach((media) => {
    figureGroup.appendChild(createFigure(media));
  });

  return figureGroup;
};

// reduce ?
const getTotalLikes = (medias) => {
  let totalLikes = 0;
  medias.forEach((media) => {
    totalLikes += media.likes;
  });

  return totalLikes;
};

const createTotalLikesDiv = (medias) => {
  const div = DOM.createDIV('meta-infos__likes');
  const totalLikes = getTotalLikes(medias);
  const span = DOM.createSPAN(totalLikes);
  const img = DOM.createIMG('like-icon-black.svg', 'likes');
  div.append(span, img);
  return div;
};

const switchTagActiveState = (tags, clickedTag) => {
  /*
    Parse all tags from Document
    Toggle active class from tag if clicked tag is already active
    OR if tag is the same value as clicked tag
  */
  tags.forEach((tag) => {
    if (tag.classList.contains('active') || UTILS.isSameTagText(tag, clickedTag)) {
      tag.classList.toggle('active');
    }
  });
};

const displayThumbnailsByActiveTag = () => {
  // Hide thumbnails
  const thumbnails = document.querySelectorAll('.thumbnail');

  thumbnails.forEach((thumbnail) => {
    thumbnail.classList.add('hidden');
  });

  // Display thumbnails with active tag
  const activeTags = document.querySelectorAll('#js-articleList .active');

  activeTags.forEach((tag) => {
    const article = tag.closest('.thumbnail');
    article.classList.remove('hidden');
  });

  // Display all thumbnails if no active tag
  if (activeTags.length === 0) {
    thumbnails.forEach((thumbnail) => thumbnail.classList.remove('hidden'));
  }
};

const handleTagClick = (tags, tag) => {
  switchTagActiveState(tags, tag);
  displayThumbnailsByActiveTag();
};

const displayBackToTopBtn = () => {
  const html = document.querySelector('html');
  const backTopBtn = document.getElementById('js-backToTop');

  if (html.scrollTop <= 400) {
    backTopBtn.classList.add('hidden');
    return;
  }
  backTopBtn.classList.remove('hidden');
};

const constructHomepage = (photographers) => {
  const navUl = document.getElementById('js-nav');
  const photographTagSet = getPhotographTagSet(photographers);
  // change to querySelector('main')
  const thumbnailList = document.getElementById('js-articleList');

  for (const tag of photographTagSet) {
    navUl.appendChild(DOM.createTag(tag));
  }

  photographers.forEach((photographer) => {
    thumbnailList.appendChild(createPhotographerArticle(photographer));
  });

  const tags = document.querySelectorAll('.tag');

  tags.forEach((tag) => tag.addEventListener('click', () => handleTagClick(tags, tag)));

  window.addEventListener('scroll', displayBackToTopBtn);
};

const constructPhotographPage = (json, id) => {
  const photographMain = document.getElementById('js-main');
  const medias = [];
  const metaInfos = DOM.createDIV('meta-infos');

  // filter()
  json.photographers.forEach((photographer) => {
    if (photographer.id === id) {
      document.title = `Fisheye - ${photographer.name}`;
      photographMain.appendChild(createPhotographerHeader(photographer));
      metaInfos.appendChild(DOM.createSPAN(`${photographer.price}€/jour`));
    }
  });

  // filter()
  json.media.forEach((media) => {
    if (media.photographerId === id) {
      medias.push(media);
    }
  });

  metaInfos.prepend(createTotalLikesDiv(medias));
  photographMain.append(createSelectGroup(), createFigureGroup(medias), metaInfos);
};

const displayPageByURLQuery = (json, URLQuery) => {
  const URLParams = new URLSearchParams(URLQuery);
  const id = parseInt(URLParams.get('id'));

  if (isFinite(id)) {
    // PHOTOGRAPHE PAGE
    constructPhotographPage(json, id);
  } else {
    // HOMEPAGE
    constructHomepage(json.photographers);
  }
};

async function onLoad() {
  const json = await getJSON();
  const URLQuery = window.location.search;

  displayPageByURLQuery(json, URLQuery);
}

document.addEventListener('DOMContentLoaded', onLoad);
