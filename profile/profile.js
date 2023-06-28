/* Posts Page JavaScript */

"use strict";

// const apiBaseURL = "https://microbloglite.herokuapp.com";

const textboxEl = document.getElementById("textbox");
const postBtnEl = document.getElementById("postBtn");
const postsMadeUlEl = document.getElementById("postsMadeUl");
const logoutBtnEl = document.getElementById("logoutBtn");

const postCardsDivEl = document.getElementById("postCards");

const userInput = document.getElementById("usernameInput");
const changeNameInput = document.getElementById("fullNameInput");
const bioInput = document.getElementById("bioInput");
const updateBtn = document.getElementById("update");

logoutBtnEl.onclick = logout;
const loginData = getLoginData();

//  getPosts;

// window.onload = getUserInfo;

// fix to make both work in window.onload
//
//
//

window.addEventListener("load", function getUserInfo() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(
    `https://microbloglite.herokuapp.com/api/users/${loginData.username}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      userInput.value = data.username;
      changeNameInput.value = data.fullName;
      bioInput.value = data.bio;
    });
});

window.addEventListener("load", function getPosts() {
  console.log(loginData);
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(
    `https://microbloglite.herokuapp.com/api/posts?limit=100&offset=0&username=${loginData.username}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((post) => {
        console.log(post);
        const templateEl = document.querySelector("#postCards");

        const clone = templateEl.content.cloneNode(true);
        let title = clone.querySelector(".card-title");
        let postInfo = clone.querySelector(".card-text");
        let editBtn = clone.querySelector(".Edit");
        let deleteBtn = clone.querySelector(".Delete");
        title.textContent = post.username;
        postInfo.value = post.text;
        deleteBtn.textContent = "Delete";
        // editBtn.textContent = `Edit`;
        templateEl.appendChild(clone);

        console.log(post);
        // editBtn.addEventListener("click", () => {
        //   let bodyData = {
        //     text: postInfo.value,
        //     username: title.value,
        //     _id: post._id,
        //   };
        //   const options = {
        //     method: "PUT",
        //     body: JSON.stringify(bodyData),
        //     headers: {
        //       "Content-type": "application/json; charset=UTF-8",
        //       Authorization: `Bearer ${loginData.token}`,
        //     },
        //   };
        //   const url = `https://microbloglite.herokuapp.com/api/posts/${post._id}`;
        //   fetch(url, options)
        //     .then((response) => response.json())
        //     .then((data) => {

        //       alert("Updated");
        //       window.location.assign("/profile/profile.html");
        //     });
        // });
        console.log(post);
        deleteBtn.addEventListener("click", () => {
          const options = {
            method: "DELETE",
            headers: {
              "Content-type": "application/json; charset=utf-8",
              Authorization: `Bearer ${loginData.token}`,
            },
          };
          const url = `https://microbloglite.herokuapp.com/api/posts/${post._id}`;
          fetch(url, options)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              window.location.href = "/profile/profile.html";
            });
        });
        // const userPosts = post.likes.find(
        //   (data) => data.username === loginData.username
        // );
      });
    });
});

// get request to get user info to plug in info

updateBtn.addEventListener("click", () => {
  let bodyData = {
    username: userInput.value,
    fullName: changeNameInput.value,
    bio: bioInput.value,
    // fullName:
  };
  const options = {
    method: "PUT",
    body: JSON.stringify(bodyData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  const url = `https://microbloglite.herokuapp.com/api/`;
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      alert("Updated");
      window.location.assign("/profile/profile.html");
    });
});

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
  const url = `${apiBaseURL}api/posts`;
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      window.location.assign("/profile/profile.html");
    });
});

// <label for="username">Change Username</label>
// <input type="text" id="username" minlength="3" />
// <input type="button" value="Update" id="userUpdate">

// <label for="password">Change Password</label>
// <input type="password" id="password" minlength="6" />
// <input type="button" value="Update" id="passUpdate">

// <label for="bio">Biography</label>
// <input type="text" id="bio" minlength="3" />
// <input type="button" value="Update" id="bioUpdate">

// editBtnEl.addEventListener("click", () => {
//     let bodyData = {
//       title: taskIdEl.value,
//       completed: completedEl.checked,
//       userId: userIdEl.value,
//     };
//     const options = {
//       method: "PUT",
//       body: JSON.stringify(bodyData),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     };
//     const url = `http://localhost:3000/todos/${searchIdEl.value}`;
//     fetch(url, options)
//       .then((response) => response.json())
//       .then((data) => {
//         alert("Updated");
//       });
//   });

// if (userLikes) {
//   likeBtn.style.color = "blue";
//   likeBtn.addEventListener("click", () => {
//     const options = {
//       method: "DELETE",
//       headers: {
//         "Content-type": "application/json; charset=utf-8",
//         Authorization: `Bearer ${loginData.token}`,
//       },
//     };
//     const url = `https://microbloglite.herokuapp.com/api/likes/${post._id}`;
//     fetch(url, options)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         window.location.href = "/posts";
//       });
//   });
// } else {
//           likeBtn.addEventListener("click", () => {
//             let bodyData = {
//               postId: post._id,
//             };
//             const options = {
//               method: "POST",
//               body: JSON.stringify(bodyData),
//               headers: {
//                 "Content-type": "application/json; charset=UTF-8",
//                 Authorization: `Bearer ${loginData.token}`,
//               },
//             };
//             const url = "https://microbloglite.herokuapp.com/api/likes";
//             fetch(url, options)
//               .then((response) => response.json())
//               .then((data) => {
//                 window.location.assign("/posts");
//               });
//           });
//         }
//       });
//     });
// }

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
