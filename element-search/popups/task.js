const modalMain = document.getElementById('modal_main');
const modalSuccess = document.getElementById('modal_success');

window.addEventListener('load', () => {
    modalMain.classList.add('modal_active');
});

document.addEventListener('click', (event) => {
    const modal = event.target.closest('.modal');
    if (!modal) return;

    if (event.target.closest('.modal__close')) {
        modal.classList.remove('modal_active');
    }

    if (event.target.closest('.show-success')) {
        modalSuccess.classList.add('modal_active');
    }
});
