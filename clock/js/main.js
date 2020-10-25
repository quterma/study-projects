const mainItem = document.getElementById('mainItem'); // активный блок
const mainTitle = document.getElementById('mainTitle'); // название активного блока
const timeButton = document.getElementById('navTime'); // кнопка часов в меню
const timerButton = document.getElementById('navTimer'); // кнопка таймера в меню
const dateButton = document.getElementById('navDate'); // кнопка даты в меню

// вставляет название активного блока
function fillTitle(title) {
  mainTitle.innerHTML += title;
}

// сохраняет текущие часы, минуты, секунды
function storeTime() {
  const timeStorage = [];
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  let seconds = new Date().getSeconds();
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;
  timeStorage.push(hours, minutes, seconds);
  return timeStorage;
}

// вставляет в активный блок дивы для времени
function appendTimeSections() {
  const divStorage = [];
  const timeSection = document.createElement('div');
  timeSection.className += 'time__section';
  const timeDivider = document.createElement('div');
  timeDivider.className += 'time__divider';
  timeDivider.innerHTML += ':';
  // timeDivider.style.visibility = 'visible'
  for (let i=0; i<5; i++) {
    if (i==0 || i==2 || i==4) {
      divStorage.push(timeSection.cloneNode(true));
    } else {
      divStorage.push(timeDivider.cloneNode(true));
    };
  }
  return divStorage;
}

// вставляет в мейн контейнер дивы под таймер
const timerDiv = `
<div id="timerStartButton" class="timer__button">
  <i class="fas fa-play timer__button__icon"></i>
</div>
<div class="timer__container">
  <div id="timerMin" class="timer__section">00</div>
  <div class="timer__divider">:</div>
  <div id="timerSec" class="timer__section">00</div>
  <div class="timer__divider">:</div>
  <div id="timerMilSec" class="timer__section">0</div>
</div>
<div id="timerStopButton" class="timer__button">
  <i class="fas fa-stop timer__button__icon"></i>
</div>
<div id="timerClearButton" class="timer__button">
  <i class="fas fa-broom timer__button__icon"></i>
</div>
`;

const dateDiv = `
<div id="day" class="date__section"></div>
<div id="month" class="date__section"></div>
<div id="year" class="date__section"></div>
`;

function storeDate() {
  const filledDay = new Date().getDate();
  let filledMonth = new Date().getMonth();
  switch (filledMonth) {
    case 0: filledMonth = 'January';
    break;
    case 1: filledMonth = 'February';
    break;
    case 2: filledMonth = 'March';
    break;
    case 3: filledMonth = 'April';
    break;
    case 4: filledMonth = 'May';
    break;
    case 5: filledMonth = 'June';
    break;
    case 6: filledMonth = 'July';
    break;
    case 7: filledMonth = 'August';
    break;
    case 8: filledMonth = 'September';
    break;
    case 9: filledMonth = 'October';
    break;
    case 10: filledMonth = 'November';
    break;
    case 11: filledMonth = 'December';
  }
  const filledYear = new Date().getFullYear();
  const dateArr = [];
  dateArr.push(filledDay);
  dateArr.push(filledMonth);
  dateArr.push(filledYear);
  return dateArr;
}

function fillDate() {
  const dateStorage = storeDate();
  if (mainItem.childNodes.length > 0) {
    document.getElementById('day').innerHTML = dateStorage[0];
    document.getElementById('month').innerHTML = dateStorage[1];
    document.getElementById('year').innerHTML = dateStorage[2];
    }
}

// вставляет текущее время в дивы в активном блоке
function fillTime() {
  const timeStorage = storeTime();
  if (mainItem.childNodes.length > 0) {
  mainItem.childNodes[0].innerHTML = timeStorage[0];
  mainItem.childNodes[2].innerHTML = timeStorage[1];
  mainItem.childNodes[4].innerHTML = timeStorage[2];
  }
}

function startTimer() {
  const timerMin = document.getElementById('timerMin');
  const timerSec = document.getElementById('timerSec');
  const timerMilSec = document.getElementById('timerMilSec');
  if (timerMin.innerHTML === '00' && timerSec.innerHTML === '00' && timerMilSec.innerHTML === '0') {
    let milSec = 0;
    let sec = 0;
    let min = 0;
    const addMilSec = setInterval(() => {
      timerMilSec.innerHTML = milSec;
      timerSec.innerHTML = `0${sec}`;
      timerMin.innerHTML = `0${min}`;
      milSec ++;
      if (milSec > 9) {
        milSec = 0;
        sec++
      }
      if (sec > 59) {
        sec = 0;
        min++;
      }
      if (min > 59) min = 0;
      if (sec > 9) timerSec.innerHTML = sec;
      if (min > 9) timerMin.innerHTML = min;
      function stopInterval() {
        clearInterval(addMilSec);
      }
      const timerStopButtonClick = document.getElementById('timerStopButton').addEventListener('click', stopInterval);
    },100);
  }
    
  function clearTimer() {
    timerMilSec.innerHTML = '0';
    timerSec.innerHTML = '00';
    timerMin.innerHTML = '00';
  }
  const timerClearButtonClick = document.getElementById('timerClearButton').addEventListener('click', clearTimer);
}

// // скрывает разделители времени
// function hide() {
//   const timeDividers = document.getElementsByClassName('time__divider');
//   for (let i=0; i<timeDividers.length; i++) {
//     timeDividers[i].style.visibility = 'hidden';
//   }
//   return timeDividers;
// }

// // показывает разделители времени
// function show() {
//   const timeDividers = document.getElementsByClassName('time__divider');
//   for (let i=0; i<timeDividers.length; i++) {
//     timeDividers[i].style.visibility = 'visible';
//   }
//   return timeDividers;
// }

// // вызывает hide и show имитируя мигание разделителя
// function blink() {
//   hide();
//   setTimeout(show, 300);
//   setTimeout(() => requestAnimationFrame(blink), 1200);
// }

// // функция остановки обновления времени
// function stopTimeFiller() {
//   clearInterval(loopTimeFiller());
// }

// Общая функция времени
function time() {
  const title = fillTitle('Time');
  const append = appendTimeSections();
  mainItem.append(...append);
  // обновление времени 10 раз в сек
  const loopTimeFiller = setInterval(() => fillTime(), 100);
  // blink();
}

function timer() {
  const title = fillTitle('Stopwatch');
  mainItem.innerHTML = timerDiv;
  const timerStartButtonClick = document.getElementById('timerStartButton').addEventListener('click', startTimer);
  
  
}

function date() {
  const title = fillTitle('Date');
  mainItem.innerHTML = dateDiv;
  fillDate();
}

// !Время! (по умолчанию)!
time();

// функция запуска времени по кнопке
function timeButtonClick() {
  mainItem.innerHTML = '';
  mainTitle.innerHTML = '';
  // stopTimeFiller();
  time();
}

// функция запуска таймера по кнопке
function timerButtonClick() {
  mainItem.innerHTML = '';
  mainTitle.innerHTML = '';
  timer();
}

function dateButtonClick() {
  mainItem.innerHTML = '';
  mainTitle.innerHTML = '';
  date();
}

timeButton.addEventListener('click', timeButtonClick);
timerButton.addEventListener('click', timerButtonClick);
dateButton.addEventListener('click', dateButtonClick);