// import * as utils from './utils.js';

// const createSelectLI = (id, text) => {
//   const li = document.createElement('li');
//   li.setAttribute('role', 'option');
//   li.id = `sort-${id}`;
//   li.setAttribute('aria-selected', 'false');
//   li.setAttribute('aria-labelledBy', 'ariaLabel');

//   const button = document.createElement('button');
//   button.appendChild(document.createTextNode(text));

//   li.appendChild(button);

//   return li;
// };

// const createTotalLikesDiv = (medias) => {
//   let totalLikes = 0;
//   medias.forEach((media) => {
//     totalLikes += media.likes;
//   });

//   const div = document.createElement('div');
//   div.classList.add('meta-infos__likes');
//   const span = createSPAN(totalLikes);
//   span.setAttribute('tabindex', '0');
//   const img = createIMG('like-icon-black.svg', 'likes');
//   div.append(span, img);
//   return div;
// };

// const createPicture = (media) => {
//   const { photographerId, image, description } = media;

//   const picture = document.createElement('picture');

//   const source = document.createElement('source');
//   source.setAttribute('media', '(min-width:60rem)');
//   source.setAttribute('srcset', `dist/img/${photographerId}/${image}`);

//   const img = createIMG(`min/${photographerId}/${image}`, description);

//   picture.append(source, img);
//   return picture;
// };

// const createVideo = (media) => {
//   const { photographerId, video, description } = media;

//   const mediaElement = document.createElement('video');
//   mediaElement.setAttribute('title', description);

//   const source = document.createElement('source');
//   source.setAttribute('src', `dist/img/${photographerId}/${video}`);
//   source.setAttribute('type', 'video/mp4');

//   mediaElement.appendChild(source);
//   return mediaElement;
// };

// const createFigcaption = (title, likes) => {
//   const figcaption = document.createElement('figcaption');

//   const span = createSPAN(title);
//   const div = document.createElement('div');

//   const likesSpan = createSPAN(likes);

//   const button = document.createElement('button');
//   button.classList.add('js-like');

//   const img = createIMG('like-icon.svg', 'likes');

//   button.appendChild(img);

//   div.append(likesSpan, button);
//   figcaption.append(span, div);
//   return figcaption;
// };

// const createFigure = (media) => {
//   const { photographerId, image, video, title, likes, date } = media;
//   const figure = document.createElement('figure');
//   figure.classList.add('figure');

//   const link = document.createElement('a');
//   let path;
//   let mediaElement;

//   if (utils.isImage(media)) {
//     path = `dist/img/${photographerId}/${image}`;
//     mediaElement = createPicture(media);
//   } else {
//     path = `dist/img/${photographerId}/${video}`;
//     mediaElement = createVideo(media);
//   }

//   link.setAttribute('href', path);
//   link.appendChild(mediaElement);

//   const caption = createFigcaption(title, likes);

//   figure.append(link, caption);
//   figure.setAttribute('data-likes', likes);
//   figure.setAttribute('data-title', title);
//   figure.setAttribute('data-date', date);
//   return figure;
// };

// export const createFigureGroup = (medias) => {
//   const figureGroup = document.createElement('figure');
//   figureGroup.setAttribute('role', 'group');
//   figureGroup.id = 'js-figureGroup';
//   figureGroup.classList.add('figure-group');

//   medias.forEach((media) => {
//     figureGroup.appendChild(createFigure(media));
//   });

//   return figureGroup;
// };

// export const createSelectGroup = (containerDOM, filters) => {
//   const divGroup = document.createElement('div');
//   divGroup.classList.add('select-group');

//   const label = document.createElement('label');
//   label.setAttribute('for', 'js-sort');
//   label.id = 'ariaLabel';
//   label.appendChild(document.createTextNode('Trier par'));

//   const divSelect = document.createElement('div');
//   divSelect.classList.add('select');

//   const btn = document.createElement('button');
//   btn.id = 'js-sort';
//   btn.setAttribute('role', 'button');
//   btn.classList.add('btn');
//   btn.setAttribute('aria-haspopup', 'listbox');
//   btn.setAttribute('aria-expanded', 'false');
//   btn.setAttribute('aria-labelledBy', 'ariaLabel');
//   btn.appendChild(document.createTextNode(filters[0].label));

