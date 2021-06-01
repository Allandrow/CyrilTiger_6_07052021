import * as dom from './dom.js';
import * as utils from './utils.js';

const getJSON = async () => {
  const data = await fetch('dist/js/data/fisheyedata.json');
  const json = await data.json();
  return json;
};

class Filters {
  static createSelect(filters) {
    return dom.createSelectGroup(filters);
  }

  static changeSelectedFilter(option) {
    if (option.getAttribute('aria-selected') !== 'true') {
      document
        .querySelector('#js-select li[aria-selected="true"]')
        .setAttribute('aria-selected', 'false');
      option.setAttribute('aria-selected', 'true');
    }
  }

  static changeBtnText(option, btn) {
    btn.innerText = option.innerText;
  }

  static expandListBox(btn) {
    btn.setAttribute('aria-expanded', 'true');
    btn.nextElementSibling.classList.add('open');
  }

  static collapseListBox(btn) {
    btn.setAttribute('aria-expanded', 'false');
    btn.nextElementSibling.classList.remove('open');
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
    if (
      tag.classList.contains('active') ||
      utils.isSameTagText(tag, clickedTag)
    ) {
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

const loadFiltersEventListeners = () => {
  const selectListItems = document.querySelectorAll('#js-select li');
  const sortBtn = document.getElementById('js-sort');
  const selectList = document.getElementById('js-select');

  sortBtn.addEventListener('mouseenter', () => {
    Filters.expandListBox(sortBtn);
  });
  selectList.addEventListener('mouseleave', () => {
    Filters.collapseListBox(sortBtn);
  });
  sortBtn.addEventListener('focus', () => {
    Filters.expandListBox(sortBtn);
  });
  selectListItems.forEach((option) => {
    option.addEventListener('click', () => {
      Filters.changeSelectedFilter(option);
      Filters.changeBtnText(option, sortBtn);
      Filters.collapseListBox(sortBtn);
    });
    option.addEventListener('focusout', () => {
      if (option === selectList.lastElementChild) {
        Filters.collapseListBox(sortBtn);
      }
    });
  });
};

const constructHomepage = (photographers, id, main) => {
  document.body.prepend(dom.createHeader(id, photographers), main);
  main.classList.add('thumbnail-list');

  photographers.forEach((photographer) => {
    main.appendChild(dom.createPhotographerArticle(photographer));
  });

  main.appendChild(dom.createBackToTopBtn());

  const tags = document.querySelectorAll('.tag');

  tags.forEach((tag) =>
    tag.addEventListener('click', () => handleTagClick(tags, tag))
  );

  window.addEventListener('scroll', displayBackToTopBtn);
};

const constructPhotographPage = (json, id, main) => {
  const photographer = json.photographers.find(
    (photographer) => photographer.id === id
  );
  const medias = json.media.filter((media) => media.photographerId === id);

  document.title += ` - ${photographer.name}`;

  main.append(
    dom.createPhotographerHeader(photographer),
    Filters.createSelect(selectFilters),
    dom.createFigureGroup(medias),
    dom.createLikesAndPriceDiv(medias, photographer)
  );

  document.body.prepend(dom.createHeader(id), main);

  loadFiltersEventListeners();
};

const displayPageByURLQuery = (json, URLQuery) => {
  const URLParams = new URLSearchParams(URLQuery);
  const id = parseInt(URLParams.get('id'));

  const main = document.createElement('main');
  main.id = 'js-main';

  if (isFinite(id)) {
    constructPhotographPage(json, id, main);
  } else {
    constructHomepage(json.photographers, id, main);
  }
};

async function onLoad() {
  const json = await getJSON();
  const URLQuery = window.location.search;

  displayPageByURLQuery(json, URLQuery);
}

document.addEventListener('DOMContentLoaded', onLoad);
