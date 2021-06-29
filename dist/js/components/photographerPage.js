import * as utils from '../utils.js';
import { Dropdown } from './dropdown.js';

export class PhotographerPage {
  constructor(photographer) {
    this.photographer = photographer;
    this.container = document.getElementById('js-container');
  }

  createHeader() {
    const header = document.createElement('header');
    header.setAttribute('role', 'banner');
    header.appendChild(utils.createLogo());

    return header;
  }

  createPhotographerInfosSection() {
    const BEMname = 'photograph-header';
    const childBEMName = `${BEMname}__infos`;
    const { name, portrait, city, country, tagline, price, tags } = this.photographer;

    const section = document.createElement('section');
    section.classList.add(BEMname);

    const div = document.createElement('div');
    div.classList.add(childBEMName);

    const title = document.createElement('h1');
    title.setAttribute('tabindex', '0');
    title.appendChild(document.createTextNode(name));

    const paragraph = document.createElement('p');

    const localisation = document.createElement('span');
    localisation.classList.add(`${childBEMName}__localisation`);
    localisation.setAttribute('tabindex', '0');
    localisation.appendChild(document.createTextNode(`${city}, ${country}`));

    const slogan = document.createElement('span');
    slogan.classList.add(`${childBEMName}__slogan`);
    slogan.setAttribute('tabindex', '0');
    slogan.appendChild(document.createTextNode(tagline));

    paragraph.append(localisation, slogan);

    const likesAndPriceDiv = document.createElement('div');
    likesAndPriceDiv.classList.add('meta-infos');

    const likesDiv = document.createElement('div');
    likesDiv.classList.add('meta-infos__likes');

    const span = document.createElement('span');
    span.setAttribute('tabindex', '0');
    const likes = utils.getMediaLikes(this.photographer.medias);
    span.appendChild(document.createTextNode(likes));

    const img = utils.createIMG('like-icon-black.svg', 'likes');
    likesDiv.append(span, img);

    const priceSpan = document.createElement('span');
    priceSpan.setAttribute('tabindex', 0);
    priceSpan.appendChild(document.createTextNode(`${price}€ / jour`));
    likesAndPriceDiv.append(likesDiv, priceSpan);

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

  initSelect() {
    const options = [
      {
        value: 'popularity',
        label: 'Popularité',
      },
      {
        value: 'date',
        label: 'Date',
      },
      {
        value: 'title',
        label: 'Titre',
      },
    ];
    const dropdown = new Dropdown(options);
    return dropdown;
  }

  getPhotographerPage() {
    // Object initialization
    const select = this.initSelect();
    const selectOptions = select.selectOptions;
    const sortMethods = [
      {
        value: 'popularity',
        sort: utils.sortByPopularity,
      },
      {
        value: 'date',
        sort: utils.sortByDate,
      },
      {
        value: 'title',
        sort: utils.sortByTitle,
      },
    ];
    // Add Photographer name to page title
    document.title += ` - ${this.photographer.name}`;

    // DOM elements
    const header = this.createHeader();
    const main = document.createElement('main');
    main.id = 'js-main';
    const photographerInfosSection = this.createPhotographerInfosSection();
    main.append(photographerInfosSection, select.getDropdown());

    this.container.append(header, main);

    // DOM events
    selectOptions.forEach((option) => {
      option.addEventListener('click', () => {
        select.onChange(option);
        // Sorting des medias via comparaison entre l'id de l'option et sortMethods pour appliquer la bonne méthode de sort
      });
    });
  }
}
