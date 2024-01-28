"use strict";
// const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";

const registerForm = document.querySelector("#register");
registerForm.onsubmit = registerUser;

function registerUser(event) {
  event.preventDefault();
  let registerData = {
    username: document.getElementById("username").value,
    fullName: document.getElementById("fullName").value,
    password: document.getElementById("password").value,
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerData),
  };

  let registrationComplete = document.getElementById(
    "registration-confirmation"
  );

  fetch(apiBaseURL + "/api/users", options)
    .then((response) => response.json())
    .then((user) => {
      console.log("am I running?");
      registrationComplete.innerHTML = `
        <p>You have successfully created an account. 
        <a href="/">Click here to login.</a>
      `;
      // window.location.assign("/")
    });
}
