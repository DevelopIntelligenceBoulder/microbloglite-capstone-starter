
"use strict";

const fullnameInput = document.getElementById("inputName");
const usernameInput = document.getElementById("inputUsername");
const passwordInput = document.getElementById("InputPassword");
const confirmPasswordInput = document.getElementById("InputReEnterPassword");
const registerBtn = document.getElementById("registerButton");

window.onload = () => {
  registerBtn.onclick = registerBtnClicked;
};

function registerBtnClicked() {
  let errorMessages = [];

  if (usernameInput.value === "") {
    errorMessages.push("Interesting, please enter a username");
  }

  if (fullnameInput.value === "") {
    errorMessages.push("Interesting, please enter a full name");
  }

  if (passwordInput.value === "") {
    errorMessages.push("Interesting, please enter a password");
  }

  if (confirmPasswordInput.value === "") {
    errorMessages.push("Interesting, make sure to confirm your password");
  }

  if (errorMessages.length > 0) {
    showErrorModal(errorMessages[0]);
  } else if (passwordInput.value !== confirmPasswordInput.value) {
    showErrorModal("Hmmm, looks like your passwords do not match");
  } else {
    let bodyData = {
      username: usernameInput.value,
      fullName: fullnameInput.value,
      password: passwordInput.value,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    };
    return fetch("https://microbloglite.herokuapp.com/api/users", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error creating user");
        }
        return response.json();
      })
      .then((loginData) => {
        console.log(loginData);
        window.location.assign("profile.html");
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error.message.includes("duplicate key")) {
          showErrorModal("Your username has been taken");
        } else {
          showErrorModal("Interesting, your username has been taken");
        }
      });
  }
}

function showErrorModal(errorMessage) {
  const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
  const errorModalMessage = document.getElementById("errorModalMessage");
  errorModalMessage.textContent = errorMessage;
  errorModal.show();
}






