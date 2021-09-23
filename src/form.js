const signinIcon = document.querySelector('.signin-icon');
const signupIcon = document.querySelector('.signup-icon');
const userIcon = document.querySelector('.user-icon');

export const logged = () => {
  const userLogged = localStorage.getItem('user-logged');
  if (userLogged === 'true') {
    makeUserVisible();
    makeSignHidden();
  }
};

export const signin = {
  email: document.querySelector('#signinEmail'),
  password: document.querySelector('#signin-modal #password'),
  emailError: document.querySelector('#signin-modal .email-error'),
  passwordError: document.querySelector('#signin-modal .password-error'),
  error: document.querySelector('#signin-modal .signin-error'),
  submitBtn: document.querySelector('#signin-modal .submit-btn'),
  validEmail: function () {
    signin.error.textContent = '';
    if (
      signin.email.value &&
      signin.email.value.length >= 10 &&
      signin.email.value.length <= 40 &&
      signin.email.value.includes('@')
    ) {
      if (!signin.emailError.classList.contains('hidden'))
        signin.emailError.classList.add('hidden');
      signin.email.style = 'border: 1px solid inhert';
      return true;
    } else {
      if (signin.emailError.classList.contains('hidden'))
        signin.emailError.classList.remove('hidden');
      signin.email.style = 'border: 1px solid red';
      return false;
    }
  },
  validPassword: function () {
    signin.error.textContent = '';
    if (signin.password.value && signin.password.value.length >= 8) {
      if (!signin.passwordError.classList.contains('hidden'))
        signin.passwordError.classList.add('hidden');
      signin.password.style = 'border: 1px solid inhert';
      return true;
    } else {
      if (signin.passwordError.classList.contains('hidden'))
        signin.passwordError.classList.remove('hidden');
      signin.password.style = 'border: 1px solid red';
      return false;
    }
  },
  postSignin: function () {
    if (signin.validEmail() && signin.validPassword()) {
      fetch('https://panda-restaurant.herokuapp.com/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: signin.email.value,
          password: signin.password.value,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'fail') throw new Error(data.message);
          localStorage.setItem('user-token', data.token);
          localStorage.setItem('user-logged', true);
          location.reload();
        })
        .catch(err => {
          signin.error.textContent = err.message;
        });
    }
  },
};

export const makeSignHidden = () => {
  signinIcon.classList.add('hidden');
  signupIcon.classList.add('hidden');
};

export const makeUserVisible = () => {
  userIcon.classList.remove('hidden');
};

// end signin
///////////////////////////////////////////////////////////////

// sign up
export const signup = {
  email: document.getElementById('signupEmail'),
  name: document.querySelector('#signup-modal #name'),
  password: document.getElementById('password-user'),
  passwordConfirm: document.getElementById('password-confirm'),
  emailError: document.querySelector('#signup-modal .email-error'),
  nameError: document.querySelector('#signup-modal .name-error'),
  passwordError: document.querySelector('#signup-modal .password-error'),
  passwordConfirmError: document.querySelector(
    '#signup-modal .password-confirm-error'
  ),
  error: document.querySelector('.signup-error'),
  submitBtn: document.querySelector('#signup-modal .submit-btn'),
  validEmail: function () {
    signup.error.textContent = '';
    if (
      signup.email.value &&
      signup.email.value.length >= 10 &&
      signup.email.value.length <= 40 &&
      signup.email.value.includes('@')
    ) {
      if (!signup.emailError.classList.contains('hidden'))
        signup.emailError.classList.add('hidden');
      signup.email.style = 'border: 1px solid inhert';
      return true;
    } else {
      if (signup.emailError.classList.contains('hidden'))
        signup.emailError.classList.remove('hidden');
      signup.email.style = 'border: 1px solid red';
      return false;
    }
  },
  validPassword: function () {
    signup.error.textContent = '';
    if (signup.password.value && signup.password.value.length >= 8) {
      if (!signup.passwordError.classList.contains('hidden'))
        signup.passwordError.classList.add('hidden');
      signup.password.style = 'border: 1px solid inhert';
      return true;
    } else {
      if (signup.passwordError.classList.contains('hidden'))
        signup.passwordError.classList.remove('hidden');
      signup.password.style = 'border: 1px solid red';
      return false;
    }
  },
  validName: function () {
    signup.error.textContent = '';
    if (signup.name.value && signup.name.value.length <= 40) {
      if (!signup.nameError.classList.contains('hidden'))
        signup.nameError.classList.add('hidden');
      signup.name.style = 'border: 1px solid inhert';
      return true;
    } else {
      if (signup.nameError.classList.contains('hidden'))
        signup.nameError.classList.remove('hidden');
      signup.name.style = 'border: 1px solid red';
      return false;
    }
  },
  validPasswordConfirm: function () {
    signup.error.textContent = '';
    if (
      signup.password.value &&
      signup.password.value === signup.passwordConfirm.value
    ) {
      if (!signup.passwordConfirmError.classList.contains('hidden'))
        signup.passwordConfirmError.classList.add('hidden');
      signup.passwordConfirm.style = 'border: 1px solid inhert';
      return true;
    } else {
      if (signup.passwordConfirmError.classList.contains('hidden'))
        signup.passwordConfirmError.classList.remove('hidden');
      signup.passwordConfirm.style = 'border: 1px solid red';
      return false;
    }
  },
  postSignup: function () {
    if (
      signup.validEmail() &&
      signup.validPassword() &&
      signup.validName() &&
      signup.validPasswordConfirm()
    ) {
      fetch('https://panda-restaurant.herokuapp.com/api/v1/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: signup.name.value,
          email: signup.email.value,
          password: signup.password.value,
          passwordConfirm: signup.passwordConfirm.value,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'fail') throw new Error(data.message);
          localStorage.setItem('user-token', data.token);
          localStorage.setItem('user-logged', true);
          location.reload();
        })
        .catch(err => {
          signup.error.textContent = err.message;
        });
    }
  },
};
