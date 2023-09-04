import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', handlerSubmit);

function handlerSubmit(evt) {
  evt.preventDefault();

  const {
    elements: { delay, step, amount },
  } = evt.currentTarget;

  let totalDelay = parseInt(delay.value);

  for (let i = 1; i <= amount.value; i++) {
    createPromise(i, totalDelay).then(onSuccess).catch(onError);

    totalDelay += parseInt(step.value);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
}

function onSuccess(resolve) {
  Notiflix.Notify.success(resolve);
}

function onError(reject) {
  Notiflix.Notify.failure(reject);
}
