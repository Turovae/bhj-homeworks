const cookie = document.getElementById('cookie');
const clickerCounter = document.getElementById('clicker__counter');
const clickerSpeedMeter = document.getElementById('clicker__speed-meter');

let speed = 0;
let lastDate = new Date();

console.log(cookie);
console.log(clickerCounter);

cookie.addEventListener('click', () => {
    let nowDate = new Date();
    speed = Math.round(10000 / (nowDate - lastDate)) / 10;
    lastDate = nowDate;

    clickerCounter.innerText++;
    // cookie.classList.toggle('cookie_clicked');
    cookie.width = Math.random() * 60 + 150;

    clickerSpeedMeter.innerText = speed;
});