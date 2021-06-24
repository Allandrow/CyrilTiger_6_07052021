import * as utils from './utils.js';

const expandListBox = (btn) => {
  btn.setAttribute('aria-expanded', 'true');
  btn.nextElementSibling.classList.add('open');
};

const collapseListBox = (btn) => {
  btn.setAttribute('aria-expanded', 'false');
  btn.nextElementSibling.classList.remove('open');
};

const onChange = (option) => {
  const btn = document.getElementById('js-sort');
  const figures = Array.from(document.querySelectorAll('#js-figureGroup .figure'));

  btn.innerText = option.label;
  figures.sort(sortingObj[value]);

  for (const figure of figures) {
    figure.parentNode.appendChild(figure);
  }
};

const createSelectLI = (id, text) => {
  const li = document.createElement('li');
  li.setAttribute('role', 'option');
  li.id = `sort-${id}`;
  li.setAttribute('aria-selected', 'false');
  li.setAttribute('aria-labelledBy', 'ariaLabel');

  const button = document.createElement('button');
  button.appendChild(document.createTextNode(text));

  li.appendChild(button);

  return li;
};

const createSelectGroup = (filters, container) => {
  const label = document.createElement('label');
  label.setAttribute('for', 'js-sort');
  label.id = 'ariaLabel';
  label.appendChild(document.createTextNode('Trier par'));

  const divSelect = document.createElement('div');
  divSelect.classList.add('select');

  const btn = document.createElement('button');
  btn.id = 'js-sort';
  btn.setAttribute('role', 'button');
  btn.classList.add('btn');
  btn.setAttribute('aria-haspopup', 'listbox');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-labelledBy', 'ariaLabel');
  btn.appendChild(document.createTextNode(filters[0].label));

  const ul = document.createElement('ul');
  ul.id = 'js-select';
  ul.setAttribute('role', 'listbox');

  filters.forEach((filter) => {
    switch (filter.label) {
      case 'Popularité':
        ul.appendChild(createSelectLI('likes', filter.label));
        break;
      case 'Date':
        ul.appendChild(createSelectLI('date', filter.label));
        break;
      case 'Titre':
        ul.appendChild(createSelectLI('titre', filter.label));
        break;
    }
  });

  ul.firstElementChild.setAttribute('aria-selected', 'true');
  ul.setAttribute('aria-activedescendant', ul.firstElementChild.getAttribute('id'));

  divSelect.append(btn, ul);
  container.append(label, divSelect);

  return container;
};

export class MediaSortSelect {
  constructor(options, container) {
    this.options = options;
    this.container = container;
  }

  createSelect() {
    const selectGroup = createSelectGroup(this.options, this.container);

    return selectGroup;
  }

  static attachEventListeners(dropdown) {
    const selectListItems = dropdown.querySelectorAll('#js-select li');
    const sortBtn = dropdown.querySelector('#js-sort');
    const selectList = dropdown.querySelector('#js-select');

    sortBtn.addEventListener('mouseenter', () => {
      expandListBox(sortBtn);
    });
    selectList.addEventListener('mouseleave', () => {
      collapseListBox(sortBtn);
    });
    sortBtn.addEventListener('focus', () => {
      expandListBox(sortBtn);
    });
    selectListItems.forEach((option) => {
      option.addEventListener('click', () => {
        console.log(option);
        // handleSorting(option);
        // changeSelectedFilter(option);
        collapseListBox(sortBtn);
      });
      option.addEventListener('focusout', () => {
        if (option === selectList.lastElementChild) {
          collapseListBox(sortBtn);
        }
      });
    });
  }
}
