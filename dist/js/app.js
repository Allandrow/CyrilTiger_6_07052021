// DOM Elements
const navUl = document.getElementById('js-nav');

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

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const createItemListLinkElement = (textNode) => {
  const li = document.createElement('li');

  const link = document.createElement('a');
  link.classList += 'tag';

  const span = document.createElement('span');

  const text = capitalize(textNode);

  span.appendChild(document.createTextNode(`#${text}`));

  link.appendChild(span);
  li.appendChild(link);

  return li;
};

const createThumbnailDOMElement = (imgUrl, name, localisationText, sloganText, priceNumber, tagsList) => {
  const thumbnail = 'thumbnail';

  const div = document.createElement('div');
  div.classList += thumbnail;

  const link = document.createElement('a');
  link.setAttribute('href', '#');
  link.classList += `${thumbnail}__link`;

  const img = document.createElement('img');
  img.setAttribute('src', imgUrl);
  img.setAttribute('alt', name);

  const title = document.createElement('h2');
  title.appendChild(document.createTextNode(name));

  link.append(img, title);

  const paragraph = document.createElement('p');

  const localisation = document.createElement('span');
  localisation.classList += `${thumbnail}__localisation`;
  localisation.appendChild(document.createTextNode(localisationText));

  const slogan = document.createElement('span');
  slogan.classList += `${thumbnail}__slogan`;
  slogan.appendChild(document.createTextNode(sloganText));

  const price = document.createElement('span');
  price.classList += `${thumbnail}__price`;
  price.appendChild(document.createTextNode(`${priceNumber}&euro;/jour`));

  paragraph.append(localisation, slogan, price);

  div.append(link, paragraph);

  return div;
};

const generateDOMTagList = (collection, listDOM) => {
  for (const item of collection) {
    listDOM.appendChild(createItemListLinkElement(item));
  }
};

const generateDOMThumbnail = (object) => {
  const thumbnailImgURL = `dist/img/thumbnails/${object.portrait}`;
  const thumbnailName = object.name;
  const thumbnailLocalisation = `${object.city}, ${object.country}`;
  const thumbnailSlogan = object.tagline;
  const thumbnailPrice = object.price;
  const thumbnailTags = object.tags;

  const thumbnailList = document.getElementById('js-thumbnailList');

  thumbnailList.appendChild(
    createThumbnailDOMElement(
      thumbnailImgURL,
      thumbnailName,
      thumbnailLocalisation,
      thumbnailSlogan,
      thumbnailPrice,
      thumbnailTags
    )
  );
};

async function onLoad() {
  const json = await getJSON();
  const photographTagSet = getPhotographTagSet(json);

  generateDOMTagList(photographTagSet, navUl);

  json.photographers.forEach((photograph) => {
    generateDOMThumbnail(photograph);
  });
}

document.addEventListener('DOMContentLoaded', onLoad());
