"use strict"

const bookReader = document.getElementById('book');

function selectParameter (nodeList, clickedElement, activeClass) {
    nodeList.forEach(elem => {
        if (elem === clickedElement) {
            elem.classList.add(activeClass);
        } else {
            elem.classList.remove(activeClass);
        }
    });
}

function setParameterToClassList (parameter, currentClass, fromElem, toElem) {
    const mask = {
        'book_color-': 'textColor',
        'book_fs-': 'size',
        'book_bg-': 'bgColor'
    };
    if (currentClass) toElem.classList.remove(currentClass);
    currentClass = fromElem.dataset[mask[parameter]]
        ? parameter + fromElem.dataset[mask[parameter]]
        : '';
    if (currentClass) toElem.classList.add(currentClass);

    return currentClass;
}

function addSwitchParameterReader(parameter, container) {
    const nameElement = '.book__control_' + parameter;
    let currentMutableClass;

    const mask = {
        'font-size': 'book_fs-',
        'color': 'book_color-',
        'background': 'book_bg-'
    }

    const controlElement = container.querySelector(nameElement);
    const parameterActive = parameter === 'background'
                                ? 'color'
                                : parameter;
                                
    controlElement.addEventListener('click', (event) => {
        event.preventDefault();
        const clickedElem = event.target.closest('a');
        if (!clickedElem) return;

        const controlElems = controlElement.querySelectorAll('a');
        selectParameter(controlElems, clickedElem, parameterActive + '_active');
        currentMutableClass = setParameterToClassList(mask[parameter], currentMutableClass, clickedElem, container);
    });
}

['font-size', 'color', 'background'].forEach(param => {
    addSwitchParameterReader(param, bookReader);
});