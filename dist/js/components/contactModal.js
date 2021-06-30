export class ContactModal {
  constructor(name) {
    this.name = name;
    this.modal = this.createModal();
  }

  createModalSkeleton() {
    const div = document.createElement('div');
    div.id = 'contact-modal';
    div.classList.add('modal-window', 'contact-modal');
    return div;
  }

  createModalHeader() {
    const title = document.createElement('h1');
    title.id = 'modal-title';
    title.appendChild(document.createTextNode('Contactez-moi'));

    const span = document.createElement('span');
    span.appendChild(document.createTextNode(this.name));
    title.appendChild(span);

    return title;
  }

  createFormLabel(id, text, type = 'text') {
    const label = document.createElement('label');
    label.setAttribute('for', id);

    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.id = id;
    input.classList.add('js-focusable', 'js-input');
    input.required = true;

    label.append(document.createTextNode(text), input);
    return label;
  }

  createForm() {
    const form = document.createElement('form');

    const firstNameInput = this.createFormLabel('formfirstName', 'Prénom');
    const lastNameInput = this.createFormLabel('formLastName', 'Nom');
    const emailInput = this.createFormLabel('formEmail', 'Email', 'email');

    const textAreaLabel = document.createElement('label');
    textAreaLabel.setAttribute('for', 'formMessage');

    const textArea = document.createElement('textarea');
    textArea.id = 'formMessage';
    textArea.classList.add('js-focusable', 'js-input');
    textArea.required = true;

    textAreaLabel.append(document.createTextNode('Votre message'), textArea);

    const button = document.createElement('button');
    button.id = 'js-submit';
    button.classList.add('js-focusable');
    button.appendChild(document.createTextNode('Envoyer'));

    form.append(firstNameInput, lastNameInput, emailInput, textAreaLabel, button);

    const inputs = form.querySelectorAll('.js-input');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      inputs.forEach((input) => {
        console.log(input.value);
      });
      this.toggleModal();
    });

    return form;
  }

  createCloseBtn() {
    const btn = document.createElement('button');
    btn.classList.add('close', 'js-focusable');

    btn.addEventListener('click', () => {
      this.toggleModal();
    });

    return btn;
  }

  createModal() {
    const div = this.createModalSkeleton();
    const section = document.createElement('section');
    const title = this.createModalHeader();
    div.setAttribute('aria-labelledBy', title.id);

    const form = this.createForm();

    const closeBtn = this.createCloseBtn();

    section.append(title, form, closeBtn);
    div.appendChild(section);
    return div;
  }

  toggleModal() {
    this.modal.classList.toggle('open');
  }
}
