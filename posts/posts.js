/* Posts Page JavaScript */

"use strict";

const loginData = getLoginData();
const createPostsDiv = document.getElementById("createPostsSection");
const createPostInput = document.getElementById("createPostInput");
const postBtn = document.getElementById("postBtn");
const logoutBtn = document.getElementById("logoutBtn");

const displayPostsDiv = document.getElementById("displayPostsDiv");

const postDisplayTemplate = document.getElementById("postDisplay");

// const likeBtn = document.getElementById("likeBtn");

const profileLinkEl = document.getElementById(`profileLink`);

const userAccount = document.getElementById("userAccount");

//------------------------------------------------------------------

profileLinkEl.addEventListener(`click`, () => {
  //   fetch(`https://microbloglite.herokuapp.com/api/users/${username}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  window.location.href = `../profile/profile.html?user=${username}`;
});

postBtn.addEventListener("click", (e) => {
  console.log(createPostInput.value);
  e.preventDefault();
  const options = {
    method: "POST",
    body: JSON.stringify({
      text: createPostInput.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  const url = `https://microbloglite.herokuapp.com/api/posts`;
  fetch(url, options);
  // .then((response) => response.json())
  // .then((posts) => {
  //   console.log(posts);
  // });

  getPosts();
});

logoutBtn.addEventListener("click", () => {
  logout();
});

// function sortPost() {
//     const options = {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${loginData.token}`,
//         "Content-type": "application/json; charset=utf-8"
//       },
//     };
//     fetch("https://microbloglite.herokuapp.com/api/posts?limit=100000&offset=0", options)
//       .then((response) => response.json())
//       .then((data) => {
//         data.sort(function (a, b) {
//             if (a.createdAt > b.createdAt) return -1;
//             else if (+a.createdAt == +b.createdAt) return 0;
//             else return 1;
//           });
//         });
//   }
  
//   sortPost();


window.onload = getPosts;

function getPosts() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch("https://microbloglite.herokuapp.com/api/posts", options)
    .then((response) => response.json())
    .then((data) => {
      userAccount.innerHTML = loginData.username;

      const template = document.getElementById("postDisplay");

      data.forEach((post) => {

        if ("content" in document.createElement("template")) {
          const postEl = template.content.cloneNode(true);

          const username = postEl.querySelector("h3");
          username.textContent = post.username;

          const postText = postEl.querySelector("p");
          postText.textContent = post.text;

          const timeStamp = postEl.querySelector("small");
          timeStamp.textContent = new Date(post.createdAt).toLocaleString();

          const likeBtn = postEl.querySelector("a");

          likeBtn.addEventListener("click", (e) => {
            e.preventDefault();

            console.log(post._id);
            const heartIcon = likeBtn.querySelector(".heartIcon");
            const filledHeartIcon = likeBtn.querySelector(".filledHeartIcon");

            heartIcon.style.display = "none";
            filledHeartIcon.style.display = "flex";

            const options = {
              method: "POST",
              body: JSON.stringify({
                postId: post._id,
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${loginData.token}`,
              },
            };
            fetch(`https://microbloglite.herokuapp.com/api/likes`, options);
          });

          displayPostsDiv.appendChild(postEl);
        }
      });
    });
}



