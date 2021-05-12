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

const generateDOMTagList = (collection, listDOM) => {
  for (const item of collection) {
    listDOM.appendChild(createItemListLinkElement(item));
  }
};

async function onLoad() {
  const json = await getJSON();
  const photographTagSet = await getPhotographTagSet(json);
  await generateDOMTagList(photographTagSet, navUl);
}

document.addEventListener('DOMContentLoaded', onLoad());
