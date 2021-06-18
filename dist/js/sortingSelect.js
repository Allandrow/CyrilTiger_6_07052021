import * as dom from './dom.js';
import * as utils from './utils.js';

class SortingSelect {
  constructor(sortingOptions) {
    this.sortingOptions = sortingOptions;
  }

  createSelect() {
    return dom.createSelectGroup(this.sortingOptions);
  }

  static changeSelectedFilter(option) {
    if (option.getAttribute('aria-selected') !== 'true') {
      document
        .querySelector('#js-select li[aria-selected="true"]')
        .setAttribute('aria-selected', 'false');
      option.setAttribute('aria-selected', 'true');
    }
  }

  handleSorting(selectOption) {
    const btn = document.getElementById('js-sort');
    const figures = Array.from(document.querySelectorAll('#js-figureGroup .figure'));
    const option = this.sortingOptions.find(
      (object) => object.label === selectOption.innerText
    );

    btn.innerText = option.label;
    figures.sort(option.sorting);

    for (const figure of figures) {
      figure.parentNode.appendChild(figure);
    }
  }

  static expandListBox(btn) {
    btn.setAttribute('aria-expanded', 'true');
    btn.nextElementSibling.classList.add('open');
  }

  static collapseListBox(btn) {
    btn.setAttribute('aria-expanded', 'false');
    btn.nextElementSibling.classList.remove('open');
  }
}

export const sortingOptions = new SortingSelect([
  {
    label: 'Popularité',
    sorting: utils.sortByLikes,
  },
  {
    label: 'Date',
    sorting: utils.sortByDate,
  },
  {
    label: 'Titre',
    sorting: utils.sortByTitle,
  },
]);

export const attachFiltersEventListeners = () => {
  const selectListItems = document.querySelectorAll('#js-select li');
  const sortBtn = document.getElementById('js-sort');
  const selectList = document.getElementById('js-select');

  sortBtn.addEventListener('mouseenter', () => {
    SortingSelect.expandListBox(sortBtn);
  });
  selectList.addEventListener('mouseleave', () => {
    SortingSelect.collapseListBox(sortBtn);
  });
  sortBtn.addEventListener('focus', () => {
    SortingSelect.expandListBox(sortBtn);
  });
  selectListItems.forEach((option) => {
    option.addEventListener('click', () => {
      sortingOptions.handleSorting(option);
      SortingSelect.changeSelectedFilter(option);
      SortingSelect.collapseListBox(sortBtn);
    });
    option.addEventListener('focusout', () => {
      if (option === selectList.lastElementChild) {
        SortingSelect.collapseListBox(sortBtn);
      }
    });
  });
};
