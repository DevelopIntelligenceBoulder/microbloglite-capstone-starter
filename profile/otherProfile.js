/* Posts Page JavaScript */

"use strict";

// const apiBaseURL = "https://microbloglite.herokuapp.com";

const textboxEl = document.getElementById("textbox");
const postBtnEl = document.getElementById("postBtn");
const postsMadeUlEl = document.getElementById("postsMadeUl");

const logoutBtnEl = document.getElementById("logoutBtn");

const postCardsDivEl = document.getElementById("postCards");

const fullNameHEl = document.getElementById("fullNameH");
const bioPEl = document.getElementById("bioP");

logoutBtnEl.onclick = logout;
const loginData = getLoginData();

window.addEventListener("load", function getUserInfo() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(`https://microbloglite.herokuapp.com/api/users/`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const urlParams = new URLSearchParams(location.search);
      let id = -1;

      if (urlParams.has("username") === true) {
        id = urlParams.get("username");

        const userPosts = data.filter((userInfo) => userInfo.username === id);

        if (userPosts) {
          const fullname = userPosts.find((names) => names.fullName);

          fullNameHEl.innerText = fullname.fullName;
          bioPEl.innerText = fullname.bio;
        }
      }
    });
});

window.addEventListener("load", function getPosts() {
  const urlParams = new URLSearchParams(location.search);
  let id = -1;

  if (urlParams.has("username") === true) {
    id = urlParams.get("username");

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginData.token}`,
      },
    };

    fetch(
      `https://microbloglite.herokuapp.com/api/posts?limit=100&offset=0&username=${id}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.forEach((post) => {
          const userPosts = data.filter((userInfo) => userInfo.username === id);
          console.log(userPosts);
          if (userPosts) {
            console.log(userPosts);
            const usernames = userPosts.find((usernames) => usernames.username);
            console.log(usernames);
          }

          const templateEl = document.querySelector("#postCards");

          const clone = templateEl.content.cloneNode(true);
          let title = clone.querySelector(".card-title");
          let postInfo = clone.querySelector(".card-text");
          let likeBtn = clone.querySelector('button[class="button"]');
          likeBtn.textContent = post.likes.length;
          title.textContent = post.username;
          postInfo.textContent = post.text;

          const imgEl = document.createElement("img");

          templateEl.appendChild(clone);

          const userLike = post.likes.find(
            (data) => data.username === loginData.username
          );

          console.log(post);
          if (userLike) {
            imgEl.src = "../images/likeFlame.png";
            imgEl.alt = "Like Flame";
            likeBtn.appendChild(imgEl);

            likeBtn.addEventListener("click", (e) => {
              e.preventDefault();
              const options = {
                method: "DELETE",
                headers: {
                  "Content-type": "application/json; charset=utf-8",
                  Authorization: `Bearer ${loginData.token}`,
                },
              };

              const url = `${apiBaseURL}api/likes/${userLike._id}`;
              fetch(url, options)
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  window.location.assign(
                    `../profile/otherProfile.html?username=${post.username}`
                  );
                });
            });
          } else {
            imgEl.src = "../images/dislikeFlame.png";
            imgEl.alt = "Dislike Flame";
            likeBtn.appendChild(imgEl);
            likeBtn.addEventListener("click", (e) => {
              e.preventDefault();
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
              const url = `${apiBaseURL}api/likes`;
              fetch(url, options)
                .then((response) => response.json())
                .then((data) => {
                  window.location.assign(
                    `../profile/otherProfile.html?username=${post.username}`
                  );
                });
            });
          }
        });
      });
  }
});
