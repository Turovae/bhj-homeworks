let tooltip;
let lastClickedTooltipElement;
const positionTooltip = 'top';

// Обработчик, создающий или удаляющий подсказку
const toggleShowTooltip = (event) => {
    const hasTooltipElement = event.target.closest('.has-tooltip');

    // Если по элементу кликали, ничего не делаем
    if (hasTooltipElement === lastClickedTooltipElement) {
        event.preventDefault();
        return;
    }

    // Если кликаем в другом месте, текущая подсказка удаляется
    if (tooltip) {
        tooltip.remove();
        tooltip = null;
    }

    // Если кликнутый элемент не имеет подсказки,
    // выходим из обработчика
    if (!hasTooltipElement) return;
    lastClickedTooltipElement = hasTooltipElement;

    event.preventDefault();

    // Создаем подсказку
    tooltip = document.createElement('div');
    tooltip.innerText = hasTooltipElement.title;
    tooltip.classList.add('tooltip');
    tooltip.classList.add('tooltip_active');
    tooltip.dataset.position = positionTooltip;
    hasTooltipElement.insertAdjacentElement('afterend', tooltip);

    // Позиционируем подсказку
    positionElement(tooltip, hasTooltipElement);
}

// Функция позиционирования подсказки
const positionElement = (element, coordinateElement) => {
    const {left, top, height, width} = coordinateElement.getBoundingClientRect();
    element.style.left = left + 'px';
    element.style.top = top + height + 'px';

    switch (element.dataset.position) {
        case 'right':
            element.style.left = left + width + 'px';
            element.style.top = top + 'px';
            break;
        case 'left':
            element.style.left = left - element.getBoundingClientRect().width + 'px';
            element.style.top = top + 'px';
            break;
        case 'top':
            element.style.left = left + 'px';
            element.style.top = top - element.getBoundingClientRect().height + 'px';
            break;
        case 'bottom':
            tooltip.style.left = left + 'px';
            tooltip.style.top = top + height + 'px';
            break;
    }
}

document.addEventListener('click', toggleShowTooltip);
document.addEventListener('scroll', () => {
    // Вариант удаления подсказки при скролле
    // if (tooltip) {
    //     tooltip.remove();
    //     tooltip = null;
    // }

    // Вариант движения подсказки рядом с вызывающим
    // элементом при скролле документа
    if (!tooltip) return;
    positionElement(tooltip, lastClickedTooltipElement);
})