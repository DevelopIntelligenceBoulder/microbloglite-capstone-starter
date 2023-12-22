window.onload = () => {
  if (isLoggedIn() === true) window.location.replace("/posts");
  else loginHandler();
};

function loginHandler(event) {
  // Get and read login form
  const loginForm = document.querySelector("#login");
  const loginData = {
    username: loginForm.username.value,
    password: loginForm.password.value,
  };

  // Disable login button and process the login function in auth.js//
  loginForm.submit = (event) => {
    event.preventDefault();
    loginForm.loginButton.disabled = true;
    login(loginData);
  };
}
