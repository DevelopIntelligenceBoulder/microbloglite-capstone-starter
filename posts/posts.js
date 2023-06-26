/* Posts Page JavaScript */

"use strict";

// const apiBaseURL = "https://microbloglite.herokuapp.com";

const textboxEl = document.getElementById("textbox");
const postBtnEl = document.getElementById("postBtn");
const postsMadeUlEl = document.getElementById("postsMadeUl");

postBtnEl.onclick = getPosts;

function getPosts() {
  const loginData = getLoginData();

  const options = {
    method: "GET",
    headers: {
      // This header is how we authenticate our user with the
      // server for any API requests which require the user
      // to be logged-in in order to have access.
      // In the API docs, these endpoints display a lock icon.
      //   accept: "application/json",
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(
    "https://microbloglite.herokuapp.com/api/posts?limit=100&offset=0",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
