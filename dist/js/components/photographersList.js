export class PhotographersList {
  constructor(photographersArray) {
    this.photographers = photographersArray;
  }

  createPhotographerList() {
    const main = document.createElement('main');
    main.id = 'js-main';
    main.classList.add('article-list');

    for (const photographer of this.photographers) {
      main.appendChild(photographer.createArticle('article'));
    }

    return main;
  }

  getPhotographerInfosSectionDOM(id) {
    const photographer = this.photographers.find(
      (photographer) => photographer.infos.id === id
    );

    return photographer.createInfosSection('photograph-header');
  }
}
