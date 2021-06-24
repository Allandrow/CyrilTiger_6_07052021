import { Photographer } from './photographer.js';
import { MediaList } from './old/mediaList.js';
import { MediaSortSelect } from './sortingSelect.js';
import * as utils from './utils.js';

const createHeader = () => {
  const header = document.createElement('header');

  const logo = utils.createLogo();
  header.appendChild(logo);

  return header;
};

const updateTotalLikesCount = (operation) => {
  const totalLikesCountElement = document.querySelector('.meta-infos__likes span');
  let totalLikesCount = parseInt(totalLikesCountElement.innerText);

  operation === 'add' ? totalLikesCount++ : totalLikesCount--;

  totalLikesCountElement.innerText = totalLikesCount;
};

const likesEventListener = (icon) => {
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
};

const createMain = (photographerData, medias) => {
  const main = document.createElement('main');
  main.id = 'js-main';

  const photographer = new Photographer(photographerData);

  const sortOptions = [
    {
      value: 'popularity',
      label: 'Popularité',
      // sortFunction: sortByPopularity,
    },
    {
      value: 'date',
      label: 'Date',
      // sortFunction: sortByPopularity,
    },
    {
      value: 'title',
      label: 'Titre',
      // sortFunction: sortByPopularity,
    },
  ];

  const selectContainer = document.createElement('div');
  selectContainer.id = 'js-sortContainer';
  selectContainer.classList.add('select-group');

  const select = new MediaSortSelect(sortOptions, selectContainer);

  let likes = 0;
  medias.forEach((media) => {
    likes += media.likes;
  });

  const mediasList = new MediaList(medias);

  main.append(
    photographer.createPhotographerHeader(likes),
    select.createSelect(),
    mediasList.constructMediasList()
  );

  return main;
};

export class PhotographerPage {
  constructor(photographer, medias, container) {
    this.photographer = photographer;
    this.medias = medias;
    this.container = container;
  }

  constructDOM() {
    const header = createHeader();
    const main = createMain(this.photographer, this.medias);

    this.container.append(header, main);
  }

  attachEventListeners() {
    const mediaLikeIcons = document.querySelectorAll('.js-like');
    const select = document.getElementById('js-sortContainer');

    mediaLikeIcons.forEach((icon) => {
      icon.addEventListener('click', () => likesEventListener(icon));
    });

    MediaSortSelect.attachEventListeners(select);
  }
}
