import { DropDown } from './components/dropdown.js';
import { FormModal } from './components/formModal.js';
import { Homepage } from './components/homepage.js';
import { LightboxModal } from './components/lightboxModal.js';
import { MediasList } from './components/mediasList.js';
import { Photographer } from './components/photographer.js';
import { PhotographerPage } from './components/photographerPage.js';
import { PhotographersList } from './components/photographersList.js';
import * as utils from './utils/utils.js';

const getJSON = async () => {
  const data = await fetch('dist/js/data/fisheyedata.json');
  const json = await data.json();
  return json;
};

const createPhotographerListWithMedias = (json) => {
  const photographerList = [];

  for (const photographer of json.photographers) {
    const medias = json.media.filter((media) => media.photographerId === photographer.id);
    const photographerMedias = new MediasList(medias, 'js-figureGroup');
    const photographerWithMedias = new Photographer(photographer, photographerMedias);
    photographerList.push(photographerWithMedias);
  }
  return photographerList;
};

const displayPageByURLQuery = (json, URLQuery) => {
  const URLParams = new URLSearchParams(URLQuery);
  const id = parseInt(URLParams.get('id'));
  const container = document.getElementById('js-container');
  const dropdownLabels = [
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
  const dropdownMethods = [
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
  const dropdown = new DropDown(dropdownLabels, dropdownMethods, 'js-sortContainer');
  const photographersList = new PhotographersList(createPhotographerListWithMedias(json));

  if (!isFinite(id)) {
    const homepage = new Homepage(container, photographersList);
    homepage.appendContentToContainer();
    homepage.attachEventListeners();
  } else {
    const photographer = utils.getPhotographerFromList(id, photographersList);
    const contactModal = new FormModal('contact-modal', photographer.infos.name);
    const lightboxModal = new LightboxModal('lightbox-modal');
    const photographerPage = new PhotographerPage(
      container,
      photographer,
      dropdown,
      contactModal,
      lightboxModal
    );
    photographerPage.appendContenttoContainer();
    photographerPage.insertModalsInDOM();
    photographerPage.loadEventListeners();
  }
};

const onLoad = async () => {
  const json = await getJSON();
  const URLQuery = window.location.search;

  displayPageByURLQuery(json, URLQuery);
};

document.addEventListener('DOMContentLoaded', onLoad);
