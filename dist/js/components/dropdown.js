const expandListBox = (btn) => {
  btn.setAttribute('aria-expanded', 'true');
  btn.nextElementSibling.classList.add('open');
};

const collapseListBox = (btn) => {
  btn.setAttribute('aria-expanded', 'false');
  btn.nextElementSibling.classList.remove('open');
};

const createSelectLI = (value, label) => {
  const li = document.createElement('li');
  li.setAttribute('role', 'option');
  li.setAttribute('data-sort', value);
  li.setAttribute('aria-selected', 'false');
  li.setAttribute('aria-labelledBy', 'ariaLabel');

  const button = document.createElement('button');
  button.appendChild(document.createTextNode(label));

  li.appendChild(button);

  return li;
};

const onChange = (btn, option, medias) => {
  console.log(medias);
};

export class DropDown {
  constructor(dropdownLabels, dropdownSortMethods) {
    this.optionNames = dropdownLabels;
    this.optionMethods = dropdownSortMethods;
  }

  createDropdown(containerName) {
    const select = document.createElement('div');
    select.id = containerName;
    select.classList.add('select-group');

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
    btn.appendChild(document.createTextNode(this.optionNames[0].label));

    const ul = document.createElement('ul');
    ul.id = 'js-select';
    ul.setAttribute('role', 'listbox');

    this.optionNames.forEach((option) => {
      ul.appendChild(createSelectLI(option.value, option.label));
    });

    ul.firstElementChild.setAttribute('aria-selected', 'true');
    ul.setAttribute('aria-activedescendant', ul.firstElementChild.getAttribute('id'));

    divSelect.append(btn, ul);
    select.append(label, divSelect);
    return select;
  }

  attachEventListeners(containerName, medias) {
    const container = document.getElementById(containerName);

    const selectListItems = container.querySelectorAll('#js-select li');
    const sortBtn = container.querySelector('#js-sort');
    const selectList = container.querySelector('#js-select');

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
        onChange(sortBtn, option, medias);
      });
    });
  }
}
