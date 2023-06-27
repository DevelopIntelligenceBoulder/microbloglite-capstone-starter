/* Posts Page JavaScript */

"use strict";

const logoutBtn = document.getElementById("logoutBtn");
const userCard = document.getElementById("userCard");
//user will need to be logged into before they are able to enter page
// if (isLoggedIn() === false) {
//   window.location.replace("/");
// }

window.onload = function() {
  console.log("Page is loading....");
  logoutBtn.onclick = logoutBtnClicked;
};

// View all posts using GET
function viewAllPosts() {
  let element = document.querySelector("#postArea");
  fetch("https://microbloglite.herokuapp.com/api/posts")
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        let row = table.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = data[i].username;
        cell2.innerHTML = data[i].text;
      }
    });
}

// Create a new post using POST
function createNewPost() {
  let bodyData = {
    username: document.getElementById("usernameIdField").value,
    text: document.getElementById("textIdField").value,
    likes: document.getElementById("likesIdField").value,
    createdAt: document.getElementById("createdAtIdField").value,
  };
  fetch("https://microbloglite.herokuapp.com/api/posts", {
    method: "POST",
    body: bodyData,
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(json => {
      // If the POST finishes successfully, ...
      let confirmationMessage = document.getElementById(confirmationMessage);
      confirmationMessage.innerHTML = "New Post Added";
    })
    .catch(err => {
      // If the POST returns an error, ...
      let confirmationMessage = document.getElementById(confirmationMessage);
      confirmationMessage.innerHTML = "Unexpected error";
    });
}

// User logs out
function logoutBtnClicked() {
  // Add logout functionality
}

function renderUserPosts(users) {
  users.forEach(user => {
    const div = document.createElement("div");
    const image = document.createElement("img");
    const name = document.createElement("h3");
    const species = document.createElement("h3");
    const like = document.createElement("button");
    const unlike = document.createElement("button");
    div.classList = "card";
    image.classList = "card-img";
    like.classList = "empty";
    image.src = user.image;
    name.innerText = `Name: ${user.fullName}`;
    species.innerText = `Text: ${user.text}`;
    like.textContent = "like";
    unlike.textContent = "unlike";
    div.appendChild(image);
    div.appendChild(name);
    div.appendChild(species);
    div.appendChild(like);
    cardsContainer.appendChild(div);
  });
}
