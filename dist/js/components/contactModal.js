import { Observer } from './observer.js';

export class ContactModal {
  constructor(name) {
    this.name = name;
    this.modal = this.createModal();
    this.observer = new Observer();
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
      this.closeModal();
    });

    return form;
  }

  createCloseBtn() {
    const btn = document.createElement('button');
    btn.classList.add('close', 'js-focusable');

    btn.addEventListener('click', () => {
      this.onClose();
    });

    return btn;
  }

  contactModalKeyEvents(e) {
    const modalFocusableElements = Array.from(
      this.modal.querySelectorAll('.js-focusable')
    );
    const firstFocusElement = modalFocusableElements[0];
    const lastFocusElement = modalFocusableElements[modalFocusableElements.length - 1];
    const isTabPressed = e.key === 'Tab' || e.code === 'Tab';
    const isEscapePressed = e.key === 'Escape' || e.code === 'Escape';
    const activeElement = document.activeElement;

    if (!(isTabPressed || isEscapePressed)) {
      return;
    }
    if (isEscapePressed) {
      this.onClose();
    }
    if (isTabPressed) {
      if (e.shiftKey) {
        if (activeElement === firstFocusElement) {
          e.preventDefault();
          lastFocusElement.focus();
          return;
        }
      } else {
        if (activeElement === lastFocusElement) {
          e.preventDefault();
          firstFocusElement.focus();
          return;
        }
      }
      if (!modalFocusableElements.includes(activeElement)) {
        e.preventDefault();
        firstFocusElement.focus();
        return;
      }
    }
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

    // Events Listeners
    // Close modal when clicking outside of it
    window.addEventListener('click', (e) => {
      if (this.modal.classList.contains('open')) {
        if (e.target.closest('section') === null) {
          this.onClose();
        }
      }
    });

    window.addEventListener('keydown', (e) => {
      if (this.modal.classList.contains('open')) {
        this.contactModalKeyEvents(e);
      }
    });
    return div;
  }

  openModal() {
    this.modal.classList.add('open');
  }

  closeModal() {
    this.modal.classList.remove('open');
  }

  onClose() {
    this.observer.addCallback(this.closeModal.bind(this));
    this.observer.fire();
    this.observer.clearCallbacks();
  }
}
