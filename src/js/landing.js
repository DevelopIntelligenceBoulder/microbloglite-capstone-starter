import * as auth from "../utils/auth.js";

window.onload = () => {
  if (auth.isLoggedIn()) window.location.replace("../posts");
  else loginHandler();
};

function loginHandler() {
  const loginForm = document.querySelector("#login");
  const errorMsg = document.querySelector("#errorMsg");
  const loadingSpinner = document.querySelector("#loadingSpinner");

  // Disable login button and process the login function in auth.js//
  loginForm.onsubmit = (event) => {
    // Get and read login form data
    let loginData = {
      username: loginForm.username.value,
      password: loginForm.password.value,
      remember: loginForm.remember.checked,
    };

    event.preventDefault();
    setLoadingState();
    auth.login(loginData).then(successRedirect).catch(setFailureState);
  };

  // Actions
  function successRedirect() {
    window.location.replace("../posts");
  }
  function setLoadingState() {
    loginForm.loginButton.disabled = true;
    loadingSpinner.classList.remove("visually-hidden");
    errorMsg.classList.add("content-visable-hidden");
  }
  function setFailureState() {
    loginForm.loginButton.disabled = false;
    loadingSpinner.classList.add("visually-hidden");
    errorMsg.classList.remove("content-visable-hidden");
    loginForm.password.value = "";
    loginForm.username.value = "";
    loginForm.username.focus();
  }
}
