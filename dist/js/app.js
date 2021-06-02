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

  static changeFilterBtnContent(option, btn) {
    btn.innerText = option.innerText;
    btn.setAttribute('data-sort', option.id.slice(5));
  }

  static expandListBox(btn) {
    btn.setAttribute('aria-expanded', 'true');
    btn.nextElementSibling.classList.add('open');
  }

  static collapseListBox(btn) {
    btn.setAttribute('aria-expanded', 'false');
    btn.nextElementSibling.classList.remove('open');
  }

  static sortByFilter() {
    const filterType = document.getElementById('js-sort').getAttribute('data-sort');
    const figures = Array.from(document.querySelectorAll('#js-figureGroup .figure'));

    switch (filterType) {
      case 'likes':
        figures.sort(utils.sortByLikes);
        break;
      case 'date':
        figures.sort(utils.sortByDate);
        break;
      case 'titre':
        figures.sort(utils.sortByTitle);
        break;
    }

    for (const figure of figures) {
      figure.parentNode.appendChild(figure);
    }
  }
}

// TODO : add this array in Filters constructor
const selectFilters = ['Popularité', 'Date', 'Titre'];

const switchTagActiveState = (tags, clickedTag) => {
  /*
    Parse all tags from Document
    Toggle active class from tag if clicked tag is already active
    OR if tag is the same value as clicked tag
  */
  tags.forEach((tag) => {
    if (tag.classList.contains('active') || utils.isSameTagText(tag, clickedTag)) {
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
      Filters.changeFilterBtnContent(option, sortBtn);
      Filters.collapseListBox(sortBtn);
      Filters.sortByFilter();
    });
    option.addEventListener('focusout', () => {
      if (option === selectList.lastElementChild) {
        Filters.collapseListBox(sortBtn);
      }
    });
  });
};

const updateTotalLikesCount = (operation) => {
  const totalLikesCountElement = document.querySelector('.meta-infos__likes span');
  let totalLikesCount = parseInt(totalLikesCountElement.innerText);

  operation === 'add' ? totalLikesCount++ : totalLikesCount--;

  totalLikesCountElement.innerText = totalLikesCount;
};

const loadLikesEventListener = () => {
  const mediaLikeIcons = document.querySelectorAll('.js-like');
  mediaLikeIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
      const likeFigure = icon.closest('.figure');
      let likeCount = parseInt(likeFigure.getAttribute('data-likes'));

      if (icon.getAttribute('data-liked') === 'true') {
        likeCount--;
        icon.setAttribute('data-liked', 'false');
        updateTotalLikesCount('substract');
      } else {
        likeCount++;
        icon.setAttribute('data-liked', 'true');
        updateTotalLikesCount('add');
      }

      likeFigure.setAttribute('data-likes', likeCount);
      icon.previousElementSibling.textContent = likeCount;
    });
  });
};

const loadModalEventListeners = () => {
  const contactBtn = document.getElementById('js-contactForm');
  const modal = document.getElementById('contact-modal');

  contactBtn.addEventListener('click', () => {
    modal.classList.toggle('open');
  });

  const modalButtons = modal.querySelectorAll('button');

  modalButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      if (button.id === 'js-submit') {
        const firstName = document.getElementById('formFirstName').value;
        const lastName = document.getElementById('formLastName').value;
        const email = document.getElementById('formEmail').value;
        const message = document.getElementById('formMessage').value;

        console.log(`Prénom : ${firstName}`);
        console.log(`Nom : ${lastName}`);
        console.log(`Email : ${email}`);
        console.log(`Message : ${message}`);
      }
      modal.classList.toggle('open');
    });
  });
};

const constructHomepage = (photographers, id, wrapper, main) => {
  wrapper.append(dom.createHeader(id, photographers), main);
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

const constructPhotographPage = (json, id, wrapper, main) => {
  const photographer = json.photographers.find(
    (photographer) => photographer.id === id
  );
  const medias = json.media.filter((media) => media.photographerId === id);

  document.title += ` - ${photographer.name}`;

  medias.sort((a, b) => b.likes - a.likes);

  main.append(
    dom.createPhotographerHeader(photographer),
    Filters.createSelect(selectFilters),
    dom.createFigureGroup(medias),
    dom.createLikesAndPriceDiv(medias, photographer)
  );

  wrapper.append(dom.createHeader(id), main);

  document.body.insertBefore(
    dom.createContactModal(),
    document.querySelector('script')
  );

  loadFiltersEventListeners();

  loadLikesEventListener();

  loadModalEventListeners();
};

const displayPageByURLQuery = (json, URLQuery) => {
  const URLParams = new URLSearchParams(URLQuery);
  const id = parseInt(URLParams.get('id'));

  const wrapper = dom.createBodyContent();

  const main = document.createElement('main');
  main.id = 'js-main';

  if (isFinite(id)) {
    constructPhotographPage(json, id, wrapper, main);
  } else {
    constructHomepage(json.photographers, id, wrapper, main);
  }
};

async function onLoad() {
  const json = await getJSON();
  const URLQuery = window.location.search;

  displayPageByURLQuery(json, URLQuery);
}

document.addEventListener('DOMContentLoaded', onLoad);
