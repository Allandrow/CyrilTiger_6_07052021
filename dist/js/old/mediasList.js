import * as utils from '../utils/utils.js';

const createPicture = (media) => {
  const { photographerId, image, description } = media;

  const picture = document.createElement('picture');

  const source = document.createElement('source');
  source.setAttribute('media', '(min-width:60rem)');
  source.setAttribute('srcset', `dist/img/${photographerId}/${image}`);

  const img = utils.createIMG(`min/${photographerId}/${image}`, description);

  picture.append(source, img);
  return picture;
};

const createVideo = (media) => {
  const { photographerId, video, description } = media;

  const mediaElement = document.createElement('video');
  mediaElement.setAttribute('title', description);

  const source = document.createElement('source');
  source.setAttribute('src', `dist/img/${photographerId}/${video}`);
  source.setAttribute('type', 'video/mp4');

  mediaElement.appendChild(source);
  return mediaElement;
};

const createFigcaption = (title, likes) => {
  const figcaption = document.createElement('figcaption');

  const span = document.createElement('span');
  span.appendChild(document.createTextNode(title));
  const div = document.createElement('div');

  const likesSpan = document.createElement('span');
  likesSpan.appendChild(document.createTextNode(likes));

  const button = document.createElement('button');
  button.classList.add('js-like');

  const img = utils.createIMG('like-icon.svg', 'likes');

  button.appendChild(img);

  div.append(likesSpan, button);
  figcaption.append(span, div);
  return figcaption;
};

const createFigure = (media) => {
  const { photographerId, image, video, title, likes, date } = media;
  const figure = document.createElement('figure');
  figure.classList.add('figure');

  const link = document.createElement('a');
  let path;
  let mediaElement;

  if (utils.isImage(media)) {
    path = `dist/img/${photographerId}/${image}`;
    mediaElement = createPicture(media);
  } else {
    path = `dist/img/${photographerId}/${video}`;
    mediaElement = createVideo(media);
  }

  link.setAttribute('href', path);
  link.appendChild(mediaElement);

  const caption = createFigcaption(title, likes);

  figure.append(link, caption);
  figure.setAttribute('data-likes', likes);
  figure.setAttribute('data-title', title);
  figure.setAttribute('data-date', date);
  return figure;
};

const updateTotalLikes = (operation) => {
  const totalLikesCountElement = document.querySelector('.meta-infos__likes span');
  let totalLikesCount = parseInt(totalLikesCountElement.innerText);

  operation === 'add' ? totalLikesCount++ : totalLikesCount--;

  totalLikesCountElement.innerText = totalLikesCount;
};

export class MediasList {
  constructor(containerID, medias) {
    this.id = containerID;
    this.medias = medias;
  }

  createFigureGroup() {
    const figureGroup = document.createElement('figure');
    figureGroup.id = this.id;
    figureGroup.setAttribute('role', 'group');
    figureGroup.classList.add('figure-group');

    const sortedMedias = this.medias.sort((a, b) => b.likes - a.likes);

    sortedMedias.forEach((media) => {
      figureGroup.appendChild(createFigure(media));
    });

    return figureGroup;
  }

  attachLikesEventListener() {
    const container = document.getElementById(this.id);
    const figures = Array.from(container.querySelectorAll('figure'));
    const likeBtns = container.querySelectorAll('.js-like');

    likeBtns.forEach((btn) =>
      btn.addEventListener('click', () => {
        const likeFigure = btn.closest('.figure');
        let likeCount = parseInt(likeFigure.getAttribute('data-likes'));

        if (btn.getAttribute('data-liked') === 'true') {
          likeCount--;
          btn.setAttribute('data-liked', 'false');
          updateTotalLikes('substract');
        } else {
          likeCount++;
          btn.setAttribute('data-liked', 'true');
          updateTotalLikes('add');
        }

        likeFigure.setAttribute('data-likes', likeCount);
        btn.previousElementSibling.textContent = likeCount;
      })
    );
    updateTotalLikes(container, figures);
  }
}
