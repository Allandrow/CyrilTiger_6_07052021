import { Homepage } from './components/homepage.js';
import { PhotographerPage } from './components/photographerPage.js';

const getJSON = async () => {
  const data = await fetch('dist/js/data/fisheyedata.json');
  const json = await data.json();
  return json;
};

// return photographer related to ID in json with his medias added to the object
const getPhotographerWithMedias = (json, id) => {
  const photographer = json.photographers.find((photographer) => photographer.id === id);
  const medias = json.media.filter((media) => media.photographerId === id);
  photographer.medias = medias;
  return photographer;
};

// Depending if url contains a photographer ID or not, display homepage or photographer page
const displayPageByURLQuery = (json, URLQuery) => {
  const URLParams = new URLSearchParams(URLQuery);
  const id = parseInt(URLParams.get('id'));

  //no id = homepage
  if (!isFinite(id)) {
    const homepage = new Homepage(json.photographers);
    homepage.getHomepage();
  } else {
    const photographerWithMedias = getPhotographerWithMedias(json, id);
    const photographerPage = new PhotographerPage(photographerWithMedias);
    photographerPage.getPhotographerPage();
  }
};

const onLoad = async () => {
  const json = await getJSON();
  const URLQuery = window.location.search;

  displayPageByURLQuery(json, URLQuery);
};

document.addEventListener('DOMContentLoaded', onLoad);
