/* Posts Page JavaScript */

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
