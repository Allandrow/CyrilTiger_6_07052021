import * as utils from '../utils.js';

export class MediaList {
  constructor(medias) {
    this.medias = medias;
    this.container = this.createFigureGroup();
  }

  createFigureGroup() {
    const figureGroup = document.createElement('figure');
    figureGroup.id = 'js-figureGroup';
    figureGroup.setAttribute('role', 'group');
    figureGroup.classList.add('figure-group');
    return figureGroup;
  }

  createPicture(media) {
    const { photographerId, image, description } = media;

    const picture = document.createElement('picture');

    const source = document.createElement('source');
    source.setAttribute('media', '(min-width:60rem)');
    source.setAttribute('srcset', `dist/img/${photographerId}/${image}`);

    const img = utils.createIMG(`min/${photographerId}/${image}`, description);
    img.setAttribute('data-id', media.id);

    picture.append(source, img);
    return picture;
  }

  createFigcaption(title, likes) {
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

    // Like incrementation event
    button.addEventListener('click', () => {
      const figure = button.closest('figure');
      const currentLikes = parseInt(likesSpan.textContent);
      const totalLikesDOM = document.querySelector('.meta-infos__likes span');

      if (currentLikes === likes) {
        figure.setAttribute('data-likes', currentLikes + 1);
        likesSpan.textContent = currentLikes + 1;
      } else {
        figure.setAttribute('data-likes', likes);
        likesSpan.textContent = likes;
      }
      totalLikesDOM.textContent = utils.getFigureLikes(
        Array.from(this.container.childNodes)
      );
    });
    return figcaption;
  }

  createFigure(media) {
    const { photographerId, image, video, title, likes, date } = media;
    const figure = document.createElement('figure');
    figure.classList.add('figure');

    const link = document.createElement('a');
    let path;
    let mediaElement;

    if (utils.isImage(media)) {
      path = `dist/img/${photographerId}/${image}`;
      mediaElement = this.createPicture(media);
    } else {
      path = `dist/img/${photographerId}/${video}`;
      mediaElement = utils.createVideo(media);
      mediaElement.setAttribute('data-id', media.id);
    }

    link.setAttribute('href', path);
    link.appendChild(mediaElement);
    const caption = this.createFigcaption(title, likes);

    figure.append(link, caption);
    figure.setAttribute('data-likes', likes);
    figure.setAttribute('data-title', title);
    figure.setAttribute('data-date', date);
    return figure;
  }

  sortFigures(sortMethod) {
    const figures = Array.from(this.container.childNodes);
    figures.sort(sortMethod);

    for (const figure of figures) {
      this.container.appendChild(figure);
    }
  }

  sortMedias(sortMethod) {
    this.medias.sort(sortMethod);
  }

  getMediaList() {
    this.medias.forEach((media) => {
      this.container.appendChild(this.createFigure(media));
    });

    return this.container;
  }
}
