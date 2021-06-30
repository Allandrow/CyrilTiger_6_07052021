// import * as utils from '../utils/utils.js';

// const createHeader = (photographersList) => {
//   const header = document.createElement('header');
//   header.setAttribute('role', 'banner');
//   header.appendChild(utils.createLogo());

//   const title = document.createElement('h1');
//   title.appendChild(document.createTextNode('Nos photographes'));

//   const nav = document.createElement('nav');
//   nav.ariaLabel = 'photographer categories';

//   const tagSet = utils.getPhotographTagSet(photographersList.photographers);
//   const ul = utils.createTagList(tagSet);
//   nav.appendChild(ul);
//   header.append(title, nav);

//   return header;
// };

// const createBackTopBtn = () => {
//   const button = document.createElement('button');
//   button.classList.add('hidden', 'back');
//   button.id = 'js-backToTop';
//   button.appendChild(document.createTextNode('Passer au contenu'));

//   return button;
// };

// const handleTagClick = (articles, tags, targetedTag) => {
// const activeTags = [];
// Parse each tag and toggle active class if tag already has it or if tag is same text value as targetedTag
// tags.forEach((tag) => {
//   if (tag.classList.contains('active') || utils.isSameTagText(tag, targetedTag)) {
//     tag.classList.toggle('active');
//   }
//   if (tag.classList.contains('active')) {
//     activeTags.push(tag);
//   }
// });

// if (activeTags.length === 0) {
//   articles.forEach((article) => article.classList.remove('hidden'));
//   return;
// }

//   articles.forEach((article) => {
//     article.classList.add('hidden');
//   });

//   activeTags.forEach((tag) => {
//     const article = tag.closest('.article');
//     if (article !== null) {
//       article.classList.remove('hidden');
//     }
//   });
// };

// export class Homepage {
//   constructor(containerDOM, photographerList) {
//     this.container = containerDOM;
//     this.photographers = photographerList;
//   }

// appendContentToContainer() {
// const header = createHeader(this.photographers);
// const photographerListDOM = this.photographers.createPhotographerList();
// const backTopBtn = createBackTopBtn();
// this.container.append(header, photographerListDOM, backTopBtn);
// }

// attachEventListeners() {
// const html = document.querySelector('html');
// const tags = this.container.querySelectorAll('.tag');
// const articles = this.container.querySelectorAll('.article');
// const btn = this.container.querySelector('#js-backToTop');

// window.addEventListener('scroll', () => {
//   html.scrollTop <= 400
//     ? btn.classList.add('hidden')
//     : btn.classList.remove('hidden');
// });

// btn.addEventListener('click', () => {
//   html.scrollTop = 0;
// });

//     tags.forEach((tag) =>
//       tag.addEventListener('click', () => handleTagClick(articles, tags, tag))
//     );
//   }
// }
