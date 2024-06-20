"use strict";
const register = document.getElementById("register");
const nameA = document.getElementById("nameA");
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const registerButton = document.getElementById("registerButton");
const innerText = document.getElementById("innerText");

window.onload = function () {
  registerButton.onclick = checkInputFields;
};

function checkInputFields() {
  if (
    username.value === "" ||
    nameA.value === "" ||
    password.value === "" ||
    confirmPassword.value === ""
  ) {
    innerText.innerHTML = "Please Fill Out All Fields";
  } else {
    registerNewUser();
  }
}

function redirectPage() {
  window.location.assign("../index.html");
}

function registerNewUser() {
  let isValid = password.value === confirmPassword.value;

  if (isValid) {
    let body = {
      username: username.value,
      fullName: nameA.value,
      password: password.value,
    };

    fetch(apiBaseURL + "/api/users", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((newUser) => {
        console.log(newUser);
        redirectPage();
      })
      .catch((error) => {
        console.log("Some error happened:", error);
      });

    innerText.innerHTML = "New User Created";
  } else {
    innerText.innerHTML = "Passwords do not match";
  }
}