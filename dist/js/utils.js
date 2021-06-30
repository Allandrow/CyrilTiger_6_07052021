export const createIMG = (path, alt = '') => {
  const img = document.createElement('img');
  img.setAttribute('src', `dist/img/${path}`);
  img.setAttribute('alt', alt);
  img.setAttribute('loading', 'lazy');
  return img;
};

export const createLogo = () => {
  const logo = document.createElement('a');
  logo.href = 'index.html';
  logo.appendChild(createIMG('logo.svg', 'FishEye Home Page'));
  return logo;
};

const createTag = (tagText) => {
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

export const createTagList = (tags) => {
  const ul = document.createElement('ul');
  ul.classList.add('tag-list');

  for (const tag of tags) {
    ul.appendChild(createTag(tag));
  }

  return ul;
};

const uppercaseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getPhotographTagSet = (photographers) => {
  const tagSet = new Set();
  photographers.forEach((photographer) => {
    photographer.tags.forEach((tag) => {
      tagSet.add(uppercaseFirstLetter(tag));
    });
  });
  return tagSet;
};

export const isSameTagText = (tag, tagClicked) => {
  return tag.textContent.toLowerCase() === tagClicked.textContent.toLowerCase();
};

export const getMediaLikes = (medias) => {
  const mediaLikes = medias.map((media) => media.likes);
  return mediaLikes.reduce((total, likes) => total + likes);
};

export const isImage = (media) => media.image !== undefined;

export const sortFigureByPopularity = (a, b) => {
  return parseInt(b.getAttribute('data-likes')) - parseInt(a.getAttribute('data-likes'));
};

export const sortMediaByPopularity = (a, b) => {
  return b.likes - a.likes;
};

export const sortFigureByDate = (a, b) => {
  const firstDate = new Date(a.getAttribute('data-date'));
  const secondDate = new Date(b.getAttribute('data-date'));

  return firstDate - secondDate;
};

export const sortMediaByDate = (a, b) => {
  const firstDate = new Date(a.date);
  const secondDate = new Date(b.date);

  return firstDate - secondDate;
};

export const sortFigureByTitle = (a, b) => {
  const firstTitle = a.getAttribute('data-title').toLowerCase();
  const secondTitle = b.getAttribute('data-title').toLowerCase();

  if (firstTitle < secondTitle) {
    return -1;
  }
  if (firstTitle > secondTitle) {
    return 1;
  }
  return 0;
};

export const sortMediaByTitle = (a, b) => {
  const firstTitle = a.title.toLowerCase();
  const secondTitle = b.title.toLowerCase();

  if (firstTitle < secondTitle) {
    return -1;
  }
  if (firstTitle > secondTitle) {
    return 1;
  }
  return 0;
};
