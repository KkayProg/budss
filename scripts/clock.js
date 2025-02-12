const hr = document.querySelector('#hr');
const mn = document.querySelector('#mn');
const sc = document.querySelector('#sc');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');

let interval;

function updateClock() {
    let day = new Date();
    let hh = 30 * (day.getHours() % 12) + 0.5 * day.getMinutes();
    let mm = 6 * day.getMinutes() + 0.1 * day.getSeconds();
    let ss = 6 * day.getSeconds();

    hr.style.transform = `rotate(${hh}deg)`;
    mn.style.transform = `rotate(${mm}deg)`;
    sc.style.transform = `rotate(${ss}deg)`;
}

startBtn.addEventListener('click', () => {
    if (!interval) {
        updateClock();
        interval = setInterval(updateClock, 1000);
    }
});

pauseBtn.addEventListener('click', () => {
    clearInterval(interval);
    interval = null;
});
