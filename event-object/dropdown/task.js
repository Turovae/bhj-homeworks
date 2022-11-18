
const openDropdownList = (event) => {
    const dropDownValueElem = event.target.closest('.dropdown__value');
    if (!dropDownValueElem) return;

    const dropDownList = dropDownValueElem.parentElement.querySelector('.dropdown__list');
    if (!dropDownList) return;

    dropDownList.classList.toggle('dropdown__list_active');

    dropDownList.addEventListener('click', (e) => {
        const listItem = e.target.closest('.dropdown__link');
        if (!listItem) return;
        e.preventDefault();

        dropDownValueElem.textContent = listItem.innerText;
        dropDownList.classList.remove('dropdown__list_active');
    });
}

document.addEventListener('click', openDropdownList);