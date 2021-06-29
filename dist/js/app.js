import { Homepage } from './components/homepage.js';

const getJSON = async () => {
  const data = await fetch('dist/js/data/fisheyedata.json');
  const json = await data.json();
  return json;
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
    // photographerPage object
  }
};

const onLoad = async () => {
  const json = await getJSON();
  const URLQuery = window.location.search;

  displayPageByURLQuery(json, URLQuery);
};

document.addEventListener('DOMContentLoaded', onLoad);
