// import * as dom from './dom.js';
// import * as utils from './utils.js';

// class Dropdown {
//   constructor(options, onChange) {
//     this.selectedValue = options[0];
//     this.options = options;
//     this.onChange = onChange;
//   }

//   createSelect() {
//     const selectGroupDom = dom.createSelectGroup(this.options);
//     selectGroupDom.addEventListener('click', () => {
//       onChange(value);
//     });
//   }

//   changeSelectedFilter(option) {
//     if (option.getAttribute('aria-selected') !== 'true') {
//       document
//         .querySelector('#js-select li[aria-selected="true"]')
//         .setAttribute('aria-selected', 'false');
//       option.setAttribute('aria-selected', 'true');
//     }
//   }

//   expandListBox(btn) {
//     btn.setAttribute('aria-expanded', 'true');
//     btn.nextElementSibling.classList.add('open');
//   }

//   collapseListBox(btn) {
//     btn.setAttribute('aria-expanded', 'false');
//     btn.nextElementSibling.classList.remove('open');
//   }

// attachFiltersEventListeners(selectGroupDom) {
//   const selectListItems = selectGroupDom.querySelectorAll('#js-select li');
//   const sortBtn = selectGroupDom.getElementById('js-sort');
//   const selectList = selectGroupDom.getElementById('js-select');

//   sortBtn.addEventListener('mouseenter', () => {
//     this.expandListBox(sortBtn);
//   });
//   selectList.addEventListener('mouseleave', () => {
//     this.collapseListBox(sortBtn);
//   });
//   sortBtn.addEventListener('focus', () => {
//     SortingSelect.expandListBox(sortBtn);
//   });
//   selectListItems.forEach((option) => {
//     option.addEventListener('click', () => {
//       sortingOptions.handleSorting(option);
//       SortingSelect.changeSelectedFilter(option);
//       SortingSelect.collapseListBox(sortBtn);
//     });
//     option.addEventListener('focusout', () => {
//       if (option === selectList.lastElementChild) {
//         SortingSelect.collapseListBox(sortBtn);
//       }
//     });
//   });
// }
// }

// const sortingObj = {
//   popularity: sortByPopularity,
//   date: () => {},
//   title: () => {}
// };

// const onChange = (value) => {
//   const btn = document.getElementById('js-sort');
//   const figures = Array.from(document.querySelectorAll('#js-figureGroup .figure'));

//   btn.innerText = option.label;
//   figures.sort(sortingObj[value]);

//   for (const figure of figures) {
//     figure.parentNode.appendChild(figure);
//   }
// };

// const obj = [
//   {
//     value: 'popularity',
//     label: 'Popularité',
//     sortFunction: sortByPopularity,
//   },
// ];

// export const dropdown = new Dropdown(
//   obj.map(({ sortFunction, ...rest }) => rest),
//   onChange
// );
// export const dropdown2 = new Dropdown(options, onChange);
