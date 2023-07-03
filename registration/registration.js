"use strict";
const usernameInputEl = document.getElementById("usernameInput");
const passwordInputEl = document.getElementById("passwordInput");
const fullnameInputEl = document.getElementById("fullnameInput");
const registerBtnEl = document.getElementById("registerBtn");

registerBtnEl.addEventListener("click", () => {
  let bodyData = {
    username: usernameInputEl.value,
    fullName: fullnameInputEl.value,
    password: passwordInputEl.value,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  };

  return fetch("https://microbloglite.herokuapp.com/api/users", options)
    .then((response) => response.json())
    .then((loginData) => {
      window.location.assign("../index.html");
    });
});
