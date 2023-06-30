/* Posts Page JavaScript */

"use strict";

// const apiBaseURL = "https://microbloglite.herokuapp.com";

const textboxEl = document.getElementById("textbox");
const postBtnEl = document.getElementById("postBtn");
const postsMadeUlEl = document.getElementById("postsMadeUl");
const logoutBtnEl = document.getElementById("logoutBtn");

const postCardsDivEl = document.getElementById("postCards");

const userInput = document.getElementById("usernameInput");
const changeNameInput = document.getElementById("fullNameInput");
const bioInput = document.getElementById("bioInput");
const updateBtn = document.getElementById("update");

logoutBtnEl.onclick = logout;
const loginData = getLoginData();

window.addEventListener("load", function noahBtn() {
  const noahImg = document.createElement("img");
  noahImg.src = "../images/noah.png";
  noahImg.alt = "Noah Post";
  postBtnEl.appendChild(noahImg);
});

window.addEventListener("load", function getUserInfo() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(
    `https://microbloglite.herokuapp.com/api/users/${loginData.username}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      userInput.value = data.username;
      changeNameInput.value = data.fullName;
      bioInput.value = data.bio;
    });
});

window.addEventListener("load", function getPosts() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(
    `https://microbloglite.herokuapp.com/api/posts?limit=100&offset=0&username=${loginData.username}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      data.forEach((post) => {
        const templateEl = document.querySelector("#postCards");

        const clone = templateEl.content.cloneNode(true);
        let title = clone.querySelector(".card-title");
        let postInfo = clone.querySelector(".card-text");
        let deleteBtn = clone.querySelector(".Delete");
        title.textContent = post.username;
        title.style.color = "#5a0303";
        postInfo.textContent = post.text;
        deleteBtn.textContent = "Delete";

        templateEl.appendChild(clone);

        deleteBtn.addEventListener("click", () => {
          const options = {
            method: "DELETE",
            headers: {
              "Content-type": "application/json; charset=utf-8",
              Authorization: `Bearer ${loginData.token}`,
            },
          };
          const url = `https://microbloglite.herokuapp.com/api/posts/${post._id}`;
          fetch(url, options)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              window.location.href = "/profile/profile.html";
            });
        });
      });
    });
});

updateBtn.addEventListener("click", () => {
  let bodyData = {
    username: userInput.value,
    fullName: changeNameInput.value,
    bio: bioInput.value,
  };
  const options = {
    method: "PUT",
    body: JSON.stringify(bodyData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  const url = `https://microbloglite.herokuapp.com/api/users/${loginData.username}`;
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      alert("Updated");
      window.location.assign("/profile/profile.html");
    });
});

postBtnEl.addEventListener("click", () => {
  let bodyData = {
    text: textboxEl.value,
    username: loginData.username,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(bodyData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  const url = `${apiBaseURL}api/posts`;
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      window.location.assign("/profile/profile.html");
    });
});
