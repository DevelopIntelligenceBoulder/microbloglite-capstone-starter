"use strict";

const api = "https://microbloglite.herokuapp.com/";
const $q = (selector) => document.querySelector(selector);
const fullName = $q("#fullName");
const username = $q("#username");
const bio = $q("#bio");
// const editButton = $q("#editButton");
const postText = $q("#postText");
const contentDiv = $q("#contentDiv");
const messagePara = $q("#messagePara");
const editForm = $q("#editForm");
editForm.style.display = "none";
// const passwordInput = $q("#passwordInput");
// const fullNameInput = $q("#fullNameInput");
const bioInput = $q("#bioInput");
const messageDiv = $q("#messageDiv");

// You can use this to get the login data of the logged-in user (if any).
// Returns either an object including the username and token,
// or an empty object if the visitor is not logged in.
function getLoginData() {
  return JSON.parse(window.localStorage.getItem("login-data")) || {};
}

function loadProfileInfo() {
  const loginData = getLoginData();
  const options = {
    method: "GET",
    headers: {
      // This header is how we authenticate our user with the
      // server for any API requests which require the user
      // to be logged-in in order to have access.
      // In the API docs, these endpoints display a lock icon.
      Authorization: `Bearer ${loginData.token}`,
      "Content-Type": "application/json",
    },
  };
  fetch(api + "api/users/" + loginData.username, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      fullName.innerText = data.fullName;
      username.innerText = `@${data.username}`;
      bio.innerText = data.bio;
    });
}

function postBubblyThoughts(event) {
  event.preventDefault();
  const loginData = getLoginData();
  const options = {
    method: "POST",
    headers: {
      // This header is how we authenticate our user with the
      // server for any API requests which require the user
      // to be logged-in in order to have access.
      // In the API docs, these endpoints display a lock icon.
      Authorization: `Bearer ${loginData.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: postText.value,
    }),
  };
  fetch(api + "api/posts", options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      messagePara.innerText = `Powerpuff Universe has received your thought!`;
    });
}

function unhiddenEditForm() {
  editForm.style.display = "block";
}

function hideEditForm() {
  editForm.style.display = "none";
}

function editProfile(event) {
  event.preventDefault();
    const loginData = getLoginData();

    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginData.token}`,
        },
        body: JSON.stringify({
          // password: passwordInput.value,
          bio: bioInput.value,
          // fullName: fullNameInput.value,
        })
    }
    fetch(api + "api/users/" + loginData.username, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      messageDiv.innerText = `Saved successfully! Please refresh your room.`
    });
}

function logout() {
  const loginData = getLoginData();

  // GET /auth/logout
  const options = {
    method: "GET",
    headers: {
      // This header is how we authenticate our user with the
      // server for any API requests which require the user
      // to be logged-in in order to have access.
      // In the API docs, these endpoints display a lock icon.
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(api + "/auth/logout", options)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .finally(() => {
      // We're using `finally()` so that we will continue with the
      // browser side of logging out (below) even if there is an
      // error with the fetch request above.

      window.localStorage.removeItem("login-data"); // remove login data from LocalStorage
      window.location.assign("/logInPage/"); // redirect to landing page
    });
}

window.onload = () => {
  editButton.onlick = editProfile;
  loadProfileInfo();
};
