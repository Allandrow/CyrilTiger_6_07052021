import * as DOM from './dom.js';
import * as UTILS from './utils.js';

const getJSON = async () => {
  const data = await fetch('dist/js/data/fisheyedata.json');
  const json = await data.json();
  return json;
};

const createSelectGroup = () => {
  const divGroup = DOM.createDIV('select-group');

  const label = document.createElement('label');
  label.setAttribute('for', 'js-sort');
  label.setAttribute('id', 'ariaLabel');
  label.appendChild(document.createTextNode('Trier par'));

  const divSelect = DOM.createDIV('select');

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

  const liLikes = DOM.createSelectLI('likes', 'Popularité', true);
  const liDate = DOM.createSelectLI('date', 'Date');
  const liTitle = DOM.createSelectLI('titre', 'Titre');
  ul.append(liLikes, liDate, liTitle);

  const img = DOM.createIMG('expand-more.svg', 'expand list indicator');

  divSelect.append(btn, ul, img);
  divGroup.append(label, divSelect);

  return divGroup;
};

const switchTagActiveState = (tags, clickedTag) => {
  /*
    Parse all tags from Document
    Toggle active class from tag if clicked tag is already active
    OR if tag is the same value as clicked tag
  */
  tags.forEach((tag) => {
    if (tag.classList.contains('active') || UTILS.isSameTagText(tag, clickedTag)) {
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
  const activeTags = document.querySelectorAll('#js-main .active');

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

const constructHomepage = (photographers, id) => {
  document.body.prepend(DOM.createHeader(id, photographers));

  const main = document.getElementById('js-main');
  main.classList.add('thumbnail-list');

  photographers.forEach((photographer) => {
    main.appendChild(DOM.createPhotographerArticle(photographer));
  });

  const tags = document.querySelectorAll('.tag');

  tags.forEach((tag) => tag.addEventListener('click', () => handleTagClick(tags, tag)));

  window.addEventListener('scroll', displayBackToTopBtn);
};

const constructPhotographPage = (json, id) => {
  const photographer = json.photographers.find((photographer) => photographer.id === id);
  const medias = json.media.filter((media) => media.photographerId === id);

  document.title += ` - ${photographer.name}`;

  document.body.prepend(DOM.createHeader(id));

  const main = document.getElementById('js-main');
  main.append(
    DOM.createPhotographerHeader(photographer),
    createSelectGroup(),
    DOM.createFigureGroup(medias),
    DOM.createMetaInfos(medias, photographer)
  );
};

const displayPageByURLQuery = (json, URLQuery) => {
  const URLParams = new URLSearchParams(URLQuery);
  const id = parseInt(URLParams.get('id'));

  if (isFinite(id)) {
    // PHOTOGRAPHE PAGE
    constructPhotographPage(json, id);
  } else {
    // HOMEPAGE
    constructHomepage(json.photographers, id);
  }
};

async function onLoad() {
  const json = await getJSON();
  const URLQuery = window.location.search;

  displayPageByURLQuery(json, URLQuery);
}

document.addEventListener('DOMContentLoaded', onLoad);
