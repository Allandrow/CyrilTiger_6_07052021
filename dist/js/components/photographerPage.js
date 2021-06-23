import * as utils from '../utils/utils.js';

const createHeader = () => {
  const header = document.createElement('header');
  header.setAttribute('role', 'banner');
  header.appendChild(utils.createLogo());

  return header;
};

const changePageTitle = (id, photographersList) => {
  const photographer = photographersList.photographers.find(
    (photographer) => photographer.infos.id === id
  );

  document.title += ` - ${photographer.infos.name}`;
};

export class PhotographerPage {
  constructor(containerDOM, pageID, photographersList, dropdown) {
    this.container = containerDOM;
    this.pageID = pageID;
    this.photographers = photographersList;
    this.dropdown = dropdown;
  }

  appendContenttoContainer() {
    changePageTitle(this.pageID, this.photographers);

    const header = createHeader();

    const infosSection = this.photographers.getPhotographerInfosSectionDOM(this.pageID);

    this.container.append(header, infosSection);
  }
}
