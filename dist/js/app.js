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

class SortingSelect {
  constructor(sortingOptions) {
    this.sortingOptions = sortingOptions;
  }

  createSelect() {
    return dom.createSelectGroup(this.sortingOptions);
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

  sortByFilter() {
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

const attachFiltersEventListeners = () => {
  const selectListItems = document.querySelectorAll('#js-select li');
  const sortBtn = document.getElementById('js-sort');
  const selectList = document.getElementById('js-select');

  sortBtn.addEventListener('mouseenter', () => {
    SortingSelect.expandListBox(sortBtn);
  });
  selectList.addEventListener('mouseleave', () => {
    SortingSelect.collapseListBox(sortBtn);
  });
  sortBtn.addEventListener('focus', () => {
    SortingSelect.expandListBox(sortBtn);
  });
  selectListItems.forEach((option) => {
    option.addEventListener('click', () => {
      SortingSelect.changeSelectedFilter(option);
      SortingSelect.changeFilterBtnContent(option, sortBtn);
      SortingSelect.collapseListBox(sortBtn);
      SortingSelect.sortByFilter();
    });
    option.addEventListener('focusout', () => {
      if (option === selectList.lastElementChild) {
        SortingSelect.collapseListBox(sortBtn);
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

const attachLikesEventListener = () => {
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

const openContactModal = (modal, btn) => {
  const wrapper = document.getElementById('js-container');

  modal.classList.add('open');
  wrapper.setAttribute('aria-hidden', 'true');
  btn.setAttribute('aria-expanded', 'true');
  window.addEventListener('keydown', contactModalKeyEvents);
};

const closeContactModal = (modal, btn) => {
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

  const isTabPressed = e.key === 'Tab' || e.code === 'Tab';
  const isEscapePressed = e.key === 'escape' || e.code === 'Escape';

  if (!(isTabPressed || isEscapePressed)) {
    return;
  }
  // Escape key closes modal if inside
  if (isEscapePressed) {
    closeContactModal(modal, contactBtn);
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
};

const attachContactModalEventListeners = () => {
  const contactBtn = document.getElementById('js-contactForm');
  const modal = document.getElementById('contact-modal');
  const closeBtn = modal.querySelector('.close');
  const form = modal.querySelector('form');
  const inputs = modal.querySelectorAll('.js-input');

  window.addEventListener('click', (e) => {
    if (modal.classList.contains('open')) {
      if (e.target === modal) {
        if (e.target.closest('section') === null) {
          closeContactModal(modal, contactBtn);
        }
      }
    }
  });

  // Click to open modal event
  contactBtn.addEventListener('click', () => {
    openContactModal(modal, contactBtn);
  });

  // Click on close button to close modal
  closeBtn.addEventListener('click', () => {
    closeContactModal(modal, contactBtn);
  });

  // Form submission closes logs values + close modal
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    inputs.forEach((input) => {
      console.log(input.value);
    });
    closeContactModal(modal, contactBtn);
  });
};

const constructLightBoxMedias = (activeLink) => {
  // Parse all medias in document
  const links = document.querySelectorAll('figure a');
  const modal = document.querySelector('.gallery-modal');
  const mediaBlock = modal.querySelector('.medias');

  while (mediaBlock.firstChild) mediaBlock.removeChild(mediaBlock.firstChild);

  // for each, create a media in modal
  for (const link of links) {
    const isVideo = link.firstElementChild.tagName.toLowerCase() === 'video';

    const div = document.createElement('div');
    div.classList.add('media');

    if (link.pathname === activeLink) {
      div.classList.add('visible');
    }

    // if video create a video, otherwise create an img
    if (isVideo) {
      const title = link.querySelector('video').getAttribute('title');
      const video = document.createElement('video');
      video.setAttribute('title', title);

      const source = document.createElement('source');
      source.setAttribute('src', link.pathname);
      source.setAttribute('type', 'video/mp4');
      video.appendChild(source);

      div.appendChild(video);
    } else {
      const alt = link.querySelector('img').getAttribute('alt');

      const img = document.createElement('img');
      img.setAttribute('src', link.pathname);
      img.setAttribute('alt', alt);

      div.appendChild(img);
    }

    const paragraph = document.createElement('p');
    paragraph.appendChild(
      document.createTextNode(link.parentElement.getAttribute('data-title'))
    );

    div.appendChild(paragraph);

    mediaBlock.appendChild(div);
  }
};

const openLightBoxModal = () => {
  const wrapper = document.getElementById('js-container');
  const modal = document.querySelector('.gallery-modal');

  wrapper.setAttribute('aria-hidden', 'true');
  modal.classList.add('open');
};

const closeLightBoxModal = (links, activeLink) => {
  const modal = document.querySelector('.gallery-modal');
  const wrapper = document.getElementById('js-container');

  modal.classList.remove('open');
  wrapper.setAttribute('aria-hidden', 'false');
  // on modal closing, give focus back to initial media
  links.find((link) => link.pathname === activeLink).focus();
};

const attachGalleryModalEventListeners = () => {
  const links = Array.from(document.querySelectorAll('.figure a'));
  const modal = document.querySelector('.gallery-modal');
  const closeBtn = modal.querySelector('.close');
  const prevBtn = document.getElementById('js-prev');
  const nextBtn = document.getElementById('js-next');
  const modalFocusableElements = Array.from(modal.querySelectorAll('.js-focusable'));
  let activeLink;

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      activeLink = link.pathname;
      constructLightBoxMedias(activeLink);
      openLightBoxModal();
    });
  });

  //  Close modal when click on close button
  closeBtn.addEventListener('click', () => {
    closeLightBoxModal(links, activeLink);
  });

  // handle escape key for closing modal
  window.addEventListener('keydown', (e) => {
    const isEscapePressed = e.key === 'Escape' || e.code === 'Escape';

    if (modal.classList.contains('open')) {
      if (isEscapePressed) {
        closeLightBoxModal(links, activeLink);
      }
    }
  });

  // Click for previous media
  prevBtn.addEventListener('click', () => {
    const medias = Array.from(modal.querySelectorAll('.media'));
    const media = medias.find((media) => media.classList.contains('visible'));
    media.classList.remove('visible');
    const previousMedia = medias[medias.indexOf(media) - 1];
    let newMedia;
    if (previousMedia === undefined) {
      newMedia = medias[medias.length - 1];
    } else {
      newMedia = previousMedia;
    }
    newMedia.classList.add('visible');
  });

  // Click for next media
  nextBtn.addEventListener('click', () => {
    const medias = Array.from(modal.querySelectorAll('.media'));
    const media = medias.find((media) => media.classList.contains('visible'));
    let newMedia;
    const nextMedia = medias[medias.indexOf(media) + 1];
    if (nextMedia === undefined) {
      newMedia = medias[0];
    } else {
      newMedia = nextMedia;
    }
    newMedia.classList.add('visible', 'nextMedia');
    media.classList.add('outLeft');
    newMedia.addEventListener('animationend', () => {
      media.classList.remove('visible', 'outLeft');
      newMedia.classList.remove('nextMedia');
    });
  });

  // Arrows on keyboard for previous/next media
  window.addEventListener('keydown', (e) => {
    if (modal.classList.contains('open')) {
      // Previous media
      if (e.key === 'ArrowLeft' || e.code === 'ArrowLeft') {
        const medias = Array.from(modal.querySelectorAll('.media'));
        const media = medias.find((media) => media.classList.contains('visible'));
        media.classList.remove('visible');
        const previousMedia = medias[medias.indexOf(media) - 1];
        let newMedia;
        if (previousMedia === undefined) {
          newMedia = medias[medias.length - 1];
        } else {
          newMedia = previousMedia;
        }
        newMedia.classList.add('visible');
        return;
      }
      // Next media
      if (e.key === 'ArrowRight' || e.code === 'ArrowRight') {
        const medias = Array.from(modal.querySelectorAll('.media'));
        const media = medias.find((media) => media.classList.contains('visible'));
        media.classList.remove('visible');
        let newMedia;
        const nextMedia = medias[medias.indexOf(media) + 1];
        if (nextMedia === undefined) {
          newMedia = medias[0];
        } else {
          newMedia = nextMedia;
        }
        newMedia.classList.add('visible');
        return;
      }
      // Tabulation
      if (e.key === 'Tab' || e.code === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === modalFocusableElements[0]) {
            e.preventDefault();
            modalFocusableElements[modalFocusableElements.length - 1].focus();
            return;
          }
        } else {
          if (!modalFocusableElements.includes(document.activeElement)) {
            e.preventDefault();
            modalFocusableElements[0].focus();
            return;
          }
          if (
            document.activeElement ===
            modalFocusableElements[modalFocusableElements.length - 1]
          ) {
            e.preventDefault();
            modalFocusableElements[0].focus();
            return;
          }
        }
      }
    }
  });

  // console.log(links);
};

const constructPhotographPage = (json, id, wrapper) => {
  const main = document.getElementById('js-main');

  // TODO : use sorting method
  const sortingOptions = new SortingSelect([
    {
      label: 'Popularité',
      sorting: utils.sortByLikes,
    },
    {
      label: 'Date',
      sorting: utils.sortByDate,
    },
    {
      label: 'Titre',
      sorting: utils.sortByTitle,
    },
  ]);

  const photographer = json.photographers.find((photographer) => photographer.id === id);
  document.title += ` - ${photographer.name}`;

  const medias = json.media.filter((media) => media.photographerId === id);
  medias.sort((a, b) => b.likes - a.likes);

  main.append(
    dom.createPhotographerHeader(photographer),
    sortingOptions.createSelect(),
    dom.createFigureGroup(medias),
    dom.createLikesAndPriceDiv(medias, photographer)
  );

  wrapper.append(dom.createHeader(id), main);

  document.body.insertBefore(
    dom.createContactModal(photographer.name),
    document.querySelector('script')
  );

  document.body.insertBefore(dom.createGalleryModal(), document.querySelector('script'));

  attachFiltersEventListeners();

  attachLikesEventListener();

  attachContactModalEventListeners();

  attachGalleryModalEventListeners();
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
