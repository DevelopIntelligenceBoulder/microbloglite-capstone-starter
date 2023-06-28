"use strict";

const logoutButton = document.querySelector("#logout");
const profileContainer = document.querySelector("#profileContainer");
const userPost = document.querySelector("#userPost");
userPost.onsubmit = formSubmit;
logoutButton.onclick = logout;

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
    .then((userProfiles) =>
      userProfiles.forEach((userProfile) => {
        const pContainer = document.createElement("p");
        pContainer.innerText = userProfile.text;
        profileContainer.prepend(pContainer);
      })
    );
}

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
window.onload = profileFetch;