/* Posts Page JavaScript */

"use strict";

const postsContainerEl = document.getElementById("postsContainer");
const postsTemplate = document.getElementById("postCard");

getPosts();

function likePost(id) {
  const loginData = JSON.parse(window.localStorage.getItem("login-data"));

  const likeBody = {
    postId: id,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loginData.token}`,
    },

    body: JSON.stringify(likeBody),
  };

  fetch(apiBaseURL + "/api/likes", options)
    .then((response) => response.json())
    .then((like) => {
      if (like.statusCode) {
        return;
      }
      const clickedBtn = document.querySelector(`button[id='${id}']`);
      clickedBtn.setAttribute("onclick", `removeLike('${like._id}', '${id}')`);
      clickedBtn.classList.add("likedPost");
      printLikes(id, clickedBtn);
    })
    .catch((err) => {
      console.log(err, err.status);
    });
}

function printLikes(postID, likeEl) {
  console.log("getlikes");
  const loginData = JSON.parse(window.localStorage.getItem("login-data"));
  const options = {
    method: "GET",
    headers: {
      // This header is how we authenticate our user with the
      // server for any API requests which require the user
      // to be logit gged-in in order to have access.
      // In the API docs, these endpoints display a lock icon.
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  fetch(apiBaseURL + `/api/posts/${postID}`, options)
    .then((response) => response.json())
    .then((post) => {
      console.log(post.likes.length);
      likeEl.textContent = `Like: ${post.likes.length}`;
    });
}

function removeLike(likeId, postId) {
  const loginData = JSON.parse(window.localStorage.getItem("login-data"));
  console.log("post", postId);
  console.log("like", likeId);

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(apiBaseURL + `/api/likes/${likeId}`, options)
    .then((response) => response.json())
    .then((like) => {
      console.log(like);
      console.log(like.statusCode);
      if (like.statusCode < 400) {
        const clickedBtn = document.querySelector(`button[id='${postId}']`);
        clickedBtn.setAttribute("onclick", `likePost(this.id)`);
        clickedBtn.removeAttribute("class");
        printLikes(postId, clickedBtn);
      }
    })
    .catch((err) => {
      console.log(err, err.status);
    });
}

function getPosts() {
  const loginData = JSON.parse(window.localStorage.getItem("login-data"));
  const options = {
    method: "GET",
    headers: {
      // This header is how we authenticate our user with the
      // server for any API requests which require the user
      // to be logit gged-in in order to have access.
      // In the API docs, these endpoints display a lock icon.
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  fetch(apiBaseURL + "/api/posts?limit=1000", options)
    .then((response) => response.json())
    .then((posts) => {
      posts.forEach((post) => {
        const clone = postsTemplate.content.cloneNode(true);
        const postArea = clone.querySelector(".card-body");
        const userArea = clone.querySelector(".card-header");
        const dateArea = clone.querySelector(".creationDate");
        const likesArea = clone.querySelector("div button");
        likesArea.id = post._id;
        likesArea.textContent = `Like: ${post.likes.length}`;
        let liked = false;
        let likeId;
        post.likes.forEach((like) => {
          if (like.username === loginData.username) {
            console.log(like._id, like.postId);
            likesArea.setAttribute("class", "likedPost");
            likeId = like._id;
            liked = true;
          }
        });
        if (liked) {
          likesArea.setAttribute(
            "onclick",
            `removeLike('${likeId}', '${post._id}')`
          );
        } else {
          likesArea.setAttribute("onclick", "likePost(this.id)");
        }

        const date = new Date(post.createdAt);

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

// Add event listener to wait for the DOM content to load

document.addEventListener("DOMContentLoaded", function () {
  if (isLoggedIn() === false) window.location.replace("/");

  // Add click event listener to the logout link
  const logoutLink = document.getElementById("logout");
  logoutLink.addEventListener("click", logout);
});
