/* Posts Page JavaScript */

"use strict";

const $q = (s) => document.querySelector(s);
const logoutButton = $q("#logoutButton");
const cardSection = $q("#card-section");
const bioUserName = $q("#user-name");
const loginData = getLoginData();
const postAPI = "https://microbloglite.herokuapp.com/api/posts/";

function getLoginData() {
  return JSON.parse(window.localStorage.getItem("login-data")) || {};
}


function displayProfilePost() {
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

  fetch(postAPI, options)
    .then((response) => response.json())
    .then((posts) => {
      posts.forEach((post) => {
        buildPostCard(cardSection, post);

      });
    });
}


function buildPostCard(section, data) {
  //create col div for BS
  const colDiv = document.createElement("div");
  colDiv.className = "col";

  //created the card
  const cardDiv = document.createElement("div");

  cardDiv.className = "card p-2";

  //put the colDiv on the card-section div then put cardDiv inside colDiv
  section.appendChild(colDiv);
  colDiv.appendChild(cardDiv);

  //create card title for username
  const cardTitle = document.createElement("h6");

  cardTitle.className = "card-title";
  cardTitle.innerText = data.username;

  cardTitle.className = "card-title text-center";
  cardTitle.innerText = `@${data.username}`;

  //create card div text for the card body

  const cardTextPara = document.createElement("p");
  cardTextPara.className = "card-text";
  cardTextPara.innerText = data.text;

  //create the .card-body div to plant the card-text div
  // create div to hold btn-group div with other bs-utilities
  const dFlexDiv = document.createElement("div");
  dFlexDiv.className = "d-flex justify-content-between align-items-center";
  //create btn-group div to carry the btns
  const btnGroupDiv = document.createElement("div");
  btnGroupDiv.className = "btn-group";

  //create btns and timeposted to put inside the btnGroupDiv
  const likeBtn = document.createElement("button");
  likeBtn.className = "btn btn-sm btn-outline-secondary";
  likeBtn.innerText = "Like";
  function likePost(event) {
    event.preventDefault();

    const bodyData = {
      postId: data._id
    };


    fetch("https://microbloglite.herokuapp.com/api/likes", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
      body: JSON.stringify(bodyData),
    })
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.message = "Succesfully Liked.";
        likeBtn.className = "btn btn-sm btn-success";
      })
      .catch((err) => {
        console.log(err);
      });
  }
  likeBtn.onclick = likePost;

  const postTime = document.createElement("small");
  postTime.className = "text-muted";
  let timeCreated = new Date(data.createdAt);
  postTime.innerText = `${timeCreated.toLocaleString()}`;

  btnGroupDiv.appendChild(likeBtn);

  dFlexDiv.append(btnGroupDiv, postTime);
  //create the .card-body div to plant inside the card-text div
  const divCardBody = document.createElement("div");
  divCardBody.className = "card-body";

  cardDiv.appendChild(divCardBody);
  divCardBody.append(cardTitle, cardTextPara);

  cardDiv.append(cardTitle, divCardBody);
  divCardBody.append(cardTextPara, dFlexDiv);
}


const userName = $q("#userName")
function displayAlert() {
  if (sessionStorage.message) {
    console.log(sessionStorage.message);
    successAlert.innerText = sessionStorage.message;
    successAlert.style = "display-block";
  }
}


function loadName() {
  const loginData = getLoginData();
  bioUserName.innerText = `@${loginData.username}`;
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
      window.location.assign("../index.html"); // redirect to landing page
    });
}

window.onload = () => {
  loadName();
  displayProfilePost();
  logoutButton.onclick = logout;
}