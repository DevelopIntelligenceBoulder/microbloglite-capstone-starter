"use strict";


window.onload = function () {
  const accessToken = JSON.parse(window.localStorage.getItem("login-data")).token; 
  // Replace with the actual access token
  console.log(JSON.parse(window.localStorage.getItem("login-data")).token)
  getAllPosts(accessToken);
};

function getAllPosts(accessToken) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  fetch(apiBaseURL + "/api/posts", options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to retrieve posts");
      }
    })
    .then((data) => {
      loadAllPosts(data);
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
}

const parentElement = document.querySelector("main");

function loadAllPosts(posts) {
  for (const post of posts) {

    const mainCard = document.createElement("div");
    mainCard.classList.add("mainCard");
    mainCard.textContent = post.text; // Modify this line based on your post structure
    parentElement.append(mainCard);

    const userName = document.createElement("h2");
    userName.classList.add("userName");
    userName.textContent = post.username;
    parentElement.append(userName)

    const likesArea = document.createElement("h5");
    likes.classList.add("likesArea");
    likes.textContent = post.likes;
    parentElement.append(likesArea)
  }
}

