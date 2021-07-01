import * as utils from '../utils.js';

export class LightboxModal {
  constructor() {
    this.modal = this.createModal();
    this.closingCallbacks = [];
    this.mediaContainer = this.modal.querySelector('.medias');
  }

  createVideo(media) {
    const { description, photographerId, video } = media;
    const videoElement = document.createElement('video');
    videoElement.setAttribute('title', description);
    videoElement.controls = true;

    const source = document.createElement('source');
    source.setAttribute('src', `dist/img/${photographerId}/${video}`);
    source.setAttribute('type', 'video/mp4');
    videoElement.appendChild(source);
    return videoElement;
  }

  createIMG(media) {
    const { description, photographerId, image } = media;

    const img = document.createElement('img');
    img.setAttribute('src', `dist/img/${photographerId}/${image}`);
    img.setAttribute('alt', description);

    return img;
  }

  populateMedias(medias, e) {
    while (this.mediaContainer.firstChild) {
      this.mediaContainer.removeChild(this.mediaContainer.firstChild);
    }
    for (const media of medias) {
      const targetMediaId = parseInt(e.target.getAttribute('data-id'));
      const figure = document.createElement('figure');
      figure.classList.add('media');
      if (media.id === targetMediaId) {
        figure.classList.add('visible');
      }
      if (media.video !== undefined) {
        const video = this.createVideo(media);
        figure.appendChild(video);
      } else {
        const img = this.createIMG(media);
        figure.appendChild(img);
      }

      const title = document.createElement('h2');
      title.setAttribute('tabindex', '0');
      title.classList.add('js-focusable');
      title.appendChild(document.createTextNode(media.title));

      figure.appendChild(title);

      this.mediaContainer.appendChild(figure);
    }
  }

  lightBoxModalKeyEvents(e) {
    const isTabPressed = e.key === 'Tab' || e.code === 'Tab';
    const isEscapePressed = e.key === 'Escape' || e.code === 'Escape';
    const isLeftPressed = e.key === 'ArrowLeft' || e.code === 'ArrowLeft';
    const isRightPressed = e.key === 'ArrowRight' || e.code === 'ArrowRight';
    const modalFocusableElements = Array.from(
      this.modal.querySelectorAll('.js-focusable')
    );
    const firstFocusElement = modalFocusableElements[0];
    const lastFocusElement = modalFocusableElements[modalFocusableElements.length - 1];
    const focusedElement = document.activeElement;

    if (isEscapePressed) {
      this.closeModal();
      return;
    }
    if (isTabPressed) {
      if (e.shiftKey) {
        if (focusedElement === firstFocusElement) {
          e.preventDefault();
          lastFocusElement.focus();
          return;
        }
      } else {
        if (focusedElement === lastFocusElement) {
          e.preventDefault();
          firstFocusElement.focus();
          return;
        }
      }
      if (!modalFocusableElements.includes(focusedElement)) {
        e.preventDefault();
        firstFocusElement.focus();
        return;
      }
    }
    if (isLeftPressed) {
      console.log('PREVIOUS');
    }
    if (isRightPressed) {
      console.log('NEXT');
    }
  }

  createModal() {
    const BEMname = 'lightbox-modal';
    const div = document.createElement('div');
    div.id = BEMname;
    div.classList.add('modal-window', BEMname);
    div.setAttribute('role', 'dialog');
    div.setAttribute('aria-label', 'image closup view');

    const section = document.createElement('section');

    const prevBtn = document.createElement('button');
    prevBtn.classList.add(`${BEMname}__control`, 'js-focusable', 'js-prev');

    const prevBtnImg = utils.createIMG('gallery-control.svg');
    prevBtn.appendChild(prevBtnImg);

    const mediaBlock = document.createElement('div');
    mediaBlock.classList.add('medias');

    const nextBtn = document.createElement('button');
    nextBtn.classList.add(`${BEMname}__control`, 'js-focusable', 'js-next');

    const nextBtnImg = utils.createIMG('gallery-control.svg');
    nextBtn.appendChild(nextBtnImg);

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close', 'js-focusable');

    closeBtn.addEventListener('click', () => {
      this.closeModal();
    });

    section.append(prevBtn, mediaBlock, nextBtn, closeBtn);
    div.appendChild(section);

    // Event Listeners
    window.addEventListener('keydown', (e) => {
      if (this.modal.classList.contains('open')) {
        this.lightBoxModalKeyEvents(e);
      }
    });

    prevBtn.addEventListener('click', () => {
      console.log('PREVIOUS');
    });

    nextBtn.addEventListener('click', () => {
      console.log('NEXT');
    });

    return div;
  }

  openModal() {
    this.modal.classList.add('open');
  }

  closeModal() {
    this.modal.classList.remove('open');
    while (this.closingCallbacks.length > 0) {
      this.closingCallbacks[0].call();
      this.closingCallbacks.shift();
    }
  }
}
