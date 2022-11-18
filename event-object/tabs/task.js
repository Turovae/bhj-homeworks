const tabNavigation = document.querySelector('.tab__navigation');
const tabContents = document.querySelectorAll('.tab__content');
const tabs = Array.from(tabNavigation.querySelectorAll('.tab'));

tabNavigation.addEventListener('click', (event) => {
    const tab = event.target.closest('.tab');
    if (!tab || tab.classList.contains('tab_active')) return;

    tabs.forEach((elem, index) => {
        if (elem === tab) {
            elem.classList.add('tab_active');
            tabContents[index].classList.add('tab__content_active');
        } else {
            elem.classList.remove('tab_active');
            tabContents[index].classList.remove('tab__content_active');
        }
    });
    
});