import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);
const currentDate = new Date();
let selectedDate;

const refs = {
  input: document.querySelector('#datetime-picker'),
  btn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btn.disabled = true;
refs.btn.addEventListener('click', startTimer);

refs.input.addEventListener('input', () => {
  selectedDate = new Date(refs.input.value);
  if (selectedDate.getTime() - currentDate.getTime() >= 0) {
    refs.btn.disabled = false;
    selectedDate = selectedDate.getTime() - currentDate.getTime();
  } else {
    alert('Please choose a date in the future');
  }
});

function startTimer() {
  let intervalId = setInterval(() => {
    const convertedDate = convertMs(selectedDate);
    refs.days.innerHTML = addLeadingZero(convertedDate.days);
    refs.hours.innerHTML = addLeadingZero(convertedDate.hours);
    refs.minutes.innerHTML = addLeadingZero(convertedDate.minutes);
    refs.seconds.innerHTML = addLeadingZero(convertedDate.seconds);

    selectedDate -= 1000;
    if(selectedDate < 0){
        clearInterval(intervalId);
    }
  }, 1000);
}

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

function addLeadingZero(value){
  return value.toString().padStart(2,'0');
}
