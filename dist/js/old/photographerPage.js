import * as utils from '../utils/utils.js';

const createHeader = () => {
  const header = document.createElement('header');
  header.setAttribute('role', 'banner');
  header.appendChild(utils.createLogo());

  return header;
};

export class PhotographerPage {
  constructor(containerDOM, photographer, dropdown, contactModal, lightboxModal) {
    this.container = containerDOM;
    this.photographer = photographer;
    this.dropdown = dropdown;
    this.contactModal = contactModal;
    this.lightbox = lightboxModal;
  }

  appendContenttoContainer() {
    // document.title += ` - ${this.photographer.infos.name}`;

    // const header = createHeader();

    // const main = document.createElement('main');
    // main.id = 'js-main';

    // const infosSection = this.photographer.createInfosSection('photograph-header');
    const select = this.dropdown.createDropdown();
    const figureGroup = this.photographer.mediasList.createFigureGroup();
    main.append(infosSection, select, figureGroup);

    this.container.append(header, main);
  }

  insertModalsInDOM() {
    const scriptDOM = document.querySelector('script');
    document.body.insertBefore(this.contactModal.createModal(), scriptDOM);
    document.body.insertBefore(this.lightbox.createModal(), scriptDOM);
  }

  loadEventListeners() {
    const medias = this.photographer.mediasList;
    const contactBtn = document.getElementById('js-contactForm');
    this.dropdown.attachEventListeners(medias);
    medias.attachLikesEventListener();
    this.contactModal.attachEventListeners(contactBtn);
    const figureGroup = document.getElementById(medias.id);
    this.lightbox.attachEventListeners(figureGroup, this.container);
  }
}
