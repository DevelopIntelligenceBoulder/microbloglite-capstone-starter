window.onload = () => {
  if (isLoggedIn() === true) window.location.replace("/posts");
  else loginHandler();
};

function loginHandler() {
  const loginForm = document.querySelector("#login");

  // Disable login button and process the login function in auth.js//
  loginForm.onsubmit = (event) => {
    // Get and read login form data
    const loginData = {
      username: loginForm.username.value,
      password: loginForm.password.value,
    };

    event.preventDefault();
    loginForm.loginButton.disabled = true;
    document.querySelector("#loginSpinner").classList.remove("visually-hidden") //show loading spinner
    login(loginData);
  };
}
