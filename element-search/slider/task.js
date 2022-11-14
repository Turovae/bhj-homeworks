const slider = document.querySelector('.slider');
const sliderDots = Array.from(document.querySelectorAll('.slider__dot'));
const sliderItems = Array.from(slider.querySelectorAll('.slider__item'));

let itemNumber = 0;

const sliderRedrawing = () => {
    sliderItems.forEach(elem => elem.classList.remove('slider__item_active'));
    sliderItems[itemNumber].classList.add('slider__item_active');
    sliderDots.forEach(elem => elem.classList.remove('slider__dot_active'));
    sliderDots[itemNumber].classList.add('slider__dot_active');
};

const slideSwitcherArrows = (event) => {
    const arrow = event.target.closest('.slider__arrow');
    if (!arrow) return;

    if (arrow.classList.contains('slider__arrow_prev')) {
        itemNumber--;
        if (itemNumber < 0) {
            itemNumber = sliderItems.length - 1;
        }
    }
    if (arrow.classList.contains('slider__arrow_next')) {
        itemNumber++;
        if (itemNumber >= sliderItems.length) {
            itemNumber = 0;
        }
    }

    sliderRedrawing();
}

const slideSwitcherDots = (event) => {
    const dot = event.target.closest('.slider__dot');
    if (!dot) return;
    
    itemNumber = sliderDots.indexOf(event.target);
    sliderRedrawing();
}

slider.addEventListener('click', slideSwitcherArrows);
slider.addEventListener('click', slideSwitcherDots);
