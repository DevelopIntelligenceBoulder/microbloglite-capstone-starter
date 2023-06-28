// "use strict";
// const fullnameInput = document.getElementById("inputName");
// const usernameInput = document.getElementById("inputUsername");
// const passwordInput = document.getElementById("InputPassword");
// const confirmPasswordInput = document.getElementById("InputReEnterPassword");
// const registerBtn = document.getElementById("registerButton");

// window.onload = () => {
//     registerBtn.onclick = registerBtnClicked
// }

// function registerBtnClicked(){

//     if(passwordInput.value == confirmPasswordInput.value && usernameInput.value != "" && fullnameInput.value != "" ){
//         let bodyData = {
//             username: usernameInput.value,
//             fullName: fullnameInput.value,
//             password: passwordInput.value,
//         };
//         const options = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(bodyData),
//     };
//     return fetch("https://microbloglite.herokuapp.com/api/users", options)
//         .then((response) => response.json())
//         .then((loginData) => {
//             window.location.assign("posts.html");
//         });
//     }
//     else{
//         console.log("error")
//         errorPass2.innerHTML = "Password does not match"
//     }
// };
"use strict";
const fullnameInput = document.getElementById("inputName");
const usernameInput = document.getElementById("inputUsername");
const passwordInput = document.getElementById("InputPassword");
const confirmPasswordInput = document.getElementById("InputReEnterPassword");
const registerBtn = document.getElementById("registerButton");
const errorMessage = document.getElementById("errorMessage");

// Array to store registered usernames
const registeredUsernames = [];

window.onload = () => {
  registerBtn.onclick = registerBtnClicked;
};

function registerBtnClicked() {
  // Check if any of the fields are empty
  if (
    fullnameInput.value === "" ||
    usernameInput.value === "" ||
    passwordInput.value === "" ||
    confirmPasswordInput.value === ""
  ) {
    errorMessage.textContent = "Please fill out all fields";
    showErrorModal();
    return; // Stop further execution
  }

  // Check if the username already exists in the registeredUsernames array
  if (registeredUsernames.includes(usernameInput.value)) {
    errorMessage.textContent = "Username already exists";
    showErrorModal();
    return; // Stop further execution
  }

  if (passwordInput.value == confirmPasswordInput.value) {
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
      .then((response) => response.json())
      .then((loginData) => {
        // Add the registered username to the array
        registeredUsernames.push(usernameInput.value);
        window.location.assign("posts.html");
      });
  } else {
    errorMessage.textContent = "Password does not match";
    showErrorModal();
  }
}

function showErrorModal() {
  const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
  errorModal.show();
}
