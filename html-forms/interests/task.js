const interestsMain = document.querySelector('.interests_main');
const interestCheckBoxes = interestsMain.querySelectorAll('.interest__check');

interestCheckBoxes.forEach(element => {
    element.addEventListener('change', (event) => {
        const currentCheckbox = event.target;

        // Меняем дочерние чекбоксы
        if (currentCheckbox.closest('.interest').querySelector('.interests')) {
            // Чекбоксы - наследники
            const childCheckBoxes = currentCheckbox
                .closest('.interest')
                .querySelector('.interests')
                .querySelectorAll('.interest__check');
            
            // Присваиваем наследникам состояние родителя
            childCheckBoxes.forEach(element => {
                element.checked = currentCheckbox.checked;
            });
        }        

        // Меняем состояние у предков
        changeParentCheckbox(currentCheckbox);
    })
});

const changeParentCheckbox = (element) => {
    // Если нет родительско чекбокса, выходим из функции
    if(!element.closest('.interests').closest('.interest')) return;

    // Родительский чекбокс
    const parentCheckBox = element
        .closest('.interests')
        .closest('.interest')
        .querySelector('.interest__check');

    // Чекбоксы наследники
    const descedantCheckboxes = parentCheckBox
        .closest('.interest')
        .querySelector('.interests')
        .querySelectorAll('.interest__check');
    
    // Отмеченные чекбоксы-наследники
    const descedantCheckboxesChecked = Array.from(descedantCheckboxes).filter((element) => {
        return element.checked;
    });

    // Присваиваем родительскому чекбоксу соответствующее состояние
    if (descedantCheckboxesChecked.length === 0) {
        parentCheckBox.checked = false;
        parentCheckBox.indeterminate = false;
    } else if (descedantCheckboxesChecked.length !== descedantCheckboxes.length) {
        parentCheckBox.checked = false;
        parentCheckBox.indeterminate = true;
    } else {
        parentCheckBox.checked = true;
        parentCheckBox.indeterminate = false;
    }

    // Рекурсивно вызываем функцию для предков
    changeParentCheckbox(parentCheckBox);
}