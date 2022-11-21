"use strict"

class Rotator {
    constructor(element) {
        this.rotatorElems = element.querySelectorAll('.rotator__case');
        this.currentIndex = 0;
        this.speed;
    }

    getDataAttr(current) {
        const {speed, color} = current.dataset;
        this.speed = speed;
        current.style.color = color;
    }

    next(current) {
        setTimeout(() => {
            current.classList.remove('rotator__case_active');
            
            this.currentIndex++;
            if (this.currentIndex >= this.rotatorElems.length) {
                this.currentIndex = 0;
            }

            current = this.rotatorElems[this.currentIndex]

            current.classList.add('rotator__case_active');
            this.getDataAttr(current);
           
            
            this.next(current, this.speed);
        }, this.speed)
    }

    start() {
        let current = this.rotatorElems[this.currentIndex];
        this.getDataAttr(current);

        this.next(current, this.speed);
    }
}

let rotator = new Rotator(document.querySelector('.rotator'));
rotator.start();