/* Posts Page JavaScript */

"use strict";
const postsList = document.querySelector(".postsList");

document.getElementById("logoutBtn").addEventListener("click", () => {
  logout();
});

const postsUrl =
  "https://microbloglite.herokuapp.com/api/posts?limit=100&offset=0";

async function displayPosts() {
  const authData = getLoginData();
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${authData.token}` },
  };
  const res = await fetch(postsUrl, options);
  const data = await res.json();

  return data.forEach((post) => {
    const postDate = new Date(post.createdAt);
    const postContent = `
         <li class="post">
            <div class="postDetails">
              <strong class="author">${post.username}</strong>
              <p class="postText">${post.text}</p>
              <small class="timestamp">${postDate.toDateString()}</small>
              <i class="bi bi-heart"></i>
            </div>
          </li>`;
    postsList.innerHTML += postContent;
    // Found this method at https://medium.com/@macharia3041/build-a-twitter-clone-with-vanilla-javascript-acb672fbdad7
  });
}

if (isLoggedIn()) {
  displayPosts();
}

document.querySelectorAll(".bi-heart").forEach((like) =>
  like.addEventListener("click", () => {
    console.log("i like");
  })
);
