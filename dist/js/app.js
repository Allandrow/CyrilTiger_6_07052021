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

  data.photographers.forEach((photograph) => {
    photograph.tags.forEach((tag) => {
      tagSet.add(uppercaseFirstLetter(tag));
    });
  });
  return tagSet;
};

const createDOMItemListLinkElement = (tagText) => {
  const li = document.createElement('li');

  const link = document.createElement('a');
  link.classList += 'tag';
  link.setAttribute('href', '#');
  link.setAttribute('aria-label', 'tag');

  const span = document.createElement('span');
  span.appendChild(document.createTextNode(tagText));

  link.append(document.createTextNode('#'), span);
  li.appendChild(link);

  return li;
};

const generateDOMNavigationTagList = (data) => {
  const navUl = document.getElementById('js-nav');
  const photographTagSet = getPhotographTagSet(data);

  for (const tag of photographTagSet) {
    navUl.appendChild(createDOMItemListLinkElement(tag));
  }
};

const createDOMThumbnailElement = (object) => {
  const elementBEMName = 'thumbnail';

  const article = document.createElement('article');
  article.classList += elementBEMName;

  const link = document.createElement('a');
  link.setAttribute('href', '#');
  link.classList += `${elementBEMName}__link`;

  const img = document.createElement('img');
  img.setAttribute('src', `dist/img/thumbnails/${object.portrait}`);
  img.setAttribute('alt', object.name);

  const title = document.createElement('h2');
  title.appendChild(document.createTextNode(object.name));

  link.append(img, title);

  const paragraph = document.createElement('p');

  const localisation = document.createElement('span');
  localisation.classList += `${elementBEMName}__localisation`;
  localisation.appendChild(document.createTextNode(`${object.city}, ${object.country}`));

  const slogan = document.createElement('span');
  slogan.classList += `${elementBEMName}__slogan`;
  slogan.appendChild(document.createTextNode(object.tagline));

  const price = document.createElement('span');
  price.classList += `${elementBEMName}__price`;
  price.appendChild(document.createTextNode(`${object.price}&euro;/jour`));

  paragraph.append(localisation, slogan, price);

  const ul = document.createElement('ul');
  ul.classList += 'tagList';

  object.tags.forEach((tag) => {
    ul.appendChild(createDOMItemListLinkElement(tag));
  });

  article.append(link, paragraph, ul);

  return article;
};

const generateDOMThumbnailList = (photographers) => {
  const thumbnailList = document.getElementById('js-thumbnailList');

  photographers.forEach((photograph) => {
    thumbnailList.appendChild(createDOMThumbnailElement(photograph));
  });
};

const filterThumbnailByTag = (tag) => {
  const tagText = tag.textContent;
  const photographers = document.querySelectorAll('.thumbnail');

  photographers.forEach((photograph) => {
    const tagList = photograph.lastElementChild.children;
    photograph.classList.remove('hidden');

    for (const tag of tagList) {
      if (tag.textContent === tagText.toLowerCase()) {
        return true;
      }
    }
    photograph.classList.toggle('hidden');
  });
};

const loadAllEventListeners = () => {
  const tags = document.querySelectorAll('.tag');

  tags.forEach((tag) => tag.addEventListener('click', () => filterThumbnailByTag(tag)));
};

async function onLoad() {
  const json = await getJSON();

  generateDOMNavigationTagList(json);

  generateDOMThumbnailList(json.photographers);

  loadAllEventListeners();
}

document.addEventListener('DOMContentLoaded', onLoad);
