import * as dom from './dom.js';
import * as utils from './utils.js';

const getJSON = async () => {
  const data = await fetch('dist/js/data/fisheyedata.json');
  const json = await data.json();
  return json;
};

const handleTagClick = (tags, tagClicked) => {
  const thumbnails = document.querySelectorAll('.thumbnail');

  /*
    Parse all tags from Document
    Toggle active class from tag if clicked tag is already active
    OR if tag is the same value as clicked tag
  */
  tags.forEach((tag) => {
    if (tag.classList.contains('active') || utils.isSameTagText(tag, tagClicked)) {
      tag.classList.toggle('active');
    }
  });

  const activeTags = document.querySelectorAll('#js-main .active');

  if (activeTags.length === 0) {
    thumbnails.forEach((thumbnail) => thumbnail.classList.remove('hidden'));
    return;
  }

  thumbnails.forEach((thumbnail) => {
    thumbnail.classList.add('hidden');
  });

  activeTags.forEach((tag) => {
    const article = tag.closest('.thumbnail');
    article.classList.remove('hidden');
  });
};

const loadBackToTopBtnEventListeners = () => {
  const html = document.querySelector('html');
  const btn = document.getElementById('js-backToTop');

  window.addEventListener('scroll', () => {
    if (html.scrollTop <= 400) {
      btn.classList.add('hidden');
      return;
    }
    btn.classList.remove('hidden');
  });

  btn.addEventListener('click', () => {
    html.scrollTop = 0;
  });
};

const constructHomepage = (photographers, id, wrapper) => {
  wrapper.prepend(dom.createHeader(id, photographers));

  const main = document.getElementById('js-main');
  main.classList.add('thumbnail-list');

  photographers.forEach((photographer) => {
    main.appendChild(dom.createPhotographerArticle(photographer));
  });

  main.appendChild(dom.createBackToTopBtn());

  const tags = document.querySelectorAll('.tag');

  tags.forEach((tag) => tag.addEventListener('click', () => handleTagClick(tags, tag)));

  loadBackToTopBtnEventListeners();
};

class Filters {
  constructor(sortingOptions) {
    this.sortingOptions = sortingOptions;
  }

  createSelect(sortingOptions) {
    return dom.createSelectGroup(sortingOptions);
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

const openModal = (modal, btn) => {
  const wrapper = document.getElementById('js-container');

  modal.classList.add('open');
  wrapper.setAttribute('aria-hidden', 'true');
  btn.setAttribute('aria-expanded', 'true');
  window.addEventListener('keydown', contactModalKeyEvents);
};

const closeModal = (modal, btn) => {
  const wrapper = document.getElementById('js-container');

  modal.classList.remove('open');
  wrapper.setAttribute('aria-hidden', 'false');
  btn.setAttribute('aria-expanded', 'false');
  window.removeEventListener('keydown', contactModalKeyEvents);

  btn.focus();
};

const contactModalKeyEvents = (e) => {
  const modal = document.getElementById('contact-modal');
  const contactBtn = document.getElementById('js-contactForm');

  // Get a list of all focusable elements within modal
  const modalFocusableElements = Array.from(modal.querySelectorAll('.js-focusable'));
  // Save first and last focusable elements
  const firstFocusElement = modalFocusableElements[0];
  const lastFocusElement = modalFocusableElements[modalFocusableElements.length - 1];

  const tabKeyCode = 9;
  const escapeKeyCode = 27;
  const isTabPressed = e.key === 'Tab' || e.keyCode === tabKeyCode;
  const isEscapePressed = e.key === 'escape' || e.keyCode === escapeKeyCode;

  if (modal.classList.contains('open')) {
    if (!(isTabPressed || isEscapePressed)) {
      return;
    }
    // Escape key closes modal if inside
    if (isEscapePressed) {
      closeModal(modal, contactBtn);
      return;
    }
    // If Tab key
    if (isTabPressed) {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusElement) {
          e.preventDefault();
          lastFocusElement.focus();
          return;
        }
      } else {
        if (document.activeElement === lastFocusElement) {
          e.preventDefault();
          firstFocusElement.focus();
          return;
        }
      }
    }
    if (!modalFocusableElements.includes(document.activeElement)) {
      e.preventDefault();
      firstFocusElement.focus();
    }
  }
};

