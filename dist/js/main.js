import { DropDown } from './components/dropdown.js';
import { Homepage } from './components/homepage.js';
import { Photographer } from './components/photographer.js';
import { PhotographersList } from './components/photographersList.js';

const getJSON = async () => {
  const data = await fetch('dist/js/data/fisheyedata.json');
  const json = await data.json();
  return json;
};

const createPhotographerListWithMedias = (json) => {
  const photographerList = [];

  for (const photographer of json.photographers) {
    const photographerMedias = json.media.filter(
      (media) => media.photographerId === photographer.id
    );
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
      // sort: sortByPopularity,
    },
    {
      value: 'date',
      // sort: sortByDate,
    },
    {
      value: 'title',
      // sort: sortByTitle,
    },
  ];
  const photographersList = new PhotographersList(createPhotographerListWithMedias(json));
  const dropdown = new DropDown(dropdownLabels, dropdownMethods);

  if (!isFinite(id)) {
    const homepage = new Homepage(container, photographersList);
    homepage.appendContentToContainer();
    homepage.attachEventListeners();
  }
};

const onLoad = async () => {
  const json = await getJSON();
  const URLQuery = window.location.search;

  displayPageByURLQuery(json, URLQuery);
};

document.addEventListener('DOMContentLoaded', onLoad);
