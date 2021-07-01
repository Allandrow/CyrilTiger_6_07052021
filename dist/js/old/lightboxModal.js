const changeMedia = (id, direction) => {
  const medias = Array.from(document.querySelectorAll('.lightbox-modal .media'));
  let currentMedia = medias.find((media) => media.getAttribute('data-id') === `${id}`);
  let previousMedia;
  let nextMedia;
  let newMedia;
  const animationClassNames = [
    'outRight',
    'outLeft',
    'nextMedia',
    'previousMedia',
    'visible',
  ];

  medias[medias.indexOf(currentMedia) - 1] === undefined
    ? (previousMedia = medias[medias.length - 1])
    : (previousMedia = medias[medias.indexOf(currentMedia) - 1]);
  medias[medias.indexOf(currentMedia) + 1] === undefined
    ? (nextMedia = medias[0])
    : (nextMedia = medias[medias.indexOf(currentMedia) + 1]);

  previousMedia.classList.remove(...animationClassNames);
  nextMedia.classList.remove(...animationClassNames);

  currentMedia.classList.add('visible');

  if (direction === 'next') {
    newMedia = nextMedia;
    currentMedia.classList.add('outLeft');
    newMedia.classList.add('visible', 'nextMedia');
    newMedia.addEventListener('animationend', () => {
      if (currentMedia.classList.contains('outLeft')) {
        currentMedia.classList.remove('visible');
      }
      currentMedia.classList.remove('outLeft');
      newMedia.classList.remove('nextMedia');
    });
  } else {
    newMedia = previousMedia;
    currentMedia.classList.add('outRight');
    newMedia.classList.add('visible', 'previousMedia');
    newMedia.addEventListener('animationend', () => {
      if (currentMedia.classList.contains('outRight')) {
        currentMedia.classList.remove('visible');
      }
      currentMedia.classList.remove('outRight');
      newMedia.classList.remove('previousMedia');
    });
  }
};

// export class LightboxModal {
// constructor(id) {
//   this.id = id;
// }

// createModal() {
//   const elementBEMName = this.id;
//   const div = document.createElement('div');
//   div.id = elementBEMName;
//   div.classList.add('modal-window', elementBEMName);
//   div.setAttribute('role', 'dialog');
//   div.setAttribute('aria-label', 'image closup view');

//   const section = document.createElement('section');

//   const leftDiv = document.createElement('div');

//   const leftButton = document.createElement('button');
//   leftButton.classList.add(`${elementBEMName}__control`, 'js-focusable', 'js-prev');

//   const leftButtonImg = document.createElement('img');
//   leftButtonImg.setAttribute('src', 'dist/img/gallery-control.svg');
//   leftButton.appendChild(leftButtonImg);
//   leftDiv.appendChild(leftButton);

//   const mediaBlock = document.createElement('div');
//   mediaBlock.classList.add('medias');

//   const rightButton = document.createElement('button');
//   rightButton.classList.add(`${elementBEMName}__control`, 'js-focusable', 'js-next');

//   const rightButtonImg = document.createElement('img');
//   rightButtonImg.setAttribute('src', 'dist/img/gallery-control.svg');
//   rightButton.appendChild(rightButtonImg);

//   const closeBtn = document.createElement('button');
//   closeBtn.classList.add('close', 'js-focusable');

//   section.append(leftButton, mediaBlock, rightButton, closeBtn);

//   div.appendChild(section);

//   return div;
// }

// openModal(container, modal) {
//   container.setAttribute('aria-hidden', 'true');
//   modal.classList.add('open');
// }

// closeModal(container, modal, links, activeLink) {
//   modal.classList.remove('open');
//   container.setAttribute('aria-hidden', 'false');
//   links.find((link) => link === activeLink).focus();
// }

// populateMedias(activeLink, container) {
// const links = Array.from(container.querySelectorAll('figure a'));
// const modal = document.getElementById(this.id);
// const mediaBlock = modal.querySelector('.medias');

// while (mediaBlock.firstChild) mediaBlock.removeChild(mediaBlock.firstChild);

// for each, create a media in modal
// for (const link of links) {
// const isVideo = link.firstElementChild.tagName.toLowerCase() === 'video';

