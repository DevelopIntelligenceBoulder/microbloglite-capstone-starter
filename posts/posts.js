/* Posts Page JavaScript */

"use strict";

// const apiBaseURL = "https://microbloglite.herokuapp.com";

const textboxEl = document.getElementById("textbox");
const postBtnEl = document.getElementById("postBtn");
const postsMadeUlEl = document.getElementById("postsMadeUl");
const logoutBtnEl = document.getElementById("logoutBtn");

const postCardsDivEl = document.getElementById("postCards");

logoutBtnEl.onclick = logout;
const loginData = getLoginData();
window.onload = getPosts;

function getPosts() {
  console.log(loginData);
  const options = {
    method: "GET",
    headers: {
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
        // console.log(post);
        const templateEl = document.querySelector("#postCards");
        // const title = document.querySelector(".card-title");
        // const postInfo = document.querySelector(".card-text");
        // const likeBtn = document.querySelector(type[button]);

        // Clone the new row and insert it into the table
        const clone = templateEl.content.cloneNode(true);
        let title = clone.querySelector(".card-title");
        let postInfo = clone.querySelector(".card-text");
        let likeBtn = clone.querySelector('input[type="button"]');
        title.textContent = post.username;
        postInfo.textContent = post.text;
        likeBtn.value = `${post.likes.length} Likes`;
        templateEl.appendChild(clone);

        // const likeButton = document.querySelector('input[type="button"]');
        const userLikes = post.likes.find(
          (data) => data.username === loginData.username
        );
        if (userLikes) {
          likeBtn.style.color = "blue";
          likeBtn.addEventListener("click", () => {
            const options = {
              method: "DELETE",
              headers: {
                "Content-type": "application/json; charset=utf-8",
                Authorization: `Bearer ${loginData.token}`,
              },
            };
            const url = `https://microbloglite.herokuapp.com/api/likes/${post._id}`;
            fetch(url, options)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                window.location.href = "/posts";
              });
          });
        } else {
          likeBtn.addEventListener("click", () => {
            let bodyData = {
              postId: post._id,
            };
            const options = {
              method: "POST",
              body: JSON.stringify(bodyData),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${loginData.token}`,
              },
            };
            const url = "https://microbloglite.herokuapp.com/api/likes";
            fetch(url, options)
              .then((response) => response.json())
              .then((data) => {
                window.location.assign("/posts");
              });
          });
        }
      });
    });
}

postBtnEl.addEventListener("click", () => {
  let bodyData = {
    text: textboxEl.value,
    username: loginData.username,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(bodyData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  const url = "https://microbloglite.herokuapp.com/api/posts";
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      window.location.assign("/posts");
    });
});

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

// fetch(`http://localhost:8081/api/courses`)
//   .then((response) => response.json())
//   .then((data) => {
//     data.forEach((course) => {
//       deleteBtnEl.addEventListener("click", () => {
//         const options = {
//           method: "DELETE",
//           headers: {
//             "Content-type": "application/json; charset=utf-8",
//             Authorization: `Bearer ${loginData.token}`,
//           },
//         };
//         const url = `http://localhost:8081/api/courses/${course.id}`;
//         fetch(url, options)
//           .then((response) => response.json())
//           .then((data) => {
//             alert(`Deleted ${courseNameEl.value}`);
//             window.location.href = "./posts";
//           });
//       });
//     });
//   });
