"use strict";


window.onload = function () {
  const accessToken = JSON.parse(window.localStorage.getItem("login-data")).token;
  // console.log(accessToken)
  console.log(JSON.parse(window.localStorage.getItem("login-data")))
  getAllPosts(accessToken);
};


function showUserName() {
  const currentUser = JSON.parse(window.localStorage.getItem("login-data")).username;
  return currentUser
}

// Add a post
function addPost(accessToken) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  
  fetch(apiBaseURL + "/api/posts", options)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to send a post, try again later");
    }
  })
  .then((data) => {
    createPost(data);
  })
  .then(
    document.querySelector("addPostButton").onclick = createPost()
  )
  .catch((error) => {
    console.error("Error fetching posts:", error);
  });
}

// Show new post
function createPost(newPosts) {
  for (newPost of newPosts) {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card", "mb-3");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const postText = document.createElement("p");
    postText.classList.add("card-text");
    postText.textContent = post.text;

    const userName = document.createElement("h5");
    userName.classList.add("card-title");
    userName.textContent = post.username;

    const likesArea = document.createElement("h6");
    likesArea.classList.add("card-subtitle", "text-muted");
    likesArea.textContent = `${post.likes}`;

    cardBody.appendChild(userName);
    cardBody.appendChild(postText);
    cardBody.appendChild(likesArea);

    cardContainer.appendChild(cardBody);
    parentElement.appendChild(cardContainer);
  }
}

// Get all post
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

// Create all post in JS
function loadAllPosts(posts) {
  for (const post of posts) {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card", "mb-3");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const postText = document.createElement("p");
    postText.classList.add("card-text");
    postText.textContent = post.text;

    const userName = document.createElement("h5");
    userName.classList.add("card-title");
    userName.textContent = post.username;

    const likesArea = document.createElement("h6");
    likesArea.classList.add("card-subtitle", "text-muted");
    likesArea.textContent = `${post.likes}`;

    cardBody.appendChild(userName);
    cardBody.appendChild(postText);
    cardBody.appendChild(likesArea);

    cardContainer.appendChild(cardBody);
    parentElement.appendChild(cardContainer);
  }
}


