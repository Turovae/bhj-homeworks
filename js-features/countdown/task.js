const timer = document.getElementById("timer");

let remainingSeconds = +timer.textContent;
console.log(remainingSeconds);

let timerId;

timerId = setInterval(() => {
    timer.innerText = --remainingSeconds;
    if (remainingSeconds <= 0) {
        clearInterval(timerId);
        // setTimeout(() => alert('Вы победили в конкурсе!'), 0);
    }
},1000);

// const countTimer = function() {
//     initialTimer.textContent -= 1;
// }

// const interval = setInterval(countTimer, 1000);

// setTimeout(() => {clearInterval(countTimer); alert('Вы победили в конкурсе!')}, 60000);

// class Timer {
//     constructor(elemId, time) {
//         this.elem = document.getElementById(elemId)
//     }
// }

// #1
class TimerExtended {
    constructor(elemId, alarm) {
        this.elem = document.getElementById(elemId);
        this.seconds;
        this.timerId;
        this.alarm = alarm;
    }

    start(time) {
        // time - строка в формате HH:MM:SS
        let timeArr = time.split(':');
        this.seconds = timeArr[0] * 60 * 60 + timeArr[1] * 60 + +timeArr[2];
        this.render(this.seconds);
        this.timerId = setInterval(() => {
            this.render(--this.seconds);
            if (this.seconds <= 0) {
                clearInterval(this.timerId);
                this.timerId = null;
                setTimeout(this.alarm(), 0);
            }
        }, 1000);
    }

    render(seconds) {
        let remHours = Math.floor(seconds / (60 * 60));
        remHours = remHours < 10 ? '0' + remHours : '' + remHours;
        let remMins = Math.floor(seconds / 60) - remHours * 60;
        remMins = remMins < 10 ? '0' +  remMins : '' + remMins;
        let remSeconds = seconds % 60;
        remSeconds = remSeconds < 10 ? '0' + remSeconds : '' + remSeconds;
        this.elem.innerText = `${remHours}:${remMins}:${remSeconds}`;
    }
}

const timer1 = new TimerExtended('timer1', () => { console.log("Вы победили!!!") });
timer1.start('00:00:20');

// #2
const timer2 = new TimerExtended('timer2', () => {
    let a = document.createElement('a');
    a.href = 'file.txt';
    a.download = '';
    a.target = '_blank';
    console.log(a.download);
    a.click();
});
timer2.start('00:00:05');