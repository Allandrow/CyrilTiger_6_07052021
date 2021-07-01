import * as utils from '../utils.js';
import { ContactModal } from './contactModal.js';
import { Dropdown } from './dropdown.js';
import { MediaList } from './mediaList.js';

export class PhotographerPage {
  constructor(photographer) {
    this.photographer = photographer;
    this.container = document.getElementById('js-container');
    this.totalLikesDOM = this.createTotalLikesElement();
    this.contactModal = this.initContactModal();
  }

  createHeader() {
    const header = document.createElement('header');
    header.setAttribute('role', 'banner');
    header.appendChild(utils.createLogo());

    return header;
  }

  createTotalLikesElement() {
    const span = document.createElement('span');
    span.setAttribute('tabindex', '0');
    const likes = utils.getMediaLikes(this.photographer.medias);
    span.appendChild(document.createTextNode(likes));
    return span;
  }

  createContactBtn() {
    const btn = document.createElement('button');
    btn.classList.add('button');
    btn.id = 'js-contactForm';
    btn.setAttribute('aria-expanded', 'false');
    btn.appendChild(document.createTextNode('Contactez-moi'));

    btn.addEventListener('click', () => {
      this.container.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'true');
      this.contactModal.openModal();

      const giveBtnFocus = () => {
        btn.focus();
      };

      const removeARIAHiddenFromContainer = () => {
        this.container.removeAttribute('aria-hidden');
      };
      this.contactModal.observer.addCallback(giveBtnFocus);
      this.contactModal.observer.addCallback(removeARIAHiddenFromContainer);
    });

    return btn;
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

    const span = this.totalLikesDOM;

    const img = utils.createIMG('like-icon-black.svg', 'likes');
    likesDiv.append(span, img);

    const priceSpan = document.createElement('span');
    priceSpan.setAttribute('tabindex', 0);
    priceSpan.appendChild(document.createTextNode(`${price}€ / jour`));
    likesAndPriceDiv.append(likesDiv, priceSpan);

    const ul = utils.createTagList(tags);

    const btn = this.createContactBtn();

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

  initMediaList() {
    // sort medias for iniital render according to first option : popularity
    const sortedMedias = this.photographer.medias.sort(utils.sortMediaByPopularity);
    const mediaList = new MediaList(sortedMedias);
    return mediaList;
  }

  initContactModal() {
    const contactModal = new ContactModal(this.photographer.name);
    return contactModal;
  }

  updateTotalLikes(figures) {
    this.totalLikesDOM.textContent = utils.getFigureLikes(figures);
  }

  insertModalsInDOM() {
    const scriptDOM = document.querySelector('script');

    document.body.insertBefore(this.contactModal.modal, scriptDOM);
  }

  getPhotographerPage() {
    // dropdown initialization
    const select = this.initSelect();
    const selectOptions = select.selectOptions;
    const sortMethods = [
      {
        value: 'popularity',
        figureSort: utils.sortFigureByPopularity,
        mediaSort: utils.sortMediaByPopularity,
      },
      {
        value: 'date',
        figureSort: utils.sortFigureByDate,
        mediaSort: utils.sortMediaByDate,
      },
      {
        value: 'title',
        figureSort: utils.sortFigureByTitle,
        mediaSort: utils.sortMediaByTitle,
      },
    ];

    // mediaList initialization
    const mediaList = this.initMediaList();

    // Add Photographer name to page title
    document.title += ` - ${this.photographer.name}`;

    // DOM elements
    const header = this.createHeader();
    const main = document.createElement('main');
    main.id = 'js-main';
    const photographerInfosSection = this.createPhotographerInfosSection();
    const figuresContainer = mediaList.getMediaList();
    main.append(photographerInfosSection, select.getDropdown(), figuresContainer);

    this.container.append(header, main);

    // Add modals to DOM
    this.insertModalsInDOM();

    // DOM events
    selectOptions.forEach((option) => {
      option.addEventListener('click', () => {
        const sortMethod = sortMethods.find((method) => method.value === option.id);
        select.onChange(option);
        mediaList.sortFigures(sortMethod.figureSort);
        mediaList.sortMedias(sortMethod.mediaSort);
      });
    });
  }
}
