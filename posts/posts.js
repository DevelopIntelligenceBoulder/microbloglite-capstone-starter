/* Posts Page JavaScript */
// Assume this data comes from a server-side API
const postData = {
    author: 'John Doe',
    timestamp: 'Jan 1, 2021',
    content: 'Hello, world!',
    image: 'https://example.com/image.jpg',
    avatar: 'https://example.com/avatar.jpg',
}

// Get the elements by their ID
const postAvatar = document.getElementById('post-avatar');
const postAuthor = document.getElementById('post-author');
const postTimestamp = document.getElementById('post-timestamp');
const postContent = document.getElementById('post-content');
const postImage = document.getElementById('post-image');
const postActionButton = document.getElementById('post-action-button');

// Set the elements' content
postAvatar.src = postData.avatar;
postAuthor.textContent = postData.author;
postTimestamp.textContent = postData.timestamp;
postContent.textContent = postData.content;
postImage.src = postData.image;

postActionButton.addEventListener("click", handleLike);

function handleLike(event) {
    event.preventDefault();
    console.log("like clicked");
    // handle the like event here
}

"use strict";

// function authorizes that user is logged in and captures when they create a post
function CreatePost() {
  let myHeaders = new Headers();
  // token authorization
  let loginData = getLoginData();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + loginData.token);

  let raw = JSON.stringify({
    text: document.getElementById("capturePost").value,
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://microbloglite.herokuapp.com/api/posts", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  DisplayAllPost();
}

function DisplayAllPost() {
  let element = document.getElementById("displayPostHere");

  let myHeaders = new Headers();

  let loginData = getLoginData();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + loginData.token);

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "https://microbloglite.herokuapp.com/api/posts?limit=2000&offset=0",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        let userPostInfo = `${result[i].username} <br> ${result[i].createdAt} <br> ${result[i].text} <br>`;
        element.innerHTML += userPostInfo + "<br>";
      }
    });
}
