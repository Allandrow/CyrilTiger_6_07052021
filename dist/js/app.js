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

const createThumbnailDOMElement = (object) => {
  const elementBEMName = 'thumbnail';

  const article = document.createElement('article');
  article.classList.add(elementBEMName);
  article.setAttribute('data-id', object.id);

  const link = document.createElement('a');
  link.setAttribute('href', `photographer.html?id=${object.id}`);
  link.classList.add(`${elementBEMName}__link`);

  const img = document.createElement('img');
  img.setAttribute('src', `dist/img/thumbnails/${object.portrait}`);
  img.setAttribute('alt', object.name);

  const title = document.createElement('h2');
  title.appendChild(document.createTextNode(object.name));

  link.append(img, title);

  const paragraph = document.createElement('p');

  const localisation = document.createElement('span');
  localisation.classList.add(`${elementBEMName}__localisation`);
  localisation.appendChild(document.createTextNode(`${object.city}, ${object.country}`));

  const slogan = document.createElement('span');
  slogan.classList.add(`${elementBEMName}__slogan`);
  slogan.appendChild(document.createTextNode(object.tagline));

  const price = document.createElement('span');
  price.classList.add(`${elementBEMName}__price`);
  price.appendChild(document.createTextNode(`${object.price}&euro;/jour`));

  paragraph.append(localisation, slogan, price);

  const ul = document.createElement('ul');
  ul.classList.add('tagList');

  object.tags.forEach((tag) => {
    ul.appendChild(createTagDOMElement(tag));
  });

  article.append(link, paragraph, ul);

  return article;
};

const appendThumbnailsToThumbnailList = (photographers) => {
  const thumbnailList = document.getElementById('js-thumbnailList');

  photographers.forEach((photograph) => {
    thumbnailList.appendChild(createThumbnailDOMElement(photograph));
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

const displayActiveTagThumbnails = () => {
  // Hide thumbnails
  const thumbnails = document.querySelectorAll('.thumbnail');

  thumbnails.forEach((thumbnail) => {
    thumbnail.classList.add('hidden');
  });

  // Unhide thumbnails with active tag
  const activeTags = document.querySelectorAll('#js-thumbnailList .active');

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
  displayActiveTagThumbnails();
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

const loadAllEventListeners = () => {
  const tags = document.querySelectorAll('.tag');

  tags.forEach((tag) => tag.addEventListener('click', () => handleTagClick(tags, tag)));

  window.addEventListener('scroll', displayBackToTopBtn);
};

async function onLoad() {
  const json = await getJSON();

  appendTagsToNavigation(json.photographers);

  appendThumbnailsToThumbnailList(json.photographers);

  loadAllEventListeners();
}

document.addEventListener('DOMContentLoaded', onLoad);
