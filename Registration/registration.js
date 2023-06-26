console.log("js working");

const registerForm = document.querySelector("#register");
const messagePEl = document.getElementById("messageP");
const apiBaseURL = "https://microbloglite.herokuapp.com";

registerForm.onsubmit = function (event) {
  event.preventDefault();
  if (
    registerForm.registrationConfirmPassword.value !==
    registerForm.registrationPassword.value
  )
    return;
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
      messagePEl.textContent = "Success returning to login";
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1000);
    })
    .catch((err) => {
      messagePEl.textContent = "An error has occured Please try again later";
    });
};
