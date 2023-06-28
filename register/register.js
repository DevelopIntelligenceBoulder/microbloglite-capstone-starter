"use strict";

// Get references to various DOM elements
const register = document.getElementById("register");
const nameA = document.getElementById("nameA");
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const registerButton = document.getElementById("registerButton");
const innerText = document.getElementById("innerText");

// Execute when the window finishes loading
window.onload = function () {
  // Attach click event listener to the register button
  registerButton.onclick = checkInputFields;
};

// Function to check if all input fields are filled
function checkInputFields() {
  if (
    username.value === "" ||
    nameA.value === "" ||
    password.value === "" ||
    confirmPassword.value === ""
  ) {
    // Display a message if any of the fields are empty
    innerText.innerHTML = "Please Fill Out All Fields";
  } else {
    // Call the function to register a new user if all fields are filled
    registerNewUser();
  }
}

// Function to redirect to another page
function redirectPage() {
  window.location.assign("../index.html");
}

// Function to register a new user
function registerNewUser() {
  // Check if passwords match
  let isValid = password.value === confirmPassword.value;

  if (isValid) {
    // Create an object with user data
    let body = {
      username: username.value,
      fullName: nameA.value,
      password: password.value,
    };

    // Send a POST request to register the new user
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
        // Redirect to the homepage after successful registration
        redirectPage();
      })
      .catch((error) => {
        console.log("Some error happened:", error);
      });

    // Display a success message
    innerText.innerHTML = "New User Created";
  } else {
    // Display a message if passwords do not match
    innerText.innerHTML = "Passwords do not match";
  }
}
