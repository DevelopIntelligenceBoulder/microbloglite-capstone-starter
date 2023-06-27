/* Posts Page JavaScript */

console.log("js working");

const registerForm = document.querySelector("#register");
const messagePEl = document.getElementById("messageP");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (
    registerForm.registrationConfirmPassword.value !==
    registerForm.registrationPassword.value
  ) {
    return;
  }
  const registrationBody = {
    username: registerForm.registrationUsername.value,
    fullName: registerForm.registrationFullname.value,
    password: registerForm.registrationPassword.value,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationBody),
  };
  fetch(apiBaseURL + "/api/users", options)
    .then((response) => response.json())
    .then((acctCreation) => {
      messagePEl.textContent = "Success, returning to login...";
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1000);
    })
    .catch((err) => {
      messagePEl.textContent = "An error has occurred. Please try again later.";
    });
});

// logout button event listener
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", function() {
  // User logout button action
  console.log("User logged out");
});
