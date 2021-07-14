export class TopBtn {
  constructor() {}

  createBackTopBtn() {
    const html = document.querySelector('html');

    const button = document.createElement('button');
    button.classList.add('hidden', 'back');
    button.appendChild(document.createTextNode('Passer au contenu'));

    window.addEventListener('scroll', () => {
      html.scrollTop <= 400
        ? button.classList.add('hidden')
        : button.classList.remove('hidden');
    });

    button.addEventListener('click', () => {
      html.scrollTop = 0;
    });

    return button;
  }
}
