import './App.css';


const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  formControl.querySelector('small').innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function checkEmail(input) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, 'Email is not valid');
    return false;
  }
}

function checkRequired(inputs) {
  let allFilled = true;
  inputs.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${capitalize(input.id)} is required`);
      allFilled = false;
    } else {
      showSuccess(input);
    }
  });
  return allFilled;
}

function checkLength(input, min, max) {
  const value = input.value.trim();
  if (value.length < min) {
    showError(input, `${capitalize(input.id)} must be at least ${min} characters`);
    return false;
  } else if (value.length > max) {
    showError(input, `${capitalize(input.id)} must be less than ${max} characters`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

function checkPasswordsMatch(p1, p2) {
  if (p1.value !== p2.value) {
    showError(p2, 'Passwords do not match');
    return false;
  } else {
    showSuccess(p2);
    return true;
  }
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const isRequiredFilled = checkRequired([username, email, password, password2]);
  const isUsernameValid = checkLength(username, 3, 15);
  const isPasswordValid = checkLength(password, 6, 25);
  const isEmailValid = checkEmail(email);
  const isPasswordMatch = checkPasswordsMatch(password, password2);

  const isFormValid =
    isRequiredFilled && isUsernameValid && isPasswordValid && isEmailValid && isPasswordMatch;

  if (isFormValid) {
    console.log('Form Submitted Successfully!');
    // Optionally: reset form or alert
    // form.reset();
  }
});
