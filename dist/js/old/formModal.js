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

export class FormModal {
  // constructor(id, name) {
  //   this.id = id;
  //   this.name = name;
  // }

  // createModal() {
  //   const div = document.createElement('div');
  //   div.id = this.id;
  //   div.classList.add('modal-window', this.id);
  //   div.setAttribute('role', 'dialog');

  //   const section = document.createElement('section');

  //   const title = document.createElement('h1');
  //   title.id = 'modal-title';
  //   title.appendChild(document.createTextNode('Contactez-moi'));

  //   const span = document.createElement('span');
  //   span.appendChild(document.createTextNode(this.name));

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
  // }

  // openModal(container, btn) {
  // const modal = document.getElementById(this.id);
  //   modal.classList.add('open');
  //   container.setAttribute('aria-hidden', 'true');

  //   btn.setAttribute('aria-expanded', 'true');
  // }

  // closeModal(container, btn) {
  //   const modal = document.getElementById(this.id);
  //   modal.classList.remove('open');
  //   container.setAttribute('aria-hidden', 'false');
  //   btn.setAttribute('aria-expanded', 'false');
  //   btn.focus();
  // }

  attachEventListeners(btn) {
    const modal = document.getElementById(this.id);
    const closeBtn = modal.querySelector('.close');
    const form = modal.querySelector('form');
    const inputs = modal.querySelectorAll('.js-input');

    // btn.addEventListener('click', () => {
    //   this.openModal(modal, btn);
    // });

    // form.addEventListener('submit', (e) => {
    //   e.preventDefault();
    //   inputs.forEach((input) => {
    //     console.log(input.value);
    //   });
    //   this.closeModal(modal, btn);
    // });

    // closeBtn.addEventListener('click', () => {
    //   this.closeModal(modal, btn);
    // });

    window.addEventListener('click', (e) => {
      if (modal.classList.contains('open')) {
        if (e.target === modal) {
          if (e.target.closest('section') === null) {
            this.closeModal(modal, btn);
          }
        }
      }
    });

    window.addEventListener('keydown', (e) => {
      if (modal.classList.contains('open')) {
        this.contactModalKeyEvents(e, btn);
      }
    });
  }

  contactModalKeyEvents(e, btn) {
    const modal = document.getElementById(this.id);

    // Get a list of all focusable elements within modal
    const modalFocusableElements = Array.from(modal.querySelectorAll('.js-focusable'));
    // Save first and last focusable elements
    const firstFocusElement = modalFocusableElements[0];
    const lastFocusElement = modalFocusableElements[modalFocusableElements.length - 1];

    const isTabPressed = e.key === 'Tab' || e.code === 'Tab';
    const isEscapePressed = e.key === 'escape' || e.code === 'Escape';

    if (!(isTabPressed || isEscapePressed)) {
      return;
    }
    // Escape key closes modal if inside
    if (isEscapePressed) {
      this.closeModal(modal, btn);
      return;
    }
    // If Tab key
    if (isTabPressed) {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusElement) {
          e.preventDefault();
          lastFocusElement.focus();
          return;
        }
      } else {
        if (document.activeElement === lastFocusElement) {
          e.preventDefault();
          firstFocusElement.focus();
          return;
        }
      }
      if (!modalFocusableElements.includes(document.activeElement)) {
        e.preventDefault();
        firstFocusElement.focus();
      }
    }
  }
}
