import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import bell from '../images/bell.png';
import success from '../images/success.png';
import xmark from '../images/xmark.png';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="delay"]');

const makePromise = delay => {
  const selectedOption = document.querySelector(
    'input[name="state"]:checked'
  ).value;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedOption === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = Number(input.value);
  makePromise(delay)
    .then(delay => {
      iziToast.success({
        title: 'OK',
        titleColor: '#fff',
        titleSize: 16,
        message: `Fulfilled promise in ${delay}ms`,
        messageColor: '#fff',
        backgroundColor: '#59a10d',
        iconUrl: success,
        theme: 'dark',
        position: 'topRight',
        closeOnEscape: true,
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        titleSize: 16,
        message: `Rejected promise in ${error}ms`,
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        iconUrl: xmark,
        theme: 'dark',
        position: 'topRight',
        closeOnEscape: true,
        progressBarColor: '#b51b1b',
      });
    });
});

window.addEventListener('load', () => {
  iziToast.info({
    title: 'Hello',
    titleColor: 'white',
    titleSize: 16,
    message: 'Welcome!',
    messageColor: 'white',
    iconUrl: bell,
    backgroundColor: '#09f',
    closeOnEscape: true,
    position: 'topCenter',
    theme: 'dark',
  });
});
