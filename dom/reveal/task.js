"use strict"

const reveals = document.querySelectorAll('.reveal');

const isVisible = (elem) => {
    const {top, bottom} = elem.getBoundingClientRect();

    if (bottom < 0) {
        return false;
    }

    if (top > window.innerHeight) {
        return false;
    }

    return true;
}

document.onscroll = () => {
    reveals.forEach(elem => {
        if (isVisible(elem)) {
            setTimeout(() => {
                elem.classList.add('reveal_active');
            }, 200);
        } else {
            elem.classList.remove('reveal_active');
        }
    });
    
}
