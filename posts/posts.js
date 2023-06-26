/* Posts Page JavaScript */

"use strict";

// const apiBaseURL = "https://microbloglite.herokuapp.com";

const textboxEl = document.getElementById("textbox");
const postBtnEl = document.getElementById("postBtn");
const postsMadeUlEl = document.getElementById("postsMadeUl");
const logoutBtnEl = document.getElementById("logoutBtn");

postBtnEl.onclick = getPosts;
logoutBtnEl.onclick = logout;

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
      data.forEach((post) => {
        console.log(post);
        const posts = document.createElement("li");
        posts.innerText = post.text;
        postsMadeUlEl.appendChild(posts);
      });

      //   console.log(data);
      //   const posts = document.createElement("li");
      //   posts.innerText = data.text;
      //   postsMadeUlEl.appendChild(posts);
    });
}
