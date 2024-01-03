/* Posts Page JavaScript */

"use strict";
// Account Dropdown
let userIcon = document.getElementById("userIcon");
let dropdownContent = document.getElementById("dropdownContent");
let logOutBtnEl = document.getElementById("logOutBtn");

// Function to toggle dropdown visibility
function toggleDropdown() {
  dropdownContent.classList.toggle("show");
}

// Redirect to Landing Page
logOutBtnEl.addEventListener("click", logout);

// Event listener to toggle dropdown when clicking on the user icon
userIcon.addEventListener("click", toggleDropdown);

// Close the dropdown if clicking outside of it
window.addEventListener("click", function (event) {
  if (!event.target.closest(".nav-user-dropdown")) {
    dropdownContent.classList.remove("show");
  }
});

window.onload = () => {
  // Get ID from HTML
  let textAreaEl = document.getElementById("textArea");
  let postsContainerEl = document.getElementById("write-post-container");
  let postBtnEl = document.getElementById("postBtn");

  // Event Listener to Post
  postBtnEl.addEventListener("click", (e) => {
    e.preventDefault();

    // Post Data
    let postData = {
      text: textAreaEl.value,
    };

    // Fetch Posts

    const loginData = getLoginData();

 

      fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginData.token}`,
        },
        body: JSON.stringify(postData),
      })
        .then((res) => res.json())
        .then((newPost) => {
          let newPostDiv = document.createElement("div");
          newPostDiv.classList.add("card");
          newPostDiv.textContent = newPost.message;

          postsContainerEl.appendChild(newPostDiv);

          textAreaEl.value = "";
        })
        .catch((err) => {
          console.error("Error", err);
        });
  });

 
  setInterval(getAllPosts, 5000);

  // Get All Posts

  function getAllPosts() {
    // GET /api/users
    const loginData = getLoginData();
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginData.token}`,
      },
    };
    fetch(
      "http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts",
      options
    )
      .then((response) => response.json())
      .then((posts) => {
        let postsContainerEl = document.getElementById("postsContainer");
        // Do something with the users array...
        posts.forEach((post) => {
          let postEl = document.createElement("div");
          postEl.classList.add("card");

          let usernameEl = document.createElement("div");
          usernameEl.classList.add("username");
          usernameEl.textContent = `${post.username}`;

          let postTextEl = document.createElement("div");
          postTextEl.classList.add("post-text");
          postTextEl.textContent = post.text;

          postEl.appendChild(usernameEl);
          postEl.appendChild(postTextEl);

          postsContainerEl.appendChild(postEl);
        });
        console.log(posts);
      });
  }
  getAllPosts();
};
