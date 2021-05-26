const getJSON = async () => {
  const data = await fetch('dist/js/data/fisheyedata.json');
  const json = await data.json();
  return json;
};

// DOM ELEMENTS UTILITY FUNCTIONS

const createDIVElement = (className = null) => {
  const div = document.createElement('div');
  if (className !== null) {
    div.classList.add(className);
  }
  return div;
};

const createHeadingElement = (name, heading = 'h2') => {
  const title = document.createElement(heading);
  title.appendChild(document.createTextNode(name));
  return title;
};

const createIMGElement = (path, alt = '') => {
  const img = document.createElement('img');
  img.setAttribute('src', `dist/img/${path}`);
  img.setAttribute('alt', alt);
  return img;
};

const createSPANElement = (text, className = null) => {
  const span = document.createElement('span');
  if (className !== null) {
    span.classList.add(className);
  }
  span.appendChild(document.createTextNode(text));
  return span;
};

const createSelectLIElement = (id, text, ariaSelected = false) => {
  const li = document.createElement('li');
  li.setAttribute('role', 'option');
  li.setAttribute('id', `sort-${id}`);
  li.setAttribute('aria-selected', ariaSelected);
  li.setAttribute('aria-labelledBy', 'ariaLabel');
  li.appendChild(document.createTextNode(text));

  return li;
};

const uppercaseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getPhotographTagSet = (data) => {
  const tagSet = new Set();

  data.forEach((photograph) => {
    photograph.tags.forEach((tag) => {
      tagSet.add(uppercaseFirstLetter(tag));
    });
  });
  return tagSet;
};

const createTag = (tagText) => {
  const li = document.createElement('li');

  const link = document.createElement('a');
  link.classList.add('tag');
  link.setAttribute('href', '#');
  link.setAttribute('aria-label', 'tag');

  const span = createSPANElement(tagText);

  link.append(document.createTextNode('#'), span);
  li.appendChild(link);

  return li;
};

const createPhotographerTagList = (object) => {
  const ul = document.createElement('ul');
  ul.classList.add('tagList');

  object.tags.forEach((tag) => {
    ul.appendChild(createTag(tag));
  });

  return ul;
};

const createContactBtn = () => {
  const btn = document.createElement('button');
  btn.classList.add('button');
  btn.appendChild(document.createTextNode('Contactez-moi'));

  return btn;
};

const createPhotographerArticle = (object) => {
  const elementBEMName = 'thumbnail';

  const article = document.createElement('article');
  article.classList.add(elementBEMName);

  const link = document.createElement('a');
  link.setAttribute('href', `photographer.html?id=${object.id}`);
  link.classList.add(`${elementBEMName}__link`);

  const portrait = createIMGElement(`thumbnails/${object.portrait}`, object.name);

  const title = createHeadingElement(object.name, 'h2');

  link.append(portrait, title);

  const paragraph = document.createElement('p');

  const localisation = createSPANElement(`${object.city}, ${object.country}`, `${elementBEMName}__localisation`);
  const slogan = createSPANElement(object.tagline, `${elementBEMName}__slogan`);
  const price = createSPANElement(`${object.price}€/jour`, `${elementBEMName}__price`);

  paragraph.append(localisation, slogan, price);

  const ul = createPhotographerTagList(object);

  article.append(link, paragraph, ul);

  return article;
};

const createPhotographerHeader = (object) => {
  const elementBEMName = 'photograph-header__infos';

  const section = document.createElement('section');
  section.classList.add('photograph-header');

  const div = createDIVElement(elementBEMName);
  const title = createHeadingElement(object.name, 'h1');

  const paragraph = document.createElement('p');

  const localisation = createSPANElement(`${object.city}, ${object.country}`, `${elementBEMName}__localisation`);
  const slogan = createSPANElement(object.tagline, `${elementBEMName}__slogan`);

  paragraph.append(localisation, slogan);

  const ul = createPhotographerTagList(object);

  const contact = createContactBtn();

  div.append(title, paragraph, ul, contact);

  const portrait = createIMGElement(`thumbnails/${object.portrait}`, object.name);

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
  const img = createIMGElement(`${id}/${imageMin}`);

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
  const span = createSPANElement(title);
  const div = createDIVElement();
  const likesSpan = createSPANElement(likes);
  const img = createIMGElement('like-icon.svg', 'likes');

  div.append(likesSpan, img);
  figcaption.append(span, div);
  return figcaption;
};