//   const ul = document.createElement('ul');
//   ul.id = 'js-select';
//   ul.setAttribute('role', 'listbox');

//   filters.forEach((filter) => {
//     switch (filter.label) {
//       case 'Popularité':
//         ul.appendChild(createSelectLI('likes', filter.label));
//         break;
//       case 'Date':
//         ul.appendChild(createSelectLI('date', filter.label));
//         break;
//       case 'Titre':
//         ul.appendChild(createSelectLI('titre', filter.label));
//         break;
//     }
//   });

//   ul.firstElementChild.setAttribute('aria-selected', 'true');
//   ul.setAttribute('aria-activedescendant', ul.firstElementChild.getAttribute('id'));

//   divSelect.append(btn, ul);
//   divGroup.append(label, divSelect);

//   return divGroup;
// };

// const createFormLabel = (id, text, type = 'text') => {
//   const label = document.createElement('label');
//   label.setAttribute('for', id);

//   const input = document.createElement('input');
//   input.setAttribute('type', type);
//   input.id = id;
//   input.classList.add('js-focusable', 'js-input');
//   input.required = true;

//   label.append(document.createTextNode(text), input);

//   return label;
// };

// export const createContactModal = (name) => {
//   const div = document.createElement('div');
//   div.classList.add('modal-window', 'contact-modal');
//   div.id = 'contact-modal';
//   div.setAttribute('role', 'dialog');

//   const section = document.createElement('section');

//   const title = document.createElement('h1');
//   title.id = 'modal-title';
//   title.appendChild(document.createTextNode('Contactez-moi'));

//   const span = createSPAN(name);

//   title.appendChild(span);

//   div.setAttribute('aria-labelledby', title.id);

//   const form = document.createElement('form');

//   const firstNameInput = createFormLabel('formFirstName', 'Prénom');
//   const lastNameInput = createFormLabel('formLastName', 'Nom');
//   const emailInput = createFormLabel('formEmail', 'Email', 'email');

//   const textAreaLabel = document.createElement('label');
//   textAreaLabel.setAttribute('for', 'formMessage');

//   const textArea = document.createElement('textarea');
//   textArea.id = 'formMessage';
//   textArea.classList.add('js-focusable', 'js-input');
//   textArea.required = true;

//   textAreaLabel.append(document.createTextNode('Votre message'), textArea);

//   const button = document.createElement('button');
//   button.id = 'js-submit';
//   button.classList.add('js-focusable');
//   button.appendChild(document.createTextNode('Envoyer'));

//   form.append(firstNameInput, lastNameInput, emailInput, textAreaLabel, button);

//   const closeBtn = document.createElement('button');
//   closeBtn.classList.add('close', 'js-focusable');

//   section.append(title, form, closeBtn);

//   div.appendChild(section);

//   return div;
// };

// export const createGalleryModal = () => {
//   const div = document.createElement('div');
//   div.classList.add('modal-window', 'gallery-modal');
//   div.setAttribute('role', 'dialog');
//   div.setAttribute('aria-label', 'image closup view');

//   const section = document.createElement('section');

//   const leftDiv = document.createElement('div');

//   const leftButton = document.createElement('button');
//   leftButton.id = 'js-prev';
//   leftButton.classList.add('gallery-modal__control', 'js-focusable');

//   const leftButtonImg = document.createElement('img');
//   leftButtonImg.setAttribute('src', 'dist/img/gallery-control.svg');
//   leftButton.appendChild(leftButtonImg);
//   leftDiv.appendChild(leftButton);

//   const mediaBlock = document.createElement('div');
//   mediaBlock.classList.add('medias');

//   const rightButton = document.createElement('button');
//   rightButton.id = 'js-next';
//   rightButton.classList.add('gallery-modal__control', 'js-focusable');

//   const rightButtonImg = document.createElement('img');
//   rightButtonImg.setAttribute('src', 'dist/img/gallery-control.svg');
//   rightButton.appendChild(rightButtonImg);

//   const closeBtn = document.createElement('button');
//   closeBtn.classList.add('close', 'js-focusable');

//   section.append(leftButton, mediaBlock, rightButton, closeBtn);

//   div.appendChild(section);

//   return div;
// };
