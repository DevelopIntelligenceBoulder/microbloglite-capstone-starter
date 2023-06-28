"use strict";

// logout button event listener
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", () => {
  logout();
});

// Fetch and display posts
const postsContainer = document.getElementById("posts");

fetch("https://microbloglite.herokuapp.com/api/posts")
  .then(response => response.json())
  .then(posts => {
    posts.forEach(post => {
      const postElement = document.createElement("div"); //creates new div/container for post
      postElement.textContent = post.text;
      postsContainer.appendChild(postElement); // displays the post
    });
  })
  .catch(error => {
    console.error("Error displaying user posts:", error);
  });