const createFigure = (object) => {
  const figure = document.createElement('figure');
  figure.classList.add('figure');

  const link = document.createElement('a');
  link.setAttribute('href', '');

  let media;
  if (object.image !== undefined) {
    media = createPicture(object.photographerId, object.image);
  } else {
    media = createVideo(object.photographerId, object.video);
  }
  link.appendChild(media);

  const caption = createFigcaption(object.title, object.likes);

  figure.append(link, caption);
  return figure;
};

const createSelectGroup = () => {
  const divGroup = createDIVElement('select-group');

  const label = document.createElement('label');
  label.setAttribute('for', 'js-sort');
  label.setAttribute('id', 'ariaLabel');
  label.appendChild(document.createTextNode('Trier par'));

  const divSelect = createDIVElement('select');

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

  const liLikes = createSelectLIElement('likes', 'Popularité', true);
  const liDate = createSelectLIElement('date', 'Date');
  const liTitle = createSelectLIElement('titre', 'Titre');
  ul.append(liLikes, liDate, liTitle);

  const img = createIMGElement('expand-more.svg', 'expand list indicator');

  divSelect.append(btn, ul, img);
  divGroup.append(label, divSelect);

  return divGroup;
};

const createFigureGroup = (array) => {
  const figureGroup = document.createElement('figure');
  figureGroup.setAttribute('role', 'group');
  figureGroup.setAttribute('id', 'js-figureGroup');
  figureGroup.classList.add('figure-group');

  array.forEach((media) => {
    figureGroup.appendChild(createFigure(media));
  });

  return figureGroup;
};

const getTotalLikes = (medias) => {
  let totalLikes = 0;
  medias.forEach((media) => {
    totalLikes += media.likes;
  });

  return totalLikes;
};

const createTotalLikesDiv = (medias) => {
  const div = createDIVElement('meta-infos__likes');
  const totalLikes = getTotalLikes(medias);
  const span = createSPANElement(totalLikes);
  const img = createIMGElement('like-icon-black.svg', 'likes');
  div.append(span, img);
  return div;
};

const isSameTagText = (tag, tagClicked) => {
  return tag.textContent.toLowerCase() === tagClicked.textContent.toLowerCase();
};

const switchTagActiveState = (tags, clickedTag) => {
  /*
    Parse all tags from Document
    Remove active class from tag if clicked tag is already active
    Add active class if tag is the same value as clicked tag
  */
  tags.forEach((tag) => {
    if (tag.classList.contains('active') || isSameTagText(tag, clickedTag)) {
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
  const thumbnailList = document.getElementById('js-articleList');

  for (const tag of photographTagSet) {
    navUl.appendChild(createTag(tag));
  }

  photographers.forEach((photograph) => {
    thumbnailList.appendChild(createPhotographerArticle(photograph));
  });
};

const constructPhotographPage = (json, id) => {
  const photographMain = document.getElementById('js-main');
  const medias = [];
  let metaInfos = createDIVElement('meta-infos');

  json.photographers.forEach((photographer) => {
    if (photographer.id === id) {
      document.title = `Fisheye - ${photographer.name}`;
      photographMain.appendChild(createPhotographerHeader(photographer));
      metaInfos.appendChild(createSPANElement(`${photographer.price}€/jour`));
    }
  });

  json.media.forEach((media) => {
    if (media.photographerId === id) {
      medias.push(media);
    }
  });

  metaInfos.prepend(createTotalLikesDiv(medias));
  photographMain.append(createSelectGroup(), createFigureGroup(medias), metaInfos);
};

const loadAllEventListeners = () => {
  const tags = document.querySelectorAll('.tag');

  tags.forEach((tag) => tag.addEventListener('click', () => handleTagClick(tags, tag)));

  window.addEventListener('scroll', displayBackToTopBtn);
};

const displayPageByURLQuery = (json, URLQuery) => {
  const URLParams = new URLSearchParams(URLQuery);
  const id = parseInt(URLParams.get('id'));

  if (isNaN(id)) {
    // HOMEPAGE
    constructHomepage(json.photographers);
    loadAllEventListeners();
  } else {
    // PHOTOGRAPHE PAGE
    constructPhotographPage(json, id);
  }
};

async function onLoad() {
  const json = await getJSON();
  const URLQuery = window.location.search;

  displayPageByURLQuery(json, URLQuery);
}

document.addEventListener('DOMContentLoaded', onLoad);
