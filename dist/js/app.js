const getData = async (json) => {
  const data = await fetch('./fisheyedata.json');
  json = await data.json();
  return json;
};

const getNavigationTags = async (json) => {
  let array = [];

  const data = await getData(json);
  await data.photographers.forEach((photograph) => {
    photograph.tags.forEach((tag) => {
      array = [...new Set([...array, tag])];
    });
  });
  return array;
};

const createItemListLink = (parent, textNode) => {
  const li = document.createElement('li');
  const link = document.createElement('a');
  link.setAttribute('href', '#');
  const span = document.createElement('span');
  span.appendChild(document.createTextNode(textNode));
  link.appendChild(span);
  li.appendChild(link);
  parent.appendChild(li);
};

const createNavigationList = async (json) => {
  const nav = document.getElementById('js-nav');
  const ul = document.createElement('ul');
  const tags = await getNavigationTags(json);

  tags.forEach((tag) => {
    createItemListLink(ul, tag);
  });
  nav.appendChild(ul);
};

const json = [];

createNavigationList(json);
