document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;

  if (currentPath.includes('signup.html') || currentPath.includes('signin.html')) {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    if (sign_up_btn && sign_in_btn && container) {
      sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
      });

      sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
      });
    } else {
      console.error('One or more required elements not found.');
    }

    const signUpForm = document.querySelector('.sign-up-form');
    const signInForm = document.querySelector('.sign-in-form');

    if (signUpForm) {
      signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

    

        const user = {
          username: username,
          email: email,
          password: password
        };

        localStorage.setItem('user', JSON.stringify(user));
        alert('Sign up successful! You can now sign in.');

        document.getElementById('signup-username').value = '';
        document.getElementById('signup-email').value = '';
        document.getElementById('signup-password').value = '';

        container.classList.remove("sign-up-mode");
      });
    }

    if (signInForm) {
      signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('signin-username').value;
        const password = document.getElementById('signin-password').value;

        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.username === username && storedUser.password === password) {
          sessionStorage.setItem('userSession', JSON.stringify(storedUser));
          alert('Sign in successful! Redirecting to home page...');
          window.location.href = '/index.html';
        } else {
          alert('Invalid username or password. Please try again.');
        }
      });
    }

    const togglePassword = (toggleId, inputId) => {
      const toggle = document.getElementById(toggleId);
      const input = document.getElementById(inputId);

      toggle.addEventListener('click', () => {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        toggle.classList.toggle('fa-eye');
        toggle.classList.toggle('fa-eye-slash');
      });
    };

    togglePassword('toggle-signin-password', 'signin-password');
    togglePassword('toggle-signup-password', 'signup-password');
  }

  if (currentPath === '/index.html' || currentPath === '/index') {
    const signInButton = document.querySelector("#signIn span");
    if (signInButton) {
      const userSession = JSON.parse(sessionStorage.getItem('userSession'));
      if (userSession) {
        signInButton.textContent = 'Sign Out';
        signInButton.parentElement.removeAttribute('href'); 
        signInButton.parentElement.addEventListener("click", () => {
          sessionStorage.removeItem('userSession');
          alert('Signed out successfully.');
          window.location.href = '/SignIn&SignUp/signup.html';
        });
      } else {
        signInButton.textContent = 'Sign In';
        signInButton.parentElement.setAttribute('href', './SignIn&SignUp/signup.html');
      }
    }
  }
});