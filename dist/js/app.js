const getJSON = async () => {
  const data = await fetch('dist/js/data/fisheyedata.json');
  const json = await data.json();
  return json;
};

const getPhotographTagSet = (data) => {
  const tagSet = new Set();

  data.photographers.forEach((photograph) => {
    photograph.tags.forEach((tag) => {
      tagSet.add(tag);
    });
  });
  return tagSet;
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const createDOMItemListLinkElement = (textNode) => {
  const li = document.createElement('li');

  const link = document.createElement('a');
  link.classList += 'tag';

  const span = document.createElement('span');

  const text = capitalizeFirstLetter(textNode);

  span.appendChild(document.createTextNode(`#${text}`));

  link.appendChild(span);
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
  const thumbnail = 'thumbnail';

  const article = document.createElement('article');
  article.classList += thumbnail;

  const link = document.createElement('a');
  link.setAttribute('href', '#');
  link.classList += `${thumbnail}__link`;

  const img = document.createElement('img');
  img.setAttribute('src', `dist/img/thumbnails/${object.portrait}`);
  img.setAttribute('alt', object.name);

  const title = document.createElement('h2');
  title.appendChild(document.createTextNode(object.name));

  link.append(img, title);

  const paragraph = document.createElement('p');

  const localisation = document.createElement('span');
  localisation.classList += `${thumbnail}__localisation`;
  localisation.appendChild(document.createTextNode(`${object.city}, ${object.country}`));

  const slogan = document.createElement('span');
  slogan.classList += `${thumbnail}__slogan`;
  slogan.appendChild(document.createTextNode(object.tagline));

  const price = document.createElement('span');
  price.classList += `${thumbnail}__price`;
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

async function onLoad() {
  const json = await getJSON();

  generateDOMNavigationTagList(json);

  generateDOMThumbnailList(json.photographers);
}

document.addEventListener('DOMContentLoaded', onLoad());
