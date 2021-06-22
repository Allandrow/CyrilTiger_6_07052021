import * as utils from './utils.js';

export class Photographer {
  constructor(id, portrait, name, city, country, tagline, price, tags) {
    this.id = id;
    this.portrait = portrait;
    this.name = name;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.price = price;
    this.tags = tags;
  }

  createArticle() {
    const elementBEMName = 'article';

    const article = document.createElement('article');
    article.classList.add(elementBEMName);

    const link = document.createElement('a');
    link.setAttribute('href', `index.html?id=${this.id}`);
    link.classList.add(`${elementBEMName}__link`);

    const thumbnail = utils.createIMG(`thumbnails/${this.portrait}`, this.name);

    const title = document.createElement('h2');
    title.appendChild(document.createTextNode(this.name));

    link.append(thumbnail, title);

    const paragraph = document.createElement('p');

    const localisation = document.createElement('span');
    localisation.appendChild(document.createTextNode(`${this.city}, ${this.country}`));
    localisation.classList.add(`${elementBEMName}`);

    const slogan = document.createElement('span');
    slogan.appendChild(document.createTextNode(this.tagline));
    slogan.classList.add(`${elementBEMName}__slogan`);

    const priceText = document.createElement('span');
    priceText.appendChild(document.createTextNode(`${this.price}€/jour`));
    priceText.classList.add(`${elementBEMName}__price`);

    paragraph.append(localisation, slogan, priceText);

    const ul = utils.createTagList(this.tags);

    article.append(link, paragraph, ul);

    return article;
  }

  createPhotographerHeader(medias) {
    const elementBEMName = 'photograph-header__infos';

    const section = document.createElement('section');
    section.classList.add('photograph-header');

    const div = document.createElement('div');
    div.classList.add(elementBEMName);

    const title = document.createElement('h1');
    title.appendChild(document.createTextNode(this.name));
    title.setAttribute('tabindex', '0');

    const paragraph = document.createElement('p');

    const localisation = document.createElement('span');
    localisation.appendChild(document.createTextNode(`${this.city}, ${this.country}`));
    localisation.classList.add(`${elementBEMName}__localisation`);
    localisation.setAttribute('tabindex', '0');

    const slogan = document.createElement('span');
    slogan.appendChild(document.createTextNode(this.tagline));
    slogan.classList.add(`${elementBEMName}__slogan`);
    slogan.setAttribute('tabindex', '0');

    paragraph.append(localisation, slogan);

    const likesAndPriceDiv = document.createElement('div');
    likesAndPriceDiv.classList.add('meta-infos');

    const likesDiv = document.createElement('div');
    likesDiv.classList.add('meta-infos__likes');

    const span = document.createElement('span');

    let totalLikes = 0;
    medias.forEach((media) => {
      totalLikes += media.likes;
    });

    span.appendChild(document.createTextNode(totalLikes));
    span.setAttribute('tabindex', '0');
    const img = utils.createIMG('like-icon-black.svg', 'likes');
    likesDiv.append(span, img);

    const priceDiv = document.createElement('span');
    priceDiv.appendChild(document.createTextNode(`${this.price}€ / jour`));
    priceDiv.setAttribute('tabindex', '0');
    likesAndPriceDiv.append(likesDiv, priceDiv);

    const ul = utils.createTagList(this.tags);

    const btn = document.createElement('button');
    btn.classList.add('button');
    btn.id = 'js-contactForm';
    btn.setAttribute('aria-expanded', 'false');
    btn.appendChild(document.createTextNode('Contactez-moi'));

    div.append(title, paragraph, likesAndPriceDiv, ul, btn);

    const thumbnail = utils.createIMG(`thumbnails/${this.portrait}`, name);
    thumbnail.classList.add('thumbnail');

    section.append(div, thumbnail);

    return section;
  }
}
