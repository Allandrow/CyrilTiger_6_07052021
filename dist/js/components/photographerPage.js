import * as utils from '../utils/utils.js';

const createHeader = () => {
  const header = document.createElement('header');
  header.setAttribute('role', 'banner');
  header.appendChild(utils.createLogo());

  return header;
};

export class PhotographerPage {
  constructor(containerDOM, photographer, dropdown) {
    this.container = containerDOM;
    this.photographer = photographer;
    this.dropdown = dropdown;
  }

  appendContenttoContainer() {
    document.title += ` - ${this.photographer.infos.name}`;

    const header = createHeader();

    const main = document.createElement('main');
    main.id = 'js-main';

    const infosSection = this.photographer.createInfosSection('photograph-header');
    const select = this.dropdown.createDropdown();
    const figureGroup = this.photographer.mediasList.createFigureGroup();
    main.append(infosSection, select, figureGroup);

    this.container.append(header, main);
  }

  loadEventListeners() {
    const medias = this.photographer.mediasList;
    this.dropdown.attachEventListeners(medias);
    medias.attachLikesEventListener();
  }
}
