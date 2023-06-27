
/* Posts Page JavaScript */

"use strict";
console.log("js working");
const postsContainerEl = document.getElementById("postsContainer");
const postsTemplate = document.getElementById("postCard");
console.log(postsTemplate);
console.log(getPosts());
function getPosts() {
  const loginData = JSON.parse(window.localStorage.getItem("login-data"));
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
  fetch(apiBaseURL + "/api/posts", options)
    .then((response) => response.json())
    .then((posts) => {
      posts.forEach((post, i) => {
        console.log(post);
        const clone = postsTemplate.content.cloneNode(true);
        const postArea = clone.querySelector(".card-body");
        const userArea = clone.querySelector(".card-header");
        const dateArea = clone.querySelector(".creationDate");
        const likesArea = clone.querySelector(".likes");
        likesArea.innerHTML = `<button id=likeBtn${i}>Like: ${post.likes.length}</button>`;
        const date = new Date(post.createdAt);
        console.log(date.getDate());
        dateArea.textContent = `${date.getDate()}-${
          date.getMonth() + 1
        }-${date.getFullYear()}`;
        userArea.textContent = post.username;
        postArea.textContent = post.text;
        postsContainerEl.appendChild(clone);
      });
    });
}

// Function to handle the logout action
function logout() {
  // Clear any authentication-related data (replace this with your own implementation)
  clearAuthentication();

  // Redirect the user to the home page
  window.location.replace("/");
}

// Add event listener to wait for the DOM content to load
document.addEventListener("DOMContentLoaded", function() {
  if (isLoggedIn() === false) window.location.replace("/");

  // Add click event listener to the logout link
  const logoutLink = document.getElementById("logout");
  logoutLink.addEventListener("click", logout);
});

