/* Posts Page JavaScript */

"use strict";
const postsList = document.querySelector(".postsList");

document.getElementById("logoutBtn").addEventListener("click", () => {
  logout();
});

document.getElementById("newPostBtn").addEventListener("click", () => {
  location.href = "./new-post.html";
});

const postsUrl =
  "https://microbloglite.herokuapp.com/api/posts?limit=100&offset=0";

if (isLoggedIn()) {
  const authData = getLoginData();
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${authData.token}` },
  };
  fetch(postsUrl, options)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((post) => {
        const postDate = new Date(post.createdAt);
        const postContent = `
         <li class="post">
             <div class="postDetails">
               <strong class="author">${post.username}</strong>
               <p class="postText">${post.text}</p>
               <small class="timestamp">${postDate.toDateString()}</small>
             </div>
         </li>`;
        postsList.innerHTML += postContent;
      });
      // Found this method at https://medium.com/@macharia3041/build-a-twitter-clone-with-vanilla-javascript-acb672fbdad7
    });
}
