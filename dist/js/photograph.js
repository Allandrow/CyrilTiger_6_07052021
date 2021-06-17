import * as dom from './dom.js';
import * as contact from './contactModal.js';
import * as lightbox from './lightboxModal.js';
import * as sorter from './sortingSelect.js';

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

export const constructPhotographPage = (json, id, wrapper) => {
  const main = document.getElementById('js-main');

  const photographer = json.photographers.find((photographer) => photographer.id === id);
  document.title += ` - ${photographer.name}`;

  const medias = json.media.filter((media) => media.photographerId === id);
  medias.sort((a, b) => b.likes - a.likes);

  main.append(
    dom.createPhotographerHeader(photographer),
    sorter.sortingOptions.createSelect(),
    dom.createFigureGroup(medias),
    dom.createLikesAndPriceDiv(medias, photographer)
  );

  wrapper.append(dom.createHeader(id), main);

  document.body.insertBefore(
    dom.createContactModal(photographer.name),
    document.querySelector('script')
  );

  document.body.insertBefore(dom.createGalleryModal(), document.querySelector('script'));

  sorter.attachFiltersEventListeners();
  attachLikesEventListener();
  contact.attachContactModalEventListeners();
  lightbox.attachGalleryModalEventListeners();
};
