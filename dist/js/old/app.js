import { Homepage } from './homepage.js';
import { PhotographerPage } from '../photographerPage.js';

const getJSON = async () => {
  const data = await fetch('dist/js/data/fisheyedata.json');
  const json = await data.json();
  return json;
};

const displayPageByURLQuery = (json, URLQuery) => {
  const URLParams = new URLSearchParams(URLQuery);
  const id = parseInt(URLParams.get('id'));

  if (isFinite(id)) {
    const photographer = json.photographers.find(
      (photographer) => photographer.id === id
    );
    const medias = json.media.filter((media) => media.photographerId === id);
    const photographerPage = new PhotographerPage(photographer, medias, wrapper);

    document.title += ` - ${photographer.name}`;
    photographerPage.constructDOM();
    photographerPage.attachEventListeners();
  } else {
    const home = new Homepage(json.photographers, wrapper);
    home.constructPage();
    home.attachEventListeners();
  }
};

const onLoad = async () => {
  const json = await getJSON();
  const URLQuery = window.location.search;

  displayPageByURLQuery(json, URLQuery);
};

document.addEventListener('DOMContentLoaded', onLoad);
