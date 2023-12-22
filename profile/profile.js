/* Posts Page JavaScript */

"use strict";
// Account Dropdown
let userIcon = document.getElementById('userIcon');
let dropdownContent = document.getElementById('dropdownContent');
let logOutBtnEl = document.getElementById("logOutBtn");


// Function to toggle dropdown visibility
function toggleDropdown() {
    dropdownContent.classList.toggle('show');
}

// Redirect to Landing Page
logOutBtnEl.addEventListener('click', logout);

// Event listener to toggle dropdown when clicking on the user icon
userIcon.addEventListener('click', toggleDropdown);

// Close the dropdown if clicking outside of it
window.addEventListener('click', function(event) {
    if (!event.target.closest('.nav-user-dropdown')) {
        dropdownContent.classList.remove('show');
    }
});


window.onload = () => {
  // Get ID from HTML
  let textAreaEl = document.getElementById("textArea");
  let postsContainerEl = document.getElementById("post-container");
  let postBtnEl = document.getElementById("postBtn")

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
};
