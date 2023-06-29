"use strict";

const logoutButton = document.querySelector("#logout");
const profileContainer = document.querySelector("#profileContainer");
const userPost = document.querySelector("#userPost");
const dataContainer = document.querySelector("#userDataContainer");
const bioDisplay = document.querySelector("#bioDisplay");
const saveBioButton = document.querySelector("#saveBio");
const bioTextarea = document.querySelector("#biotext");

userPost.onsubmit = formSubmit;
logoutButton.onclick = logout;
saveBioButton.onclick = saveBio;

function convertDateTime(apiDateTime) {
  const date = new Date(apiDateTime);
  const formattedDateTime = date.toLocaleString();
  return formattedDateTime;
}

//Display Your Posts
function profileFetch() {
  const loginData = getLoginData();
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(apiBaseURL + "/api/posts?username=" + loginData.username, options)
    .then((response) => response.json())
    .then((userProfiles) => {
      userProfiles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      let postHTML = "";

      userProfiles.forEach((userProfile) => {
        postHTML += `
        <div class="card text-center" id="cards" data-post-id="${userProfile._id}">
          <div class="card-header">
          <span class="deleteButton"><button class="btn btn-outline-danger" id="${userProfile._id}" onclick="deletePost('${userProfile._id}')">Χ</button></span>
              <b>@${userProfile.username}</b>
          </div>
          <div class="card-body">
              <p class="card-text">${userProfile.text}</p>
          </div><br>
          <div class="card-footer text-muted">
              ${convertDateTime(userProfile.createdAt)}
          </div>
        </div>`;
      });
    profileContainer.innerHTML = postHTML;
    })
      .catch((error) => {
        console.error(error);
      });
}


//Display User Info
function displayUserData() {

  const loginData = getLoginData();
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(apiBaseURL + "/api/users/" + loginData.username, options)
    .then(response => response.json())
    .then(userData => {
        
        const data = `
        <h4> <b>${userData.fullName}</b></h4>
        <div class = "username">@${userData.username}</div>`;
        dataContainer.innerHTML = data;

        const bio = `${userData.bio}`;
        bioDisplay.textContent = bio || "No bio yet!";
      })
      .catch(error => {
        console.error(error);
      });
    }


//Update User Bio
function updateBio() {
  const loginData = getLoginData();
  const newBio = bioTextarea.value;
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({bio: newBio}),
  };

  fetch(apiBaseURL + "/api/users/" + loginData.username, options)
    .then(response => {
      displayUserData();
    })
    .catch(error => {
      console.error(error);
    });
}

function saveBio() {
  if (!bioDisplay || !bioTextarea || !saveBioButton) {
    return; // Elements not found, exit the function
  }

  bioDisplay.textContent = bioTextarea.value;
  bioDisplay.style.display = "block";
  bioTextarea.style.display = "none";
  saveBioButton.style.display = "none";
  updateBio();
}

//Form Submit
function formSubmit(event) {
  event.preventDefault();
  profileContainer.replaceChildren();
  sendData(userPost.userPostArea.value);
}

//Send Data
function sendData(postContent) {
  const loginData = getLoginData();
  console.log(loginData);
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: postContent }),
  };

  fetch(apiBaseURL + "/api/posts", options)
    .then((response) => response.json())
    .then((data) => {
      profileFetch();
      console.log(data);
    });
}

window.onload = main;

function main() {
  profileFetch();
  displayUserData();
}

function deletePost(postId) {
    const loginData = getLoginData();
    const options = {
      method: "DELETE",
      headers: {
      Authorization: `Bearer ${loginData.token}`,
      "Content-Type": "application/json",
    },
  };

    fetch(apiBaseURL + "/api/posts/" + postId, options)
    .then((response) => response.json())
    .then((data) => {
      window.location.reload()
    });
}