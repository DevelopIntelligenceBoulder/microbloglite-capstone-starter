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
        dateArea.textContent = post.createdAt;
        userArea.textContent = post.username;
        postArea.textContent = post.text;
        postsContainerEl.appendChild(clone);
      });
    });
}
