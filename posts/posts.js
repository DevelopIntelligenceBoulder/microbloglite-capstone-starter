/* Posts Page JavaScript */
"use strict";
window.onload = () => {
  let logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.onclick = logout;

  const loginData = getLocalUserData();
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(API_URL + "/api/posts", options)
    .then((response) => response.json())
    .then((posts) => {
      console.log(posts); //log grab all post
      let postsContainer = document.getElementById("posts");
      for (let post of posts) {
        let div = document.createElement("div");
        div.innerHTML = `<div class="card justify-content-center " style="width:18 rem;">
  <div class="card-body ">
    <h5 class="card-title">${post.username}</h5>
    <p class="card-text" >${post.text}</p>
    <a class="btn text-primary">Love it</a>
    <a class="btn text-danger-emphasis">Fudge it</a>

  </div>
</div>
 </p>`;
        postsContainer.appendChild(div);
      }
    });
};
