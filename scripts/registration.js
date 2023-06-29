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

window.onload = () => {
  registerBtn.onclick = registerBtnClicked;
};

function registerBtnClicked() {
  if (
    fullnameInput.value === "" ||
    usernameInput.value === "" ||
    passwordInput.value === "" ||
    confirmPasswordInput.value === ""
  ) {
    errorMessage.textContent = "Please fill out all fields";
    showErrorModal();
    return;
  }

  checkUsernameAvailability(usernameInput.value)
    .then((isAvailable) => {
      if (isAvailable) {
        // Username is available, proceed with registration
        if (passwordInput.value === confirmPasswordInput.value) {
          createUser(usernameInput.value, fullnameInput.value, passwordInput.value)
            .then(() => {
              loginUser(usernameInput.value, passwordInput.value)
                .then(() => {
                  window.location.assign("posts.html");
                })
                .catch((error) => {
                  console.error("Error:", error);
                  errorMessage.textContent = "Error logging in";
                  showErrorModal();
                });
            })
            .catch((error) => {
              console.error("Error:", error);
              errorMessage.textContent = "Error creating user";
              showErrorModal();
            });
        } else {
          errorMessage.textContent = "Password does not match";
          showErrorModal();
        }
      } else {
        errorMessage.textContent = "Username already exists";
        showErrorModal();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      errorMessage.textContent = "Error checking username availability";
      showErrorModal();
    });
}

function checkUsernameAvailability(username) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch("https://microbloglite.herokuapp.com/api/users", options)
    .then((response) => response.json())
    .then((users) => {
      const existingUser = users.find((user) => user.username === username);
      return !existingUser;
    });
}

function createUser(username, fullName, password) {
  const bodyData = {
    username: username,
    fullName: fullName,
    password: password,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  };

  return fetch("https://microbloglite.herokuapp.com/api/users", options)
    .then((response) => response.json());
}

function loginUser(username, password) {
  const bodyData = {
    username: username,
    password: password,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  };

  return fetch("https://microbloglite.herokuapp.com/api/users/login", options)
    .then((response) => response.json());
}

function showErrorModal() {
  const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
  errorModal.show();
}


