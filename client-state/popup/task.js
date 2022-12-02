class SubscribeModal {
  constructor(modal) {
    this.modal = modal;
    this.registerEvents();
  }

  registerEvents() {
    this.getCookie('closed');
    if (this.getCookie('closed') !== 'true') {
      window.addEventListener('load', this.loadDocument.bind(this));
    }
    this.modal.addEventListener('click', this.closeModal.bind(this));
  }

  loadDocument() {
    this.modal.classList.add('modal_active');
    sessionStorage.setItem('isNotFirstLoadDocument', 'true');
  }

  closeModal(event) {
    const closeButton = event.target.closest('.modal__close');

    if (!closeButton) {
      return;
    }

    this.modal.classList.remove('modal_active');
    document.cookie = "closed=true";
  }

  getCookie(name) {
    const pairs = document.cookie.split('; ');
    const cookie = pairs.find(p => p.startsWith(name + '='));

    try {
      return cookie.substr(name.length + 1);
    } catch {
      return null;
    }
    
  }
}

new SubscribeModal(document.querySelector('#subscribe-modal'))