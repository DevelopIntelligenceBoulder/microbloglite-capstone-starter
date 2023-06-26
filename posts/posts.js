/* Posts Page JavaScript */

"use strict";

// const apiBaseURL = "https://microbloglite.herokuapp.com";

const textboxEl = document.getElementById("textbox");
const postBtnEl = document.getElementById("postBtn");
const postsMadeUlEl = document.getElementById("postsMadeUl");
const logoutBtnEl = document.getElementById("logoutBtn");

const postCardsDivEl = document.getElementById("postCards");

const likeBtn = document.createElement("BUTTON");

logoutBtnEl.onclick = logout;
const loginData = getLoginData();
// postBtnEl.onclick =;
window.onload = getPosts;

function getPosts() {
  console.log(loginData);
  const options = {
    method: "GET",
    headers: {
      // This header is how we authenticate our user with the
      // server for any API requests which require the user
      // to be logged-in in order to have access.
      // In the API docs, these endpoints display a lock icon.
      //   accept: "application/json",
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(
    "https://microbloglite.herokuapp.com/api/posts?limit=100&offset=0",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      data.forEach((post) => {
        console.log(post);
        const card = document.createElement("div");
        card.classList = "row";
        // card.value = post._id;

        const content = ` <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title" value="${post._id}">${post.username}</h5>
            <p class="card-text">
              ${post.text}
            </p>
            <input type="button" value="Like" id="likeBtn"/>
          </div>
        </div>
      </div>`;

        // const like = document.createElement("BUTTON");
        // var t = document.createTextNode("Like");
        // //   btnUpdate.id = 'update0';
        // like.appendChild(t);
        // likeButton.appendChild(like);

        postCardsDivEl.innerHTML += content;
      });

    });
}

// postBtnEl.addEventListener("click", () => {
//   let bodyData = {
//     text: textboxEl.value,
//     username: loginData.username,
//   };
//   const options = {
//     method: "POST",
//     body: JSON.stringify(bodyData),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//       Authorization: `Bearer ${loginData.token}`,
//     },
//   };
//   const url = "https://microbloglite.herokuapp.com/api/posts";
//   fetch(url, options)
//     .then((response) => response.json())
//     .then((data) => {
//       window.location.assign("/posts");
//     });
// });

// const likeBtnEl = document.getElementById("likeBtn");
// const cardId = document.getElementsByClassName("card-title");

// likeBtnEl.addEventListener("click", () => {
//   let bodyData = {
//     postId: cardId.value,
//   };
//   const options = {
//     method: "POST",
//     body: JSON.stringify(bodyData),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//       Authorization: `Bearer ${loginData.token}`,
//     },
//   };
//   const url = "https://microbloglite.herokuapp.com/api/likes";
//   fetch(url, options)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       window.location.assign("/posts");
//     });
// });
