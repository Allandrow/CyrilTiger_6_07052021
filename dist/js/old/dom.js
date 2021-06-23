// import * as utils from './utils.js';

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
