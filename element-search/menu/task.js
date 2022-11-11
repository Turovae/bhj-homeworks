let menuLinks = Array.from(document.querySelectorAll('.menu_sub'));

document.addEventListener('click', (event) => {
    const menuLink = event.target.closest('.menu__link');

    if (!(menuLink && menuLink.nextElementSibling.classList.contains('menu_sub'))) return;
    event.preventDefault();
    const menuSub = menuLink.nextElementSibling;
    menuLinks.forEach(elem => { 
        if (elem !== menuSub) {
            elem.classList.remove('menu_active')
        }
    });
    menuSub.classList.toggle('menu_active');

})