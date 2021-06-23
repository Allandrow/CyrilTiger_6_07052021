import * as utils from '../utils/utils.js';

export class Photographer {
  constructor(photographerInfos, photographerMedias) {
    this.infos = photographerInfos;
    this.medias = photographerMedias;
  }

  createArticle(elementBEMName) {
    const { id, portrait, name, city, country, tagline, price, tags } = this.infos;

    const article = document.createElement('article');
    article.classList.add(elementBEMName);

    const link = document.createElement('a');
    link.setAttribute('href', `index.html?id=${id}`);
    link.classList.add(`${elementBEMName}__link`);

    const photo = utils.createIMG(`thumbnails/${portrait}`, name);

    const title = document.createElement('h2');
    title.appendChild(document.createTextNode(name));

    link.append(photo, title);

    const paragraph = document.createElement('p');

    const localisation = document.createElement('span');
    localisation.appendChild(document.createTextNode(`${city}, ${country}`));
    localisation.classList.add(`${elementBEMName}`);

    const slogan = document.createElement('span');
    slogan.appendChild(document.createTextNode(tagline));
    slogan.classList.add(`${elementBEMName}__slogan`);

    const priceText = document.createElement('span');
    priceText.appendChild(document.createTextNode(`${price}€/jour`));
    priceText.classList.add(`${elementBEMName}__price`);

    paragraph.append(localisation, slogan, priceText);

    const ul = utils.createTagList(tags);

    article.append(link, paragraph, ul);

    return article;
  }
}
