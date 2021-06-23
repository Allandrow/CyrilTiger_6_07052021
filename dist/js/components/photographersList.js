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
}
