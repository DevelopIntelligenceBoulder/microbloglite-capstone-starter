/* Landing Page JavaScript */

"use strict";

window.onload = function () {
  const loginForm = document.querySelector("#loginForm");

  loginForm.onsubmit = function (event) {
    event.preventDefault();

    const loginData = {
      username: loginForm.username.value,
      password: loginForm.password.value,
    };

    const loginButton = loginForm.querySelector("#loginButton");
    loginButton.disabled = true;

    login(loginData);
  };
};
