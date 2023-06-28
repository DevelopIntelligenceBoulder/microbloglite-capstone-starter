"use strict";

const logoutButton = document.querySelector("#logout");
const profileContainer = document.querySelector("#profileContainer");
const userPost = document.querySelector("#userPost");
const dataContainer = document.querySelector("#userDataContainer");

userPost.onsubmit = formSubmit;
logoutButton.onclick = logout;

function convertDateTime(apiDateTime) {
  const date = new Date(apiDateTime);
  const formattedDateTime = date.toLocaleString();
  return formattedDateTime;
}

//Displays Your Posts
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
//End of Your Posts Display


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

        const bio = `<div> ${userData.bio}</div>`;
        bioContainer.innerHTML = bio;
      })
      .catch(error => {
        console.error(error);
      });
    }
  //End of User Info Display


function formSubmit(event) {
  event.preventDefault();
  profileContainer.replaceChildren();
  sendData(userPost.userPostArea.value);
}
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
    .then((response) => {
      profileFetch();
      console.log(response);
    });
}
window.onload = main;

function main() {
  profileFetch();
  displayUserData();
}