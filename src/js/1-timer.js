import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import icon from '../images/xmark.png';

const button = document.querySelector('.timer-btn');
const timerDays = document.querySelector('.value[data-days]');
const timerHours = document.querySelector('.value[data-hours]');
const timerMinutes = document.querySelector('.value[data-minutes]');
const timerSeconds = document.querySelector('.value[data-seconds]');
const input = document.querySelector('#datetime-picker');

let userSelectedDate;
button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < Date.now()) {
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        titleColor: '#fff',
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        closeOnEscape: true,
        iconUrl: icon,
        theme: 'dark',
      });
    } else {
      button.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
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

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

button.addEventListener('click', () => {
  button.disabled = true;
  input.disabled = true;
  const start = Date.now();
  const totalTime = userSelectedDate - start;

  const timerId = setInterval(() => {
    const left = Date.now() - start;
    const remaining = totalTime - left;
    const rest = convertMs(remaining);
    const { days, hours, minutes, seconds } = rest;
    timerDays.textContent = addLeadingZero(days);
    timerHours.textContent = addLeadingZero(hours);
    timerMinutes.textContent = addLeadingZero(minutes);
    timerSeconds.textContent = addLeadingZero(seconds);
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(timerId);
      input.disabled = false;
    }
  }, 1000);
});
