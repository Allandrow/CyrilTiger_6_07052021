const getData = async () => {
  const data = await fetch('dist/js/data/fisheyedata.json');
  const json = await data.json();
  return json;
};

const getNavigationTags = async () => {
  const tagSet = new Set();

  const data = await getData();
  data.photographers.forEach((photograph) => {
    photograph.tags.forEach((tag) => {
      tagSet.add(tag);
    });
  });
  return tagSet;
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

const createNavigationList = async () => {
  const nav = document.getElementById('js-nav');
  const ul = document.createElement('ul');
  const tags = await getNavigationTags();

  tags.forEach((tag) => {
    createItemListLink(ul, tag);
  });
  nav.appendChild(ul);
};

createNavigationList();
