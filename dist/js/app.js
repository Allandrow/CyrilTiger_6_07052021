import { Homepage } from './homepage.js';

const getJSON = async () => {
  const data = await fetch('dist/js/data/fisheyedata.json');
  const json = await data.json();
  return json;
};

const createBodySkeleton = () => {
  const div = document.createElement('div');
  div.classList.add('wrapper');
  div.id = 'js-container';

  document.body.prepend(div);

  return div;
};

const displayPageByURLQuery = (json, URLQuery) => {
  const URLParams = new URLSearchParams(URLQuery);
  const id = parseInt(URLParams.get('id'));
  const wrapper = createBodySkeleton();

  if (isFinite(id)) {
    // pp.constructPhotographPage(json, id, wrapper);
  } else {
    const home = new Homepage(json.photographers, wrapper);
    home.constructDOM();
    home.attachEventListeners();
  }
};

const onLoad = async () => {
  const json = await getJSON();
  const URLQuery = window.location.search;

  displayPageByURLQuery(json, URLQuery);
};

document.addEventListener('DOMContentLoaded', onLoad);
