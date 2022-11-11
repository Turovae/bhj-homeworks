const holes = document.getElementsByClassName('hole');
const dead = document.getElementById('dead');
const lost = document.getElementById('lost');

let countDead = 0;
let countLost = 0;

Array.from(holes).forEach(hole => {
    hole.onclick = () => {
        if(hole.classList.contains('hole_has-mole')) {
            countDead++;
            if (countDead === 10) {
                alert("Вы победили!!!");
                countDead = countLost = 0;
            }   
        } else {
            countLost++;
            if (countLost === 5) {
                alert("Вы проиграли!");
                countDead = countLost = 0;
            }
        }
        dead.textContent = countDead;
        lost.textContent = countLost;
    }
});