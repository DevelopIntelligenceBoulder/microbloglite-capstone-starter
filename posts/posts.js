/* Posts Page JavaScript */

"use strict";

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
      console.log(data);
      data.forEach((post) => {});
    });
}
