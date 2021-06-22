import { Photographer } from './photographer.js';
import * as utils from './utils.js';

const createHeader = () => {
  const header = document.createElement('header');

  const logo = utils.createLogo();
  header.appendChild(logo);

  return header;
};

const createMain = (photographer, medias) => {
  const main = document.createElement('main');
  main.id = 'js-main';

  const { id, portrait, name, city, country, tagline, price, tags } = photographer;
  const photographerObj = new Photographer(
    id,
    portrait,
    name,
    city,
    country,
    tagline,
    price,
    tags
  );

  main.appendChild(photographerObj.createPhotographerHeader(medias));

  return main;
};

export class PhotographerPage {
  constructor(photographer, medias, container) {
    this.photographer = photographer;
    this.medias = medias;
    this.container = container;
  }

  constructPage() {
    const header = createHeader();
    const main = createMain(this.photographer, this.medias);

    this.container.append(header, main);
  }
}

// const updateTotalLikesCount = (operation) => {
//   const totalLikesCountElement = document.querySelector('.meta-infos__likes span');
//   let totalLikesCount = parseInt(totalLikesCountElement.innerText);

//   operation === 'add' ? totalLikesCount++ : totalLikesCount--;

//   totalLikesCountElement.innerText = totalLikesCount;
// };

// const attachLikesEventListener = () => {
//   const mediaLikeIcons = document.querySelectorAll('.js-like');
//   mediaLikeIcons.forEach((icon) => {
//     icon.addEventListener('click', () => {
//       const likeFigure = icon.closest('.figure');
//       let likeCount = parseInt(likeFigure.getAttribute('data-likes'));

//       if (icon.getAttribute('data-liked') === 'true') {
//         likeCount--;
//         icon.setAttribute('data-liked', 'false');
//         updateTotalLikesCount('substract');
//       } else {
//         likeCount++;
//         icon.setAttribute('data-liked', 'true');
//         updateTotalLikesCount('add');
//       }

//       likeFigure.setAttribute('data-likes', likeCount);
//       icon.previousElementSibling.textContent = likeCount;
//     });
//   });
// };

// export const constructPhotographPage = (json, id, wrapper) => {

//   medias.sort((a, b) => b.likes - a.likes);

//   main.append(
//     dom.createPhotographerHeader(photographer, medias),
//     // sorter.sortingOptions.createSelect(),
//     dom.createFigureGroup(medias)
//   );

//   wrapper.append(dom.createHeader(id), main);

//   document.body.insertBefore(
//     dom.createContactModal(photographer.name),
//     document.querySelector('script')
//   );

//   document.body.insertBefore(dom.createGalleryModal(), document.querySelector('script'));

//   sorter.attachFiltersEventListeners();
//   attachLikesEventListener();
//   contact.attachContactModalEventListeners();
//   lightbox.attachGalleryModalEventListeners();
// };
