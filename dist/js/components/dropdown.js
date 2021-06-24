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
  li.id = value;
  li.setAttribute('role', 'option');
  li.setAttribute('data-sort', value);
  li.setAttribute('aria-selected', 'false');
  li.setAttribute('aria-labelledBy', `${value}Btn`);

  const button = document.createElement('button');
  button.id = `${value}Btn`;
  button.appendChild(document.createTextNode(label));

  li.appendChild(button);

  return li;
};

const changeOptionsAriaValues = (previousOption, newOption) => {
  previousOption.setAttribute('aria-selected', 'false');
  newOption.setAttribute('aria-selected', 'true');
  newOption.closest('ul').setAttribute('aria-activedescendant', newOption.id);
};

const onChange = (btn, optionList, option, sortMethods, mediasList) => {
  const options = Array.from(optionList);
  const selectedOption = options.find(
    (option) => option.getAttribute('aria-selected') === 'true'
  );
  const figureGroup = document.getElementById(mediasList.id);
  const figures = Array.from(figureGroup.querySelectorAll('figure'));

  if (option !== selectedOption) {
    changeOptionsAriaValues(selectedOption, option);
    btn.innerText = option.innerText;
  }
  const sortMethod = sortMethods.find((method) => method.value === option.id);

  figures.sort(sortMethod.sort);

  for (const figure of figures) {
    figureGroup.appendChild(figure);
  }

  collapseListBox(btn);
};

export class DropDown {
  constructor(dropdownLabels, dropdownSortMethods, containerID) {
    this.optionNames = dropdownLabels;
    this.optionMethods = dropdownSortMethods;
    this.id = containerID;
  }

  createDropdown() {
    const select = document.createElement('div');
    select.id = this.id;
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
    btn.classList.add('btn', 'js-sort');
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-labelledBy', 'ariaLabel');
    btn.appendChild(document.createTextNode(this.optionNames[0].label));

    const ul = document.createElement('ul');
    ul.classList.add('js-select');
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

  attachEventListeners(mediasList) {
    const container = document.getElementById(this.id);
    const sortBtn = container.querySelector('.js-sort');
    const selectList = container.querySelector('.js-select');
    const selectListItems = container.querySelectorAll('.js-select li');

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
        onChange(sortBtn, selectListItems, option, this.optionMethods, mediasList);
      });
    });
  }
}
