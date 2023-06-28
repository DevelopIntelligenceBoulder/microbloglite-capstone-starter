/* Posts Page JavaScript */

"use strict";

console.log("hi");

const createPostsDiv = document.getElementById("createPostsSection");
const createPostInput = document.getElementById("createPostInput");
const postBtn = document.getElementById("postBtn");
const logoutBtn = document.getElementById("logoutBtn");

const displayPostsDiv = document.getElementById("displayPostsDiv");

const postDisplayTemplate = document.getElementById("postDisplay");

const likeBtn = document.getElementById("likeBtn");

const profileLinkEl = document.getElementById(`profileLink`);
//------------------------------------------------------------------

profileLinkEl.addEventListener(`click`, () => {
  //   fetch(`https://microbloglite.herokuapp.com/api/users/${username}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  window.location.href = `../profile/profile.html?user=${username}`;
});

postBtn.addEventListener("click", () => {
  console.log(createPostInput.value);

  // fetch("https://microbloglite.herokuapp.com/api/posts", {
  //     method: "POST",
  //     body: JSON.stringify({
  //         text: createPostInput.value
  //     }),
  //     headers: {
  //         Authorization: `Bearer ${loginData.token}`,
  //         "Content-type": "application/json; charset=utf-8"
  //     }
  // });
  window.location.reload() = `posts.html`
});

logoutBtn.addEventListener("click", () => {
  logout();
});

window.onload = getPosts;

function getPosts() {
  const loginData = getLoginData();

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch("https://microbloglite.herokuapp.com/api/posts", options)
    .then((response) => response.json())
    .then((data) => {
      let template;

      template = document.getElementById("postDisplay");

      data.forEach((post) => {
        // const content = `
        // <div class="border p-3 m-3">
        // <h3><span>@</span>${post.username}</h3>

        // <p>${post.text}</p>

        // <p class="fs-6 lead">${Date(post.createdAt).toLocaleString()}</p>
        // </div>
        // `
        // const createButton = document.createElement('button')
        // createButton.setAttribute('type','button')
        // createButton.classList.add('btn', 'btn-danger')
        // createButton.textContent = 'Like'

        // displayPostsDiv.innerHTML += content;

        // displayPostsDiv.append(createButton);

        if ("content" in document.createElement("template")) {
          const postEl = template.content.cloneNode(true);

          const username = postEl.querySelector("h3");
          username.textContent = post.username;

          const postText = postEl.querySelector("p");
          postText.textContent = post.text;

          const timeStamp = postEl.querySelector("small");
          timeStamp.textContent = post.createdAt;

          const likeBtn = postEl.querySelector("button");
          likeBtn.addEventListener("click", () => {
            const heartIcon = document.getElementById("heartIcon");
            const filledHeartIcon = document.getElementById("filledHeartIcon");

            heartIcon.style.display = "none";
            filledHeartIcon.style.display = "flex";

            // fetch()
          });

          displayPostsDiv.appendChild(postEl);
        }
      });
    });
}
