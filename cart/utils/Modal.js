const $ModalItemTemplate = document.getElementById('modal-item').content.firstElementChild;
console.log($ModalItemTemplate);

class Modal extends HTMLElement {
  static get observedAttributes() {
    // 모니터링 할 속성 이름
    return ['img'];
  }
  constructor() {
    super();
    console.log('birth');
    this.attachShadow({ mode: 'open' });
    const $style = document.createElement('style');
    const $newModalItemTemplate = $ModalItemTemplate.cloneNode(true);

    $style.textContent = `
      @keyframes slideLeft {
        0% {
          opacity: 0;
          transform: translateX(20%);
        } 100% {
          opacity: 1;
          transform: translateX(0%);
        }
      }
      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      @keyframes slideUp {
        0% {
          transform: translateY(100%);
        }
        100% {
          transform: translateY(0%);
        }
      }
      @keyframes slideDown {
        0% {
          transform: translateY(0%);
        }
        100% {
          transform: translateY(100%);
        }
      }
      @keyframes fadeOut {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    .modal-black-area {
        display: flex;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,0.4);
        position:fixed;
        z-index: 9999;
        justify-content: center;
        align-items: center;
      }
      .modal-item {
        width: 40vw;
        height: 300px;
        background: linear-gradient(90deg, rgba(105, 94, 94, 1) 0%, rgba(60, 50, 50, 1) 100%);
        border-radius: 20px;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        color: white;
        animation: slideUp 0.2s ease-in, fadeIn 0.3s ease-in;
        position: relative;
      }
      .close .modal-item {
        animation: fadeOut 0.2s ease-out forwards, slideDown 0.2s ease-out;
      }
      .item-img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        margin-bottom: 10px;
        animation: slideLeft 0.8s ease-out;
      }
      .modal-item-name, .modal-item-price {
        animation: slideLeft 0.8s ease-out;
      }
      .modal-close {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: transparent;
        border: none;
        color: white;
        font-size: 20px;
        transition: 0.3s all;
        cursor: pointer;
      }
      .modal-close:active{
        transform: scale(0.8);
      }
    `;

    $newModalItemTemplate.addEventListener('click', e => {
      if (!(e.target.matches('.modal-black-area') || e.target.matches('.modal-close'))) return;
      $newModalItemTemplate.classList.add('close');
      document.body.style.overflowY = 'unset';

      $newModalItemTemplate.addEventListener('animationend', () => {
        if (document.body.querySelector('product-modal')) document.body.removeChild(document.body.querySelector('product-modal'));
      });
    });
    this.shadowRoot.appendChild($style);
    this.shadowRoot.appendChild($newModalItemTemplate);
  }

  connectedCallback() {
    document.body.style.overflowY = 'hidden';
  }
  attributeChangedCallback() {
    const $modal = this.shadowRoot.lastElementChild;
    $modal.querySelector('.modal-item-name').textContent = this.getAttribute('name');
    $modal.querySelector('.modal-item-price').textContent = this.getAttribute('price');
    $modal.querySelector('.item-img').setAttribute('src', this.getAttribute('img'));
  }
}
export default Modal;
