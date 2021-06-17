import * as dom from './dom.js';
import * as home from './homepage.js';
import * as photograph from './photograph.js';

const getJSON = async () => {
  const data = await fetch('dist/js/data/fisheyedata.json');
  const json = await data.json();
  return json;
};

const displayPageByURLQuery = (json, URLQuery) => {
  const URLParams = new URLSearchParams(URLQuery);
  const id = parseInt(URLParams.get('id'));
  const wrapper = dom.createBodySkeleton();

  if (isFinite(id)) {
    photograph.constructPhotographPage(json, id, wrapper);
  } else {
    home.constructHomepage(json.photographers, id, wrapper);
  }
};

const onLoad = async () => {
  const json = await getJSON();
  const URLQuery = window.location.search;

  displayPageByURLQuery(json, URLQuery);
};

document.addEventListener('DOMContentLoaded', onLoad);
