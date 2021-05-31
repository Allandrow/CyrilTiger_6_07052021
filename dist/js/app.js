import * as DOM from './dom.js';
import * as UTILS from './utils.js';

const getJSON = async () => {
  const data = await fetch('dist/js/data/fisheyedata.json');
  const json = await data.json();
  return json;
};

class Select {
  constructor(filters) {
    this.filters = filters;
  }

  static createSelect(filters) {
    return DOM.createSelectGroup(filters);
  }
}

const selectFilters = ['Popularité', 'Date', 'Titre'];

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
    Select.createSelect(selectFilters),
    DOM.createFigureGroup(medias),
    DOM.createMetaInfos(medias, photographer)
  );
};

const displayPageByURLQuery = (json, URLQuery) => {
  const URLParams = new URLSearchParams(URLQuery);
  const id = parseInt(URLParams.get('id'));

  if (isFinite(id)) {
    constructPhotographPage(json, id);
  } else {
    constructHomepage(json.photographers, id);
  }
};

async function onLoad() {
  const json = await getJSON();
  const URLQuery = window.location.search;

  displayPageByURLQuery(json, URLQuery);
}

document.addEventListener('DOMContentLoaded', onLoad);
