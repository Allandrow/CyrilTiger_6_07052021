const getJSON = async () => {
  const data = await fetch('dist/js/data/fisheyedata.json');
  const json = await data.json();
  return json;
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

const createTagDOMElement = (tagText) => {
  const li = document.createElement('li');

  const link = document.createElement('a');
  link.classList.add('tag');
  link.setAttribute('href', '#');
  link.setAttribute('aria-label', 'tag');

  const span = document.createElement('span');
  span.appendChild(document.createTextNode(tagText));

  link.append(document.createTextNode('#'), span);
  li.appendChild(link);

  return li;
};

const appendTagsToNavigation = (data) => {
  const navUl = document.getElementById('js-nav');
  const photographTagSet = getPhotographTagSet(data);

  for (const tag of photographTagSet) {
    navUl.appendChild(createTagDOMElement(tag));
  }
};

const createPhotographerPortrait = (object) => {
  const img = document.createElement('img');
  img.setAttribute('src', `dist/img/thumbnails/${object.portrait}`);
  img.setAttribute('alt', object.name);
  return img;
};

const createPhotographerTitle = (object, heading) => {
  const title = document.createElement(heading);
  title.appendChild(document.createTextNode(object.name));
  return title;
};

const createPhotographerLocalisation = (object, className) => {
  const localisation = document.createElement('span');
  localisation.classList.add(`${className}__localisation`);
  localisation.appendChild(document.createTextNode(`${object.city}, ${object.country}`));
  return localisation;
};

const createPhotographerSlogan = (object, className) => {
  const slogan = document.createElement('span');
  slogan.classList.add(`${className}__slogan`);
  slogan.appendChild(document.createTextNode(object.tagline));
  return slogan;
};

const createPhotographerPrice = (object, className) => {
  const price = document.createElement('span');
  price.classList.add(`${className}__price`);
  price.appendChild(document.createTextNode(`${object.price}€/jour`));
  return price;
};

const createPhotographerTagList = (object) => {
  const ul = document.createElement('ul');
  ul.classList.add('tagList');

  object.tags.forEach((tag) => {
    ul.appendChild(createTagDOMElement(tag));
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

  const portrait = createPhotographerPortrait(object);

  const title = createPhotographerTitle(object, 'h2');

  link.append(portrait, title);

  const paragraph = document.createElement('p');

  const localisation = createPhotographerLocalisation(object, elementBEMName);

  const slogan = createPhotographerSlogan(object, elementBEMName);

  const price = createPhotographerPrice(object, elementBEMName);

  paragraph.append(localisation, slogan, price);

  const ul = createPhotographerTagList(object);

  article.append(link, paragraph, ul);

  return article;
};

const createPhotographerHeader = (object) => {
  const elementBEMName = 'photograph-header__infos';

  const section = document.createElement('section');
  section.classList.add('photograph-header');

  const div = document.createElement('div');
  div.classList.add(`${elementBEMName}`);

  const title = createPhotographerTitle(object, 'h1');

  const paragraph = document.createElement('p');

  const localisation = createPhotographerLocalisation(object, elementBEMName);

  const slogan = createPhotographerSlogan(object, elementBEMName);

  paragraph.append(localisation, slogan);

  const ul = createPhotographerTagList(object);

  const contact = createContactBtn();

  div.append(title, paragraph, ul, contact);

  const portrait = createPhotographerPortrait(object);

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
  const img = document.createElement('img');
  img.setAttribute('src', `dist/img/${id}/${imageMin}`);

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

const createCaption = (title, likes) => {
  const figcaption = document.createElement('figcaption');

  const paragraph = document.createElement('p');
  paragraph.appendChild(document.createTextNode(title));

  const div = document.createElement('div');

  const span = document.createElement('span');
  span.appendChild(document.createTextNode(likes));

  const img = document.createElement('img');
  img.setAttribute('src', 'dist/img/like-icon.svg');
  img.setAttribute('alt', 'likes');

  div.append(span, img);

  figcaption.append(paragraph, div);

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

  const caption = createCaption(object.title, object.likes);

  figure.append(link, caption);
  return figure;
};

const createSelectGroup = () => {
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
  btn.setAttribute('aria-haspopup', 'listbox');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-labelledBy', 'ariaLabel');
  btn.appendChild(document.createTextNode('Popularité'));

  const ul = document.createElement('ul');
  ul.setAttribute('id', 'select-list');
  ul.setAttribute('role', 'listbox');
  ul.setAttribute('aria-activedescendant', 'sort-likes');

  const liLikes = document.createElement('li');
  liLikes.setAttribute('role', 'option');
  liLikes.setAttribute('id', 'sort-likes');
  liLikes.setAttribute('aria-selected', 'true');
  liLikes.setAttribute('aria-labelledBy', 'ariaLabel');
  liLikes.appendChild(document.createTextNode('Popularité'));

  const liDate = document.createElement('li');
  liDate.setAttribute('role', 'option');
  liDate.setAttribute('id', 'sort-date');
  liDate.setAttribute('aria-selected', 'false');
  liDate.setAttribute('aria-labelledBy', 'ariaLabel');
  liDate.appendChild(document.createTextNode('Date'));

  const liTitle = document.createElement('li');
  liTitle.setAttribute('role', 'option');
  liTitle.setAttribute('id', 'sort-title');
  liTitle.setAttribute('aria-selected', 'false');
  liTitle.setAttribute('aria-labelledBy', 'ariaLabel');
  liTitle.appendChild(document.createTextNode('Titre'));

  ul.append(liLikes, liDate, liTitle);

  const img = document.createElement('img');
  img.setAttribute('src', 'dist/img/expand-more.svg');
  img.setAttribute('alt', 'expand list indicator');

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
  const div = document.createElement('div');
  div.classList.add('meta-infos__likes');
  const span = document.createElement('span');
  span.appendChild(document.createTextNode(getTotalLikes(medias)));
  const img = document.createElement('img');
  img.setAttribute('src', 'dist/img/like-icon-black.svg');
  img.setAttribute('alt', 'likes');
  div.append(span, img);
  return div;
};

const createMetaInfos = () => {
  const div = document.createElement('div');
  div.classList.add('meta-infos');

  return div;
};

const appendPhotographerArticlesToList = (photographers) => {
  const thumbnailList = document.getElementById('js-articleList');

  photographers.forEach((photograph) => {
    thumbnailList.appendChild(createPhotographerArticle(photograph));
  });
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

// TODO : modify to adapt eventlisterners used according to page
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
    appendTagsToNavigation(json.photographers);

    appendPhotographerArticlesToList(json.photographers);

    loadAllEventListeners();
  } else {
    // PAGE PHOTOGRAPHE
    const photographMain = document.getElementById('js-main');
    let metaInfos = createMetaInfos();
    json.photographers.forEach((photographer) => {
      if (photographer.id === id) {
        document.title = `Fisheye - ${photographer.name}`;
        photographMain.appendChild(createPhotographerHeader(photographer));
        metaInfos.appendChild(createPhotographerPrice(photographer, 'meta-infos'));
      }
    });
    const medias = [];

    json.media.forEach((media) => {
      if (media.photographerId === id) {
        medias.push(media);
      }
    });

    photographMain.append(createSelectGroup(), createFigureGroup(medias));

    const totalLikes = createTotalLikesDiv(medias);
    metaInfos.prepend(totalLikes);
    photographMain.appendChild(metaInfos);
  }
};

async function onLoad() {
  const json = await getJSON();
  const URLQuery = window.location.search;

  displayPageByURLQuery(json, URLQuery);
}

document.addEventListener('DOMContentLoaded', onLoad);