const loadContactModalEventListeners = () => {
  const contactBtn = document.getElementById('js-contactForm');
  const modal = document.getElementById('contact-modal');
  const closeBtn = modal.querySelector('.close');
  const form = modal.querySelector('form');
  const inputs = modal.querySelectorAll('.js-input');

  // Click to open modal event
  contactBtn.addEventListener('click', () => {
    openModal(modal, contactBtn);
  });

  // Click on close button to close modal
  closeBtn.addEventListener('click', () => {
    closeModal(modal, contactBtn);
  });

  // Form submission closes logs values + close modal
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    inputs.forEach((input) => {
      console.log(input.value);
    });
    closeModal(modal, contactBtn);
  });
};

const constructLightBoxMedias = () => {
  // Parse all medias in document
  const links = document.querySelectorAll('figure a');
  const modal = document.querySelector('.gallery-modal');
  const mediaBlock = modal.querySelector('.medias');
  mediaBlock.textContent = '';

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('close', 'js-focusable');
  mediaBlock.append(closeBtn);

  // for each, create a media in modal
  for (const link of links) {
    const isVideo = link.firstElementChild.tagName.toLowerCase() === 'video';

    const div = document.createElement('div');
    div.classList.add('media');

    // if video create a video, otherwise create an img
    if (isVideo) {
      const video = document.createElement('video');

      const source = document.createElement('source');
      source.setAttribute('src', link.pathname);
      source.setAttribute('type', 'video/mp4');
      video.appendChild(source);
      //TODO : set track element for captions

      div.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.setAttribute('src', link.pathname);
      //TODO : set alt text

      div.appendChild(img);
    }

    const paragraph = document.createElement('p');
    // get data-title from parent figure for text below media
    paragraph.appendChild(
      document.createTextNode(link.parentElement.getAttribute('data-title'))
    );

    div.appendChild(paragraph);

    mediaBlock.appendChild(div);
  }
};

const loadGalleryModalEventListeners = () => {
  const links = document.querySelectorAll('figure a');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      constructLightBoxMedias();
    });
  });

  // depending on document media clicked, set according modal media visible, others hidden
  // on arrows click, hide current modal media and display new media

  // console.log(links);
};

const constructPhotographPage = (json, id, wrapper) => {
  const main = document.getElementById('js-main');
  const filters = new Filters(['Popularité', 'Date', 'Titre']);

  const photographer = json.photographers.find((photographer) => photographer.id === id);
  document.title += ` - ${photographer.name}`;

  const medias = json.media.filter((media) => media.photographerId === id);
  medias.sort((a, b) => b.likes - a.likes);

  main.append(
    dom.createPhotographerHeader(photographer),
    filters.createSelect(filters.sortingOptions),
    dom.createFigureGroup(medias),
    dom.createLikesAndPriceDiv(medias, photographer)
  );

  wrapper.append(dom.createHeader(id), main);

  document.body.insertBefore(
    dom.createContactModal(photographer.name),
    document.querySelector('script')
  );

  document.body.insertBefore(dom.createGalleryModal(), document.querySelector('script'));

  loadFiltersEventListeners();

  loadLikesEventListener();

  loadContactModalEventListeners();

  loadGalleryModalEventListeners();
};

const displayPageByURLQuery = (json, URLQuery) => {
  const URLParams = new URLSearchParams(URLQuery);
  const id = parseInt(URLParams.get('id'));
  const wrapper = dom.createBodySkeleton();

  if (isFinite(id)) {
    constructPhotographPage(json, id, wrapper);
  } else {
    constructHomepage(json.photographers, id, wrapper);
  }
};

const onLoad = async () => {
  const json = await getJSON();
  const URLQuery = window.location.search;

  displayPageByURLQuery(json, URLQuery);
};

document.addEventListener('DOMContentLoaded', onLoad);
