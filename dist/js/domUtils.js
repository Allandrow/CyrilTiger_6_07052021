export const createDIVElement = (className = null) => {
  const div = document.createElement('div');
  if (className !== null) {
    div.classList.add(className);
  }
  return div;
};

export const createHeadingElement = (name, heading = 'h2') => {
  const title = document.createElement(heading);
  title.appendChild(document.createTextNode(name));
  return title;
};

export const createIMGElement = (path, alt = '') => {
  const img = document.createElement('img');
  img.setAttribute('src', `dist/img/${path}`);
  img.setAttribute('alt', alt);
  return img;
};

export const createSPANElement = (text, className = null) => {
  const span = document.createElement('span');
  if (className !== null) {
    span.classList.add(className);
  }
  span.appendChild(document.createTextNode(text));
  return span;
};

export const createSelectLIElement = (id, text, ariaSelected = false) => {
  const li = document.createElement('li');
  li.setAttribute('role', 'option');
  li.setAttribute('id', `sort-${id}`);
  li.setAttribute('aria-selected', ariaSelected);
  li.setAttribute('aria-labelledBy', 'ariaLabel');
  li.appendChild(document.createTextNode(text));

  return li;
};
