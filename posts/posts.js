/* Posts Page JavaScript */

"use strict";

getPosts();

function getPosts() {
  const loginData = getLoginData();
  // Make an API request to get the list of posts
  fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  })
    .then((response) => response.json())
    .then((posts) => {
      //console.log(posts, "trigger");
      // Retrieved posts
      displayPosts(posts);
    });
}

// Function to display posts on the page
function displayPosts(posts) {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("card");
    postElement.innerHTML = `
            <div class="card-body">
                      <h2 class="card-title">${post.text}</h2>
                      <p class="card-text">${post.username}</p>
                      <p class="card-text">${post.createdAt}<small class="text-body-secondary"></small></p>
                      
                      <div class="btns">
                          <button id="likeButton" class="btn-like">
                              <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                                  <path opacity="1" fill="#8d9b6a" d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0h32c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64H64c123.7 0 224 100.3 224 224v32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V320C100.3 320 0 219.7 0 96z"/>
                              </svg>
                              Like
                          </button>
                          
                          <button id="unlikeButton" class="btn-unlike">
                              <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                                  <path opacity="1" fill="#8f5b34" d="M288 120c0-30.9 25.1-56 56-56s56 25.1 56 56v13c-29.3 10-48 34.5-48 70.1c0 27.9 25.3 74.8 66 111.6c3.8 3.5 8.9 5.3 14 5.3s10.2-1.8 14-5.3c40.7-36.8 66-83.7 66-111.6c0-35.6-18.7-60.2-48-70.1V120C464 53.7 410.3 0 344 0S224 53.7 224 120v21.8C207.3 133 188.2 128 168 128c-66.3 0-120 53.7-120 120v13c-29.3 10-48 34.5-48 70.1C0 359 25.3 405.9 66 442.7c3.8 3.5 8.9 5.3 14 5.3s10.2-1.8 14-5.3c40.7-36.8 66-83.7 66-111.6c0-35.6-18.7-60.2-48-70.1V248c0-30.9 25.1-56 56-56s56 25.1 56 56v32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V280 248 120z"/>
                              </svg>
                              Unlike
                          </button>
                      </div>
                  </div>
        `;
    postsContainer.appendChild(postElement);
  });
}
// Get posts when the page loads
//getPosts();
//});

let logoutBtn = document.getElementById("logout-btn");
logoutBtn.onclick = () => {
  logout();
};

let likeButton = document.getElementById("likeButton");
likeButton.onclick = () => {
  likePost();
};


// Event listener for like & unlike

//link to profile page

// display all posts (display content,
// author, timestamp) *use fetch

//read me explanantion!
