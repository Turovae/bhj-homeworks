class TextEditor {
  constructor(container) {
    this.container = container;
    this.textField = container.querySelector('#editor');
    this.clearFieldButton = container.querySelector('#text-clear');

    console.log(this.textField);
    this.registerEvents();
    this.loadTextFromStorage();
  }

  registerEvents() {
    this.textField.addEventListener('keyup', this.changeText.bind(this));
    this.clearFieldButton.addEventListener('click', this.clearTextField.bind(this));
  }

  changeText() {
    localStorage.setItem('text', this.textField.value);
  }

  loadTextFromStorage() {
    this.textField.value = localStorage.getItem('text');
  }

  clearTextField() {
    this.textField.value = '';
    this.changeText();
  }
}

new TextEditor(document.querySelector('.card'));