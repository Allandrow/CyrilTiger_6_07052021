import * as utils from '../utils/utils.js';

export class Photographer {
  constructor(photographerInfos, photographerMedias) {
    this.infos = photographerInfos;
    this.mediasList = photographerMedias;
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

  createInfosSection(elementBEMName) {
    const { name, portrait, city, country, tagline, price, tags } = this.infos;
    let childrenBEMName = `${elementBEMName}__infos`;

    const section = document.createElement('section');
    section.classList.add(elementBEMName);

    const div = document.createElement('div');
    div.classList.add(childrenBEMName);

    const title = document.createElement('h1');
    title.appendChild(document.createTextNode(name));
    title.setAttribute('tabindex', '0');

    const paragraph = document.createElement('p');

    const localisation = document.createElement('span');
    localisation.appendChild(document.createTextNode(`${city}, ${country}`));
    localisation.classList.add(`${childrenBEMName}__localisation`);
    localisation.setAttribute('tabindex', '0');

    const slogan = document.createElement('span');
    slogan.appendChild(document.createTextNode(tagline));
    slogan.classList.add(`${childrenBEMName}__slogan`);
    slogan.setAttribute('tabindex', '0');

    paragraph.append(localisation, slogan);

    const likesAndPriceDiv = document.createElement('div');
    likesAndPriceDiv.classList.add('meta-infos');

    const likesDiv = document.createElement('div');
    likesDiv.classList.add('meta-infos__likes');

    const span = document.createElement('span');

    const likes = utils.getMediaLikes(this.mediasList.medias);

    span.appendChild(document.createTextNode(likes));
    span.setAttribute('tabindex', '0');
    const img = utils.createIMG('like-icon-black.svg', 'likes');
    likesDiv.append(span, img);

    const priceDiv = document.createElement('span');
    priceDiv.appendChild(document.createTextNode(`${price}€ / jour`));
    priceDiv.setAttribute('tabindex', '0');
    likesAndPriceDiv.append(likesDiv, priceDiv);

    const ul = utils.createTagList(tags);

    const btn = document.createElement('button');
    btn.classList.add('button');
    btn.id = 'js-contactForm';
    btn.setAttribute('aria-expanded', 'false');
    btn.appendChild(document.createTextNode('Contactez-moi'));

    div.append(title, paragraph, likesAndPriceDiv, ul, btn);

    const thumbnail = utils.createIMG(`thumbnails/${portrait}`, name);
    thumbnail.classList.add('thumbnail');

    section.append(div, thumbnail);

    return section;
  }
}
