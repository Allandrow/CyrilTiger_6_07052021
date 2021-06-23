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

    const infosSection = this.photographer.createInfosSection('photograph-header');

    const select = this.dropdown.createDropdown('js-sortContainer');

    this.container.append(header, infosSection, select);
  }

  loadEventListeners() {
    this.dropdown.attachEventListeners('js-sortContainer', this.photographer.medias);
  }
}
