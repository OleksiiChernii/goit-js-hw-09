import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', event => {
  event.preventDefault();

  let delay = parseInt(refs.delay.value);
  let step = parseInt(refs.step.value);
  let amount = parseInt(refs.amount.value);

  if (delay <= 0 || step <= 0 || amount <= 0) {
    alert('Input values shoud be greater then 0');
    return;
  }

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + step * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return new Promise((resolve, reject) =>
      setTimeout(() => resolve({ position, delay }), delay)
    );
  } else {
    return new Promise((resolve, reject) =>
      setTimeout(() => reject({ position, delay }), delay)
    );
  }
}