// const div = document.createElement('div');
// div.classList.add('media');
// div.setAttribute('data-id', links.indexOf(link));

// if (link === activeLink) {
//   div.classList.add('visible');
// }

// if (isVideo) {
//   const title = link.querySelector('video').getAttribute('title');
//   const video = document.createElement('video');
//   video.setAttribute('title', title);
//   video.controls = true;

//   const source = document.createElement('source');
//   source.setAttribute('src', link.pathname);
//   source.setAttribute('type', 'video/mp4');
//   video.appendChild(source);

//   div.appendChild(video);
// } else {
//   const alt = link.querySelector('img').getAttribute('alt');

//   const img = document.createElement('img');
//   img.setAttribute('src', link.pathname);
//   img.setAttribute('alt', alt);

//   div.appendChild(img);
// }

//   const title = document.createElement('h2');
//   title.setAttribute('tabindex', '0');
//   title.classList.add('js-focusable');
//   title.appendChild(
//     document.createTextNode(link.parentElement.getAttribute('data-title'))
//   );

//   div.appendChild(title);

//   mediaBlock.appendChild(div);
// }
// }

// attachEventListeners(figureGroup, container) {
// const modal = document.getElementById(this.id);
// const closeBtn = modal.querySelector('.close');
// const prevBtn = modal.querySelector('.js-prev');
// const nextBtn = modal.querySelector('.js-next');
// const figures = Array.from(figureGroup.querySelectorAll('figure a'));
// let mediaId;
// let activeLink;

// figures.forEach((figure) =>
//   figure.addEventListener('click', (e) => {
//     e.preventDefault();
//     const updatedMediaList = Array.from(container.querySelectorAll('figure a'));
//     this.openModal(container, modal);
//     this.populateMedias(figure, figureGroup);
//     mediaId = updatedMediaList.indexOf(figure);
//     activeLink = figure;
//   })
// );

// closeBtn.addEventListener('click', () => {
//   this.closeModal(container, modal, figures, activeLink);
// });

// window.addEventListener('keydown', (e) => {
//   const isEscapePressed = e.key === 'Escape' || e.code === 'Escape';

//   if (modal.classList.contains('open')) {
//     if (isEscapePressed) {
//       this.closeModal(container, modal, figures, activeLink);
//     }
//   }
// });

// Click for previous media
// prevBtn.addEventListener('click', () => {
//   changeMedia(mediaId, 'previous');
//   mediaId - 1 < 0 ? (mediaId = figures.length - 1) : mediaId--;
// });

// // Click for next media
// nextBtn.addEventListener('click', () => {
//   changeMedia(mediaId, 'next');
//   mediaId + 1 > figures.length - 1 ? (mediaId = 0) : mediaId++;
// });

// Arrows on keyboard for previous/next media
// window.addEventListener('keydown', (e) => {
//   const modalFocusableElements = Array.from(modal.querySelectorAll('.js-focusable'));
//   if (modal.classList.contains('open')) {
//     // Previous media
//     if (e.key === 'ArrowLeft' || e.code === 'ArrowLeft') {
//       changeMedia(mediaId, 'previous');
//       mediaId - 1 < 0 ? (mediaId = figures.length - 1) : mediaId--;
//       return;
//     }
//     // Next media
//     if (e.key === 'ArrowRight' || e.code === 'ArrowRight') {
//       changeMedia(mediaId, 'next');
//       mediaId + 1 > figures.length - 1 ? (mediaId = 0) : mediaId++;
//       return;
//     }
// Tabulation
// if (e.key === 'Tab' || e.code === 'Tab') {
//   if (e.shiftKey) {
//     if (document.activeElement === modalFocusableElements[0]) {
//       e.preventDefault();
//       modalFocusableElements[modalFocusableElements.length - 1].focus();
//       return;
//     }
//   } else {
//     if (!modalFocusableElements.includes(document.activeElement)) {
//       e.preventDefault();
//       modalFocusableElements[0].focus();
//       return;
//     }
//     if (
//       document.activeElement ===
//       modalFocusableElements[modalFocusableElements.length - 1]
//     ) {
//       e.preventDefault();
//       modalFocusableElements[0].focus();
//       return;
//     }
//   }
// }
//       }
//     });
//   }
// }
