const formulario = document.querySelector('.FORMULARIO');
const emailInput = formulario.querySelector('EMAIL');
const numeroInput = formulario.querySelector('CELULAR');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!validateEmail(emailInput.value)) {
    emailInput.classList.add('email-error');
  } else {
    emailInput.classList.remove('email-error');
  }

  if (!validateNumber(numberInput.value)) {
    numberInput.classList.add('number-error');
  } else {
    numberInput.classList.remove('number-error');
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateNumber(number) {
  const re = /^[0-9]+$/;
  return re.test(number);
}