import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const elements = {
  buttonStart: document.querySelector('[data-start]'),
  day: document.querySelector('[data-days]'),
  hour: document.querySelector('[data-hours]'),
  minute: document.querySelector('[data-minutes]'),
  second: document.querySelector('[data-seconds]'),
};

// const currentTime = new Date()
// const currentDay = currentTime.getDate();
// console.log(currentDay)

// console.log(currentTime)

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const userDate = selectedDates[0].getTime();
    const currentData = options.defaultDate.getTime();
    if (userDate < currentData) {
      window.alert('Please choose a date in the future');
      // Notiflix.Notify.failure('Please choose a date in the future');
      elements.buttonStart.disabled = true;
    } else { 
        elements.buttonStart.disabled = false;
    }
  },
};

const curretTimer = ('#datetime-picker', options);

elements.buttonStart.addEventListener('click', handlerBtnStart);
elements.buttonStart.disabled = true;

function handlerBtnStart() {
    
}
// function convertMs(ms) {

//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;

//     // Remaining days
//     const days = Math.floor(ms / day);
//     // Remaining hours
//     const hours = Math.floor((ms % day) / hour);
//     // Remaining minutes
//     const minutes = Math.floor(((ms % day) % hour) / minute);
//     // Remaining seconds
//     const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//     return { days, hours, minutes, seconds };
//   }
