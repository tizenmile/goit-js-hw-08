let throttle = require('lodash.throttle');
const form = document.querySelector('.feedback-form');
form.addEventListener(
  'input',
  throttle(() => {
    let formData = new FormData(form);
    const formEmail = formData.get('email');
    const formMessage = formData.get('message');
    const formState = {
      email: formEmail,
      message: formMessage,
    };

    localStorage.setItem('feedback-form-state', JSON.stringify(formState));
  }, 500)
);

function getInputFromStrorage() {
  try {
    const formStateParse = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );
    form.children[0].children[0].value = formStateParse.email;
    form.children[1].children[0].value = formStateParse.message;
  } catch (error) {}
}

getInputFromStrorage();

form.addEventListener('submit', event => {
  event.preventDefault();
  if (
    form.children[0].children[0].value === '' ||
    form.children[1].children[0].value === ''
  ) {
    alert('Заповніть всі поля');
  } else {
    const formStateParse = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );
    console.log(formStateParse);
    localStorage.clear();

    form.children[0].children[0].value = '';
    form.children[1].children[0].value = '';
  }
});
