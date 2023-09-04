import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const elements = {
  buttonStart: document.querySelector('[data-start]'),
  day: document.querySelector('[data-days]'),
  hour: document.querySelector('[data-hours]'),
  minute: document.querySelector('[data-minutes]'),
  second: document.querySelector('[data-seconds]'),
  timerContainer: document.querySelector('.timer'),
  fieldContainer: document.querySelectorAll('.field'),
};

elements.timerContainer.style.display = 'flex';
elements.timerContainer.style.gap = '15px';


elements.fieldContainer.forEach(element => {
  element.style.display = 'flex';
  element.style.flexDirection = 'column';
  element.style.alignItems = 'center';
  element.style.justifyContent = 'space-between';
  element.style.border = '2px solid black';
  element.style.width = '70px';
  element.style.marginTop = '20px';
});

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
      Notiflix.Notify.failure('Please choose a date in the future');
      elements.buttonStart.disabled = true;
    } else { 
        elements.buttonStart.disabled = false;
    }
  },
};

const currentTimer = flatpickr('#datetime-picker', options);

elements.buttonStart.addEventListener('click', handlerBtnStart);
elements.buttonStart.disabled = true;

function handlerBtnStart() {
    const intervalID = setInterval(() => {
      const userDate = currentTimer.selectedDates[0].getTime();
      const newCurrentDate = new Date().getTime();
      const ms = userDate - newCurrentDate;

      if (ms <= 0)  {
        clearInterval(intervalID);
        elements.day.textContent = '00';
        elements.hour.textContent = '00';
        elements.minute.textContent = '00';
        elements.second.textContent = '00';
        elements.buttonStart.disabled = false;
      } else {
        elements.day.textContent = convertMs(ms).days;
        elements.hour.textContent = convertMs(ms).hours;
        elements.minute.textContent = convertMs(ms).minutes;
        elements.second.textContent = convertMs(ms).seconds;
      }
    }, 1000)
}


function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { 
      days: addLeadingZero(days),
      hours: addLeadingZero(hours),
      minutes: addLeadingZero(minutes),
      seconds: addLeadingZero(seconds)
     };
  }


  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }